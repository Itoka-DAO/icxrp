import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Account = { 'ic' : Principal } |
  { 'xrp' : XrpPublicKey };
export type AccountIdentifier = string;
export type AccountIdentifier__1 = string;
export type Balance = bigint;
export type BalanceResponse = { 'ok' : Balance } |
  { 'err' : CommonError };
export interface Bridge {
  'addCustodian' : ActorMethod<[Principal], Result>,
  'balance_bridge' : ActorMethod<[TokenIndex], BalanceResponse>,
  'getAccountIdentifier' : ActorMethod<[Principal], AccountIdentifier__1>,
  'getAllTokenInfo' : ActorMethod<[], Result_7>,
  'getCustodian' : ActorMethod<[], Array<Principal>>,
  'getIsOnIC' : ActorMethod<[TokenIndex], Result_6>,
  'getMetadata_ic' : ActorMethod<[TokenIndex], Result_5>,
  'getMetadata_xrp' : ActorMethod<[TokenIndex], Result_2>,
  'getTokenId_ic' : ActorMethod<[NFTokenID], Result_1>,
  'getTokenId_xrp' : ActorMethod<[TokenIndex], Result_4>,
  'getTokenIdentifier' : ActorMethod<[TokenIndex], Result_3>,
  'getTransactions' : ActorMethod<
    [bigint, bigint],
    Array<CrossBridgeTranscation>,
  >,
  'getXrplIssuerPrincipal' : ActorMethod<[], Principal>,
  'ic2xrp' : ActorMethod<
    [TokenIndex, NFTokenID, Principal, XrpPublicKey],
    BalanceResponse,
  >,
  'setIdx2TokenIdentifier' : ActorMethod<[TokenIdentifier__1], Result_1>,
  'setMetadata_ic' : ActorMethod<[], Result_2>,
  'setMetadata_xrp' : ActorMethod<[TokenIndex, string], Result_1>,
  'setXrplIssuerPrincipal' : ActorMethod<[Principal], Result>,
  'thisCanister' : ActorMethod<[], Principal>,
  'xrp2ic' : ActorMethod<
    [TokenIndex, NFTokenID, XrpPublicKey, Principal],
    TransferResponse,
  >,
}
export type CommonError = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export interface CrossBridgeTranscation {
  'op' : Operation,
  'to' : Account,
  'tokenIndex' : TokenId,
  'from' : Account,
  'timestamp' : Time,
  'index' : bigint,
}
export type Metadata = {
    'fungible' : {
      'decimals' : number,
      'metadata' : [] | [Array<number>],
      'name' : string,
      'symbol' : string,
    }
  } |
  { 'nonfungible' : { 'metadata' : [] | [Array<number>] } };
export type MetadataURL = { 'metadata_ic' : Metadata } |
  { 'metadata_xrp' : string };
export type NFTokenID = string;
export type Operation = { 'XRP2IC' : null } |
  { 'IC2XRP' : null };
export type Result = { 'ok' : Principal } |
  { 'err' : string };
export type Result_1 = { 'ok' : TokenIndex } |
  { 'err' : string };
export type Result_2 = { 'ok' : string } |
  { 'err' : string };
export type Result_3 = { 'ok' : TokenIdentifier__1 } |
  { 'err' : string };
export type Result_4 = { 'ok' : NFTokenID } |
  { 'err' : string };
export type Result_5 = { 'ok' : Metadata } |
  { 'err' : string };
export type Result_6 = { 'ok' : boolean } |
  { 'err' : string };
export type Result_7 = { 'ok' : Array<TokenInfo> } |
  { 'err' : string };
export type Time = bigint;
export interface TokenId { 'ic' : TokenIndex, 'xrp' : NFTokenID }
export type TokenIdentifier = string;
export type TokenIdentifier__1 = string;
export type TokenIndex = number;
export interface TokenInfo {
  'tokenIdentifier' : TokenIdentifier__1,
  'tokenIndex' : TokenIndex,
  'metadata' : MetadataURL,
  'isOnIC' : boolean,
  'nftokenID' : NFTokenID,
}
export type TransferResponse = { 'ok' : Balance } |
  {
    'err' : { 'CannotNotify' : AccountIdentifier } |
      { 'InsufficientBalance' : null } |
      { 'InvalidToken' : TokenIdentifier } |
      { 'Rejected' : null } |
      { 'Unauthorized' : AccountIdentifier } |
      { 'Other' : string }
  };
export type XrpPublicKey = string;
export interface _SERVICE extends Bridge {}
