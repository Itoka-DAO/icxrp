import { NFTToken, NFTTokenFormated } from './types/token';

export const formatToken = (token: NFTToken): NFTTokenFormated => {
  return {
    id: token.isOnIC ? token.tokenIndex : token.nftokenID,
    chain: token.isOnIC ? 'ICP' : 'XRP',
    metadata: token.metadata,
    tokenIdentifier: token.tokenIdentifier,
  };
};
