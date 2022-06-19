import { useCallback, useContext, useEffect } from 'react';
import { MainContext } from '../context';
import { getAllTokens } from '../services';
import { formatToken } from '../utils';

export const useToken = () => {
  const {
    allToken,
    setAllToken,
    userToken,
    loadingToken,
    setLoadingToken,
    setUserTokenInit,
    loadingUserToken,
  } = useContext(MainContext);

  const initToken = useCallback(() => {
    console.log('init token');
    setUserTokenInit(false);
    setLoadingToken(true);
    setAllToken([]);
    getAllTokens().then((res) => {
      setAllToken(res.map((item) => formatToken(item)));
      setLoadingToken(false);
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
    loading: loadingToken || loadingUserToken,
  };
};
