import axios from 'axios';
import { Actor, HttpAgent, SignIdentity } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { CrossToken2IC, CrossToken2XRP } from '../types/token';
import { idlFactory as xrpIdlFactory } from './declarations/xrp';

const canisterId_xrp = 'e7vz4-wqaaa-aaaai-aclha-cai';
// const canisterId_nft = 'n46fk-6qaaa-aaaai-ackxa-cai';
// const canisterId_bridge = 'hgfyg-4yaaa-aaaai-acloq-cai';

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
  const agent = new HttpAgent({
    host: 'https://ic0.app',
    identity,
  });
  return Actor.createActor(xrpIdlFactory, {
    agent,
    canisterId: canisterId_xrp,
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