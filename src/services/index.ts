import axios from 'axios';
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { CrossToken2IC, CrossToken2XRP } from '../types/token';
import { idlFactory as xrpIdlFactory } from './declarations/xrp';
import { idlFactory as brageIdlFactory } from './declarations/bridge';
import { idlFactory as nftIdlFactory } from './declarations/nft';
import { ConnectType } from '../types/connect';
import InternetIdentity from './InternetIdentity';
import Stoic from './stoic';
import Plug from './plug';
import { blob2text } from '../utils';

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

const createXRPActor = async (
  connectType?: ConnectType
): Promise<
  import('@dfinity/agent').ActorSubclass<
    import('./declarations/xrp/xrp.did')._SERVICE
  >
> => {
  switch (connectType) {
    case ConnectType.Plug:
      return Plug.getActor(canisterId_xrp, xrpIdlFactory);
    case ConnectType.InternetIdentity:
    case ConnectType.Stoic:
      return Actor.createActor(xrpIdlFactory, {
        agent: new HttpAgent({
          host: 'https://ic0.app',
          identity:
            connectType === ConnectType.InternetIdentity
              ? InternetIdentity.getIdentity()
              : Stoic.getIdentity(),
        }),
        canisterId: canisterId_xrp,
      });

    default:
      return Actor.createActor(xrpIdlFactory, {
        agent: new HttpAgent({ host: 'https://ic0.app' }),
        canisterId: canisterId_xrp,
      });
  }
};

const createBrageActor = async (
  connectType?: ConnectType
): Promise<
  import('@dfinity/agent').ActorSubclass<
    import('./declarations/bridge/bridge.did')._SERVICE
  >
> => {
  switch (connectType) {
    case ConnectType.Plug:
      return Plug.getActor(canisterId_bridge, brageIdlFactory);
    case ConnectType.InternetIdentity:
    case ConnectType.Stoic:
      return Actor.createActor(brageIdlFactory, {
        agent: new HttpAgent({
          host: 'https://ic0.app',
          identity:
            connectType === ConnectType.InternetIdentity
              ? InternetIdentity.getIdentity()
              : Stoic.getIdentity(),
        }),
        canisterId: canisterId_bridge,
      });
    default:
      return Actor.createActor(brageIdlFactory, {
        agent: new HttpAgent({ host: 'https://ic0.app' }),
        canisterId: canisterId_bridge,
      });
  }
};

const createNFTActor = async (
  connectType?: ConnectType
): Promise<
  import('@dfinity/agent').ActorSubclass<
    import('./declarations/nft/nft.did')._SERVICE
  >
> => {
  switch (connectType) {
    case ConnectType.Plug:
      return Plug.getActor(canisterId_nft, nftIdlFactory);
    case ConnectType.InternetIdentity:
    case ConnectType.Stoic:
      return Actor.createActor(nftIdlFactory, {
        agent: new HttpAgent({
          host: 'https://ic0.app',
          identity:
            connectType === ConnectType.InternetIdentity
              ? InternetIdentity.getIdentity()
              : Stoic.getIdentity(),
        }),
        canisterId: canisterId_nft,
      });
    default:
      return Actor.createActor(nftIdlFactory, {
        agent: new HttpAgent({ host: 'https://ic0.app' }),
        canisterId: canisterId_nft,
      });
  }
};

export const generateXRPAccount = () => {
  return axios
    .post<GenerateXRPAccountResult>('https://faucet-nft.ripple.com/accounts')
    .then((res) => res.data);
};

export const crossIC2XRP = (token: CrossToken2XRP) => {
  return axios
    .post('https://xrp-server.itoka.xyz/api/ic2xrp', token, {
      timeout: 999999999,
    })
    .then((res) => res.data);
};

export const crossXRP2IC = (token: CrossToken2IC) => {
  return axios
    .post('https://xrp-server.itoka.xyz/api/xrp2ic', token, {
      timeout: 99999999,
    })
    .then((res) => res.data);
};

export const isRegisterUser = async (principal: string) => {
  const xrpActor = await createXRPActor();
  return xrpActor.isRegisteredUser(Principal.fromText(principal));
};

export const setXRPAccount = async (
  publicKey: string,
  privateKey: string,
  connectType: ConnectType
) => {
  const xrpActor = await createXRPActor(connectType);
  const res = await xrpActor.setXRPAccount(publicKey, privateKey);
  if ('ok' in res) {
    return Promise.resolve(res.ok);
  } else {
    return Promise.reject(res.err);
  }
};

export const getXRPAccount = async (connectType: ConnectType) => {
  const xrpActor = await createXRPActor(connectType);
  const res = await xrpActor.getXRPAccount();
  if ('ok' in res) {
    return Promise.resolve(res.ok);
  } else {
    return Promise.reject(res.err);
  }
};

export const getAllTokens = async () => {
  const brageActor = await createBrageActor();
  const res = await brageActor.getAllTokenInfo();
  if ('ok' in res) {
    return Promise.resolve(res.ok);
  } else {
    return Promise.reject(res.err);
  }
};

export const getAccountIdentifier = async (principal: string) => {
  const brageActor = await createBrageActor();
  return brageActor.getAccountIdentifier(Principal.fromText(principal));
};

export const getRegistry = async () => {
  const nftActor = await createNFTActor();
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
  const xrpNFTServer = 'wss://xls20-sandbox.rippletest.net:51233';
  //@ts-ignore
  const client = new xrpl.Client(xrpNFTServer);
  //@ts-ignore
  const clientWallet = xrpl.Wallet.fromSeed(privateKey);
  await client.connect();
  const nfts = await client.request({
    account: clientWallet.classicAddress,
    command: 'account_nfts',
  });
  // client.disconnect();
  // @ts-ignore
  const NFTokenIds = nfts.result.account_nfts.map((item: any) => {
    return item.NFTokenID;
  });
  return NFTokenIds;
};

export const transferNFT = async (
  principal: string,
  identifier: string,
  connectType: ConnectType
) => {
  const data = {
    from: { principal: Principal.fromText(principal) },
    to: { principal: Principal.fromText(canisterId_bridge) },
    token: identifier,
    amount: 1,
    memo: [0],
    notify: false,
    subaccount: [],
  };

  const nftActor = await createNFTActor(connectType);
  // @ts-ignore
  return nftActor.transfer(data);
};

export const getTokenIdentifier = async (id: string | number) => {
  const brageActor = await createBrageActor();
  let index;

  if (typeof id === 'string') {
    const result = await brageActor.getTokenId_ic(id);
    if ('ok' in result) {
      index = result.ok;
    } else {
      throw new Error('no token index');
    }
  } else {
    index = id;
  }

  const res = await brageActor.getTokenIdentifier(index);

  if ('ok' in res) {
    return Promise.resolve(res.ok);
  } else {
    return Promise.reject(res.err);
  }
};

export const getXRPMetadata = async (tokenIndex: number) => {
  const brageActor = await createBrageActor();
  const res = await brageActor.getMetadata_xrp(tokenIndex);
  console.log(res, 'xrp metadata');
  if ('ok' in res) {
    return Promise.resolve(res.ok);
  } else {
    return Promise.reject(res.err);
  }
};

export const getICMetadata = async (tokenIndex: number) => {
  const brageActor = await createBrageActor();
  const res = await brageActor.getMetadata_ic(tokenIndex);
  console.log(res, 'icp metadata');
  if ('ok' in res) {
    //@ts-ignore
    return Promise.resolve(blob2text(nonfungible.metadata[0]));
  } else {
    return Promise.reject(res.err);
  }
};
