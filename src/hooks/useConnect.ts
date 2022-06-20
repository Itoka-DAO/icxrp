import { useContext } from 'react';
import { SignIdentity } from '@dfinity/agent';
import { MainContext, Step } from '../context';
import { ConnectType } from '../types/connect';
import { useWallet } from './';

export const useConnect = () => {
  const {
    connectStoic,
    connectII,
    disconnectII,
    disconnectStoic,
    connectPlug,
    disconnectPlug,
    getXRPKeys,
  } = useWallet();

  const {
    isConnect,
    setConnect,
    connectPanelVisible,
    setConnectPanelVisible,
    connectData,
    setConnectData,
    logining,
    setStep,
  } = useContext(MainContext);

  const connect = async (type: ConnectType) => {
    let identity: SignIdentity | undefined;
    let connectType: ConnectType;
    let principal: string;

    if (type === ConnectType.InternetIdentity) {
      connectType = ConnectType.InternetIdentity;
      identity = await connectII();
      principal = identity.getPrincipal().toString();
    } else if (type === ConnectType.Stoic) {
      connectType = ConnectType.Stoic;
      identity = await connectStoic();
      principal = identity.getPrincipal().toString();
    } else if (type === ConnectType.Plug) {
      connectType = ConnectType.Plug;
      await connectPlug();
      principal =
        window?.ic?.plug.principalId ||
        (await window?.ic?.plug.getPrincipal()).toString();
    } else {
      throw new Error('Error');
    }

    setConnect(true);
    setConnectPanelVisible(false);
    const tokens = await getXRPKeys(connectType, principal);
    setConnectData({ type: connectType, identity, principal, xrp: tokens });
  };

  const disconnect = async () => {
    if (connectData?.type === ConnectType.InternetIdentity) {
      await disconnectII();
    }

    if (connectData?.type === ConnectType.Stoic) {
      await disconnectStoic();
    }

    if (connectData?.type === ConnectType.Plug) {
      await disconnectPlug();
    }

    setStep(Step.Transfer);
    setConnect(false);
    setConnectData(undefined);
  };

  const openConnectPanel = () => {
    setConnectPanelVisible(true);
  };

  const closeConnectPanel = () => {
    setConnectPanelVisible(false);
  };

  return {
    connect,
    disconnect,
    isConnect,
    connectPanelVisible,
    connectData,
    openConnectPanel,
    closeConnectPanel,
    isLogining: logining,
  };
};
