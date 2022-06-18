import { NFTToken, NFTTokenFormated } from './types/token';

export const formatToken = (token: NFTToken): NFTTokenFormated => {
  return {
    id: token.isOnIC ? token.tokenIndex : token.nftokenID,
    chain: token.isOnIC ? 'ICP' : 'XRP',
    metadata: token.metadata,
    tokenIdentifier: token.tokenIdentifier,
  };
};

export const ellipsis = (str: string): string => {
  const arr = str.split('-');
  return `${arr[0]}-${arr[1]}****${arr[arr.length - 2]}-${arr[arr.length - 1]}`;
};
