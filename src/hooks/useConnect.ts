import { useContext } from 'react';
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
    if (type === ConnectType.InternetIdentity) {
      await connectII().then((res) => {
        const principal = res.getPrincipal().toString();
        getXRPKeys(principal).then((res) => {
          setConnectData({
            type: ConnectType.InternetIdentity,
            principal: principal,
            xrp: res,
          });
        });
      });
    }

    if (type === ConnectType.Stoic) {
      await connectStoic().then((res) => {
        const principal = res.getPrincipal().toString();
        getXRPKeys(principal).then((res) => {
          setConnectData({
            type: ConnectType.InternetIdentity,
            principal: principal,
            xrp: res,
          });
        });
      });
    }

    if (type === ConnectType.Plug) {
    }

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
