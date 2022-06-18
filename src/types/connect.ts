export enum ConnectType {
  Stoic = 'stoic',
  InternetIdentity = 'internetIdentity',
  Plug = 'plug',
}

export interface ConnectData {
  type: ConnectType;
  principal: string;
  xrp?: {
    publicKey: string;
    privateKey: string;
  };
}
