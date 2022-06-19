import axios from 'axios';
import { Actor, HttpAgent, SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
// import xrpl from 'xrpl';
import { CrossToken2IC, CrossToken2XRP } from '../types/token';
import { idlFactory as xrpIdlFactory } from './declarations/xrp';
import { idlFactory as brageIdlFactory } from './declarations/bridge';
import { idlFactory as nftIdlFactory } from './declarations/nft';

const canisterId_xrp = 'e7vz4-wqaaa-aaaai-aclha-cai';
const canisterId_nft = 'n46fk-6qaaa-aaaai-ackxa-cai';
const canisterId_bridge = 'hgfyg-4yaaa-aaaai-acloq-cai';

interface GenerateXRPAccountResult {
  account: {
    address: string;
    classicAddress: string;
    secret: string;
    xAddress: string;
  };
  amount: number;
  balance: number;
}

const createXRPActor = (
  identity: SignIdentity
): import('@dfinity/agent').ActorSubclass<
  import('./declarations/xrp/xrp.did')._SERVICE
> => {
  return Actor.createActor(xrpIdlFactory, {
    agent: new HttpAgent({
      host: 'https://ic0.app',
      identity,
    }),
    canisterId: canisterId_xrp,
  });
};

const createBrageActor = (
  identity?: SignIdentity
): import('@dfinity/agent').ActorSubclass<
  import('./declarations/bridge/bridge.did')._SERVICE
> => {
  return Actor.createActor(brageIdlFactory, {
    agent: new HttpAgent({
      host: 'https://ic0.app',
      identity,
    }),
    canisterId: canisterId_bridge,
  });
};

const createNFTActor = (
  identity?: SignIdentity
): import('@dfinity/agent').ActorSubclass<
  import('./declarations/nft/nft.did')._SERVICE
> => {
  return Actor.createActor(nftIdlFactory, {
    agent: new HttpAgent({
      host: 'https://ic0.app',
      identity,
    }),
    canisterId: canisterId_nft,
  });
};

export const generateXRPAccount = () => {
  return axios
    .post<GenerateXRPAccountResult>('https://faucet-nft.ripple.com/accounts')
    .then((res) => res.data);
};

export const crossIC2XRP = (token: CrossToken2XRP) => {
  return axios
    .post('https://xrp-backend-nine.vercel.app/api/ic2xrp', token)
    .then((res) => res.data);
};

export const crossXRP2IC = (token: CrossToken2IC) => {
  return axios
    .post('https://xrp-backend-nine.vercel.app/api/xrp2ic', token)
    .then((res) => res.data);
};

export const isRegisterUser = async (
  identity: SignIdentity,
  principal: string
) => {
  const xrpActor = createXRPActor(identity);
  return xrpActor.isRegisteredUser(Principal.fromText(principal));
};

export const setXRPAccount = async (
  identity: SignIdentity,
  publicKey: string,
  privateKey: string
) => {
  const xrpActor = createXRPActor(identity);
  const res = await xrpActor.setXRPAccount(publicKey, privateKey);
  if ('ok' in res) {
    return Promise.resolve(res.ok);
  } else {
    return Promise.reject(res.err);
  }
};

export const getXRPAccount = async (identity: SignIdentity) => {
  const xrpActor = createXRPActor(identity);
  const res = await xrpActor.getXRPAccount();
  if ('ok' in res) {
    return Promise.resolve(res.ok);
  } else {
    return Promise.reject(res.err);
  }
};

export const getAllTokens = async (identity?: SignIdentity) => {
  const brageActor = createBrageActor(identity);
  const res = await brageActor.getAllTokenInfo();
  if ('ok' in res) {
    return Promise.resolve(res.ok);
  } else {
    return Promise.reject(res.err);
  }
};

export const getAccountIdentifier = (principal: string) => {
  const brageActor = createBrageActor();
  return brageActor.getAccountIdentifier(Principal.fromText(principal));
};

export const getRegistry = () => {
  const nftActor = createNFTActor();
  return nftActor.getRegistry();
};

export const getUserICTokenIndexs = async (principal: string) => {
  const accountIdentifier = await getAccountIdentifier(principal);
  const registry = await getRegistry();
  return registry
    .filter((item) => {
      return accountIdentifier === item[1];
    })
    .map((item) => item[0]);
};

export const getXRPNFTokens = async (publicKey: string, privateKey: string) => {
  // const xrpNFTServer = 'wss://xls20-sandbox.rippletest.net:51233';
  // const client = new xrpl.Client(xrpNFTServer);
  // const clientWallet = xrpl.Wallet.fromSeed(privateKey);
  // await client.connect();
  // const nfts = await client.request({
  //   account: clientWallet.classicAddress,
  //   command: 'account_nfts',
  // });
  // // client.disconnect();
  // // @ts-ignore
  // const NFTokenIds = nfts.result.account_nfts.map((item: any) => {
  //   return item.NFTokenID;
  // });
  // return NFTokenIds;
};
