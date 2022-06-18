import {
  isRegisterUser,
  getXRPAccount,
  generateXRPAccount,
  setXRPAccount,
} from '../services';
import InternetIdentity from '../services/InternetIdentity';
import Stoic from '../services/stoic';

export const useWallet = () => {
  const getXRPKeys = (
    principal: string
  ): Promise<{ publicKey: string; privateKey: string }> => {
    return isRegisterUser(principal).then((res) => {
      console.log('isRegisterUser', res);
      if (res) {
        console.log('get XRP Account');
        return getXRPAccount();
      } else {
        console.log('generate XRP Account');
        return generateXRPAccount().then((res) => {
          console.log('set XRP Account', res);
          return setXRPAccount(res.account.classicAddress, res.account.secret);
        });
      }
    });
  };

  return {
    getXRPKeys,
    connectII: InternetIdentity.connect,
    connectStoic: Stoic.connect,
    disconnectII: InternetIdentity.disconnect,
    disconnectStoic: Stoic.disconnect,
  };
};
