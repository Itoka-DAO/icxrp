import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type PublicKey = string;
export type Result = { 'ok' : XRPAccount } |
  { 'err' : string };
export type Result_1 = { 'ok' : Principal } |
  { 'err' : string };
export type Result_2 = { 'ok' : Array<[Principal, XRPAccount]> } |
  { 'err' : string };
export interface XRPAccount { 'publicKey' : PublicKey, 'privateKey' : string }
export interface XRPAccountManager {
  'addCustodian' : ActorMethod<[Principal], Result_1>,
  'getAllPublicKey' : ActorMethod<[], Array<PublicKey>>,
  'getMapping' : ActorMethod<[], Result_2>,
  'getXRPAccount' : ActorMethod<[], Result>,
  'isRegisteredUser' : ActorMethod<[Principal], boolean>,
  'removeCustodian' : ActorMethod<[Principal], Result_1>,
  'setXRPAccount' : ActorMethod<[string, string], Result>,
  'setXRPAccountByCustodian' : ActorMethod<[Principal, string, string], Result>,
  'whoAreCustodians' : ActorMethod<[], Array<Principal>>,
  'whoami' : ActorMethod<[], Principal>,
}
export interface _SERVICE extends XRPAccountManager {}
