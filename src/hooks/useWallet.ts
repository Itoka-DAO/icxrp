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
import Plug from '../services/plug';

export const useWallet = () => {
  const getConnectType = async () => {
    let connectType: ConnectType | undefined = undefined;
    if (await InternetIdentity.isAuthenticated()) {
      connectType = ConnectType.InternetIdentity;
    } else if (await Plug.isAuthenticated()) {
      connectType = ConnectType.Plug;
    } else if (await Stoic.isAuthenticated()) {
      connectType = ConnectType.Stoic;
    }
    return connectType;
  };

  const getConnectData = async () => {
    let connectType: ConnectType;
    let identity: SignIdentity | undefined;
    let principal: string;

    if (await InternetIdentity.isAuthenticated()) {
      connectType = ConnectType.InternetIdentity;
      identity = await InternetIdentity.getIdentity();
      principal = identity.getPrincipal().toString();
    } else if (await Plug.isAuthenticated()) {
      connectType = ConnectType.Plug;
      principal =
        window.ic.plug.principalId ||
        (await window.ic.plug.getPrincipal()).toString();
      console.log('Login via plug');
    } else if (await Stoic.isAuthenticated()) {
      connectType = ConnectType.Stoic;
      identity = await Stoic.getIdentity();
      principal = identity.getPrincipal().toString();
    } else {
      return Promise.reject();
    }
    const tokens = await getXRPKeys(connectType, principal);

    return {
      type: connectType,
      identity,
      principal,
      xrp: tokens,
    };
  };

  const getXRPKeys = (
    connectType: ConnectType,
    principal: string
    // identity: SignIdentity
  ): Promise<{ publicKey: string; privateKey: string }> => {
    // const principal = identity.getPrincipal().toString();
    return isRegisterUser(principal).then((res) => {
      console.log('isRegisterUser', res);
      if (res) {
        console.log('get XRP Account');
        return getXRPAccount(connectType);
      } else {
        console.log('generate XRP Account');
        return generateXRPAccount().then((res) => {
          console.log('set XRP Account', res);
          return setXRPAccount(
            res.account.classicAddress,
            res.account.secret,
            connectType
          );
        });
      }
    });
  };

  return {
    getConnectType,
    getXRPKeys,
    getConnectData,
    connectII: InternetIdentity.connect,
    connectStoic: Stoic.connect,
    disconnectII: InternetIdentity.disconnect,
    disconnectStoic: Stoic.disconnect,
    connectPlug: Plug.connect,
    disconnectPlug: Plug.disconnect,
  };
};
