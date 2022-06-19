import { TokenInfo } from './services/declarations/bridge/bridge.did';
import { NFTokenFormated } from './types/token';

export const formatToken = (token: TokenInfo): NFTokenFormated => {
  const serliezdToken = serliezd(token);
  return {
    id: token.isOnIC ? token.tokenIndex : token.nftokenID,
    chain: token.isOnIC ? 'ICP' : 'XRP',
    metadata: serliezdToken.metadata,
    tokenIdentifier: token.tokenIdentifier,
  };
};

export const ellipsis = (str: string): string => {
  const arr = str.split('-');
  return `${arr[0]}-${arr[1]}****${arr[arr.length - 2]}-${arr[arr.length - 1]}`;
};

export const ellipsisShort = (str: string): string => {
  const arr = str.split('-');
  return `${arr[0]}****${arr[arr.length - 1]}`;
};

export const ellipsisKey = (str: string) => {
  const strstart = str.substring(0, 6);
  const strend = str.substring(str.length - 6, str.length);
  return `${strstart}***${strend}`;
};

const blob2text = (blob: string) => {
  return Buffer.from(blob, 'utf8').toString();
};

export const serliezd = (tokenInfo: TokenInfo) => {
  let tokenIdentifier = tokenInfo.tokenIdentifier;
  let tokenIndex = tokenInfo.tokenIndex;
  let isOnIC = tokenInfo.isOnIC;
  let metadata = tokenInfo.metadata;
  let nftokenID = tokenInfo.nftokenID;

  if (isOnIC) {
    // @ts-ignore
    metadata = blob2text(
      // @ts-ignore
      tokenInfo.metadata.metadata_ic.nonfungible.metadata[0]
    );
  } else {
    // @ts-ignore
    metadata = tokenInfo.metadata.metadata_xrp;
  }
  return {
    tokenIdentifier: tokenIdentifier,
    tokenIndex: tokenIndex,
    isOnIC: isOnIC,
    metadata: metadata as unknown as string,
    nftokenID: nftokenID,
  };
};
