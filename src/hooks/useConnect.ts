import { useContext } from 'react';
import { SignIdentity } from '@dfinity/agent';
import { MainContext } from '../context';
import { ConnectType } from '../types/connect';
import { useWallet } from './';

export const useConnect = () => {
  const { connectStoic, connectII, disconnectII, disconnectStoic, getXRPKeys } =
    useWallet();

  const {
    isConnect,
    setConnect,
    connectPanelVisible,
    setConnectPanelVisible,
    connectData,
    setConnectData,
  } = useContext(MainContext);

  const connect = async (type: ConnectType) => {
    let identity: SignIdentity;
    let connectType: ConnectType;

    if (type === ConnectType.InternetIdentity) {
      connectType = ConnectType.InternetIdentity;
      identity = await connectII();
    } else if (type === ConnectType.Stoic) {
      connectType = ConnectType.Stoic;
      identity = await connectStoic();
    } else if (type === ConnectType.Plug) {
      connectType = ConnectType.Plug;
      identity = await connectII();
    } else {
      throw new Error('Error');
    }

    const tokens = await getXRPKeys(identity);
    setConnectData({
      type: connectType,
      principal: await identity.getPrincipal().toString(),
      xrp: tokens,
    });
    setConnect(true);
    setConnectPanelVisible(false);
  };

  const disconnect = async () => {
    if (connectData?.type === ConnectType.InternetIdentity) {
      await disconnectII();
    }

    if (connectData?.type === ConnectType.Stoic) {
      await disconnectStoic();
    }

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
  };
};
