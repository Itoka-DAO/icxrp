import { useCallback, useContext, useEffect } from 'react';
import { MainContext } from '../context';
import { getAllTokens } from '../services';
import { formatToken } from '../utils';

export const useToken = () => {
  const { allToken, setAllToken, userToken } = useContext(MainContext);

  const initToken = useCallback(() => {
    console.log('init token');
    setAllToken([]);
    getAllTokens().then((res) => {
      const list = res.map((item) => formatToken(item));
      setAllToken(list);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    allToken,
    userToken,
    initToken,
  };
};
