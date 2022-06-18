export interface NFTToken {
  tokenIdentifier: string;
  tokenIndex: number;
  isOnIC: boolean;
  metadata: string;
  nftokenID: string;
}

export interface NFTTokenFormated {
  id: string | number;
  chain: 'XRP' | 'ICP';
  metadata: string;
  tokenIdentifier: string;
}

export interface CrossToken {
  xrpPublicKey: string;
  xrpPrivateKey: string;
  principal: string;
}

export interface CrossToken2XRP extends CrossToken {
  TokenIndex: number;
}

export interface CrossToken2IC extends CrossToken {
  NFTokenID: string;
}