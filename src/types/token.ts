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
