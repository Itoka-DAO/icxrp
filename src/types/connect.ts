import { SignIdentity } from '@dfinity/agent';

export enum ConnectType {
  Stoic = 'stoic',
  InternetIdentity = 'internetIdentity',
  Plug = 'plug',
}

export interface ConnectData {
  type: ConnectType;
  principal: string;
  identity: SignIdentity;
  xrp?: {
    publicKey: string;
    privateKey: string;
  };
}
