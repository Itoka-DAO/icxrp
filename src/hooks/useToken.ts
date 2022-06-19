import { useContext, useEffect } from 'react';
import { MainContext } from '../context';
import { getAllTokens } from '../services';
import { formatToken } from '../utils';

export const useToken = () => {
  const { allToken, setAllToken, userToken } = useContext(MainContext);

  useEffect(() => {
    getAllTokens().then((res) => {
      const list = res.map((item) => formatToken(item));
      setAllToken(list);
    });
  }, [setAllToken]);

  return {
    allToken,
    userToken,
  };
};
