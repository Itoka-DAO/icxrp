import { createContext, ReactNode, useContext, useState } from 'react';

interface MainContextType {
  isConnect: boolean;
  setConnect: React.Dispatch<React.SetStateAction<boolean>>;
  connectPanelVisible: boolean;
  setConnectPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue = {
  isConnect: false,
  setConnect: () => { },
  connectPanelVisible: false,
  setConnectPanelVisible: () => { }
};

export const MainContext = createContext<MainContextType>(defaultValue);

export const MainProvider = ({ children }: { children: ReactNode }) => {

  const [isConnect, setConnect] = useState(false)
  const [connectPanelVisible, setConnectPanelVisible] = useState(false)

  return (
    <MainContext.Provider value={{
      isConnect, setConnect,
      connectPanelVisible, setConnectPanelVisible
    }}>
      {children}
    </MainContext.Provider>
  )

};


export const useConnect = () => {

  const { isConnect, setConnect, connectPanelVisible, setConnectPanelVisible } = useContext(MainContext)

  const connect = () => {
    setConnect(true)
    setConnectPanelVisible(false)
  }

  const disconnect = () => {
    setConnect(false)
  }

  const openConnectPanel = () => {
    setConnectPanelVisible(true)
  }

  const closeConnectPanel = () => {
    setConnectPanelVisible(false)
  }


  return {
    connect, disconnect, isConnect, connectPanelVisible,
    openConnectPanel, closeConnectPanel
  }

}
