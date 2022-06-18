import { useContext, useEffect } from 'react';
import { MainContext } from '../context';
import { formatToken } from '../utils';

export const useToken = () => {
  const { allToken, setAllToken } = useContext(MainContext);

  useEffect(() => {
    setAllToken(
      [
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-0',
          tokenIndex: 0,
          isOnIC: true,
          metadata: '1111',
          nftokenID: '',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-1',
          tokenIndex: 1,
          isOnIC: true,
          metadata: '1111',
          nftokenID: '',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-2',
          tokenIndex: 2,
          isOnIC: false,
          metadata: '1111',
          nftokenID: '2',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-3',
          tokenIndex: 3,
          isOnIC: true,
          metadata: '1111',
          nftokenID: '',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-4',
          tokenIndex: 4,
          isOnIC: false,
          metadata: '1111',
          nftokenID: '4',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-5',
          tokenIndex: 5,
          isOnIC: false,
          metadata: '1111',
          nftokenID: '5',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-6',
          tokenIndex: 6,
          isOnIC: true,
          metadata: '1111',
          nftokenID: '6',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-7',
          tokenIndex: 7,
          isOnIC: false,
          metadata: '1111',
          nftokenID: '7',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-8',
          tokenIndex: 8,
          isOnIC: false,
          metadata: '1111',
          nftokenID: '8',
        },
        {
          tokenIdentifier: 'p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-9',
          tokenIndex: 9,
          isOnIC: true,
          metadata: '1111',
          nftokenID: '9',
        },
      ].map((item) => formatToken(item))
    );
  }, [setAllToken]);

  return {
    allToken,
  };
};
