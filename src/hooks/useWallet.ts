import {
  isRegisterUser,
  getXRPAccount,
  generateXRPAccount,
  setXRPAccount,
} from '../services';
import InternetIdentity from '../services/InternetIdentity';
import Stoic from '../services/stoic';
import { SignIdentity } from '@dfinity/agent';
import { ConnectType } from '../types/connect';

export const useWallet = () => {
  const getConnectData = async () => {
    let connectType: ConnectType;
    let identity: SignIdentity;

    if (await InternetIdentity.isAuthenticated()) {
      connectType = ConnectType.InternetIdentity;
      identity = await InternetIdentity.getIdentity();
    } else if (false) {
      connectType = ConnectType.Plug;
      identity = await InternetIdentity.getIdentity();
    } else if (await Stoic.isAuthenticated()) {
      connectType = ConnectType.Stoic;
      identity = await Stoic.getIdentity();
    } else {
      throw new Error('Error');
    }

    const tokens = await getXRPKeys(identity);

    return {
      type: connectType,
      principal: await identity.getPrincipal().toString(),
      xrp: tokens,
    };
  };

  const getXRPKeys = (
    identity: SignIdentity
  ): Promise<{ publicKey: string; privateKey: string }> => {
    const principal = identity.getPrincipal().toString();
    return isRegisterUser(identity, principal).then((res) => {
      console.log('isRegisterUser', res);
      if (res) {
        console.log('get XRP Account');
        return getXRPAccount(identity);
      } else {
        console.log('generate XRP Account');
        return generateXRPAccount().then((res) => {
          console.log('set XRP Account', res);
          return setXRPAccount(
            identity,
            res.account.classicAddress,
            res.account.secret
          );
        });
      }
    });
  };

  return {
    getXRPKeys,
    getConnectData,
    connectII: InternetIdentity.connect,
    connectStoic: Stoic.connect,
    disconnectII: InternetIdentity.disconnect,
    disconnectStoic: Stoic.disconnect,
  };
};
