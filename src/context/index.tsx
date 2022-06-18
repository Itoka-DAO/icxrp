import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { useWallet } from '../hooks';
import InternetIdentity from '../services/InternetIdentity';
// import Stoic from '../services/stoic';
import { ConnectData, ConnectType } from '../types/connect';
// import { crossIC2XRP, crossXRP2IC } from '../services';
import { NFTTokenFormated } from '../types/token';

export enum Step {
  Transfer,
  Verify,
  Completed
}

interface MainContextType {
  isConnect: boolean;
  setConnect: React.Dispatch<React.SetStateAction<boolean>>;

  connectData?: ConnectData,
  setConnectData: React.Dispatch<React.SetStateAction<ConnectData | undefined>>;

  connectPanelVisible: boolean;
  setConnectPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
  step: Step,
  setStep: React.Dispatch<React.SetStateAction<Step>>;
  selectedTransferNFT: NFTTokenFormated[];
  setSelectedTransferNFT: React.Dispatch<React.SetStateAction<NFTTokenFormated[]>>;
  allToken: NFTTokenFormated[];
  setAllToken: React.Dispatch<React.SetStateAction<NFTTokenFormated[]>>;
  userToken: NFTTokenFormated[];
  // setUserToken: React.Dispatch<React.SetStateAction<NFTTokenFormated[]>>;
}

const defaultValue = {
  isConnect: false,
  setConnect: () => { },
  connectData: undefined,
  setConnectData: () => { },
  connectPanelVisible: false,
  setConnectPanelVisible: () => { },
  step: Step.Transfer,
  setStep: () => { },
  selectedTransferNFT: [],
  setSelectedTransferNFT: () => { },
  allToken: [],
  setAllToken: () => { },
  userToken: [],
  // setUserToken: () => { }
};

export const MainContext = createContext<MainContextType>(defaultValue);

export const MainProvider = ({ children }: { children: ReactNode }) => {

  const { getXRPKeys } = useWallet()

  const [isConnect, setConnect] = useState(false)
  const [connectData, setConnectData] = useState<ConnectData>()
  const [connectPanelVisible, setConnectPanelVisible] = useState(false)

  const [step, setStep] = useState(Step.Transfer)

  const [selectedTransferNFT, setSelectedTransferNFT] = useState<NFTTokenFormated[]>([])

  const [allToken, setAllToken] = useState<NFTTokenFormated[]>([])
  const userToken = useMemo(() => {
    if (!isConnect) return []
    return allToken;
  }, [allToken, isConnect])

  const init = async () => {
    if (await InternetIdentity.isAuthenticated()) {
      const identity = await InternetIdentity.getIdentity()
      const principal = identity.getPrincipal().toString()
      getXRPKeys(principal).then(res => {
        setConnect(true)
        setConnectData({
          type: ConnectType.InternetIdentity,
          principal: principal,
          xrp: res
        })
      })
    }
    // else if (await Stoic.isAuthenticated()) {
    //   console.log("Login via Stoic")
    //   setConnect(true)
    // }
    else if (false) {
      setConnect(true)
    }
  }

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainContext.Provider value={{
      isConnect, setConnect,
      connectData, setConnectData,
      connectPanelVisible, setConnectPanelVisible,
      step, setStep,
      selectedTransferNFT, setSelectedTransferNFT,
      allToken, setAllToken, userToken
    }}>
      {children}
    </MainContext.Provider>
  )

};
