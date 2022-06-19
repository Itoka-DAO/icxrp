import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { useWallet } from '../hooks';
import { getUserICTokenIndexs } from '../services';
import { ConnectData } from '../types/connect';
import { NFTokenFormated } from '../types/token';

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
  selectedTransferNFT: NFTokenFormated[];
  setSelectedTransferNFT: React.Dispatch<React.SetStateAction<NFTokenFormated[]>>;
  allToken: NFTokenFormated[];
  setAllToken: React.Dispatch<React.SetStateAction<NFTokenFormated[]>>;
  userToken: NFTokenFormated[];
  // setUserToken: React.Dispatch<React.SetStateAction<NFTokenFormated[]>>;
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

  const { getConnectData } = useWallet()

  const [isConnect, setConnect] = useState(false)
  const [connectData, setConnectData] = useState<ConnectData>()
  const [connectPanelVisible, setConnectPanelVisible] = useState(false)

  const [step, setStep] = useState(Step.Transfer)

  const [selectedTransferNFT, setSelectedTransferNFT] = useState<NFTokenFormated[]>([])

  const [allToken, setAllToken] = useState<NFTokenFormated[]>([])

  const [userToken, setUserToken] = useState<NFTokenFormated[]>([])

  const getAllUserToken = useCallback(async () => {
    if (!isConnect || !connectData || !connectData.xrp || allToken.length === 0) return [];
    console.log("Get user IC Tokens")
    const userICTokenIndexs = await getUserICTokenIndexs(connectData.principal);
    const allICTokens = allToken.filter((item) =>
      userICTokenIndexs.includes(item.id as number)
    );
    console.log("Get user XRP Tokens")
    // const allXRPTokens = getXRPNFTokens(
    //   connectData.xrp.publicKey,
    //   connectData.xrp.privateKey
    // );
    return [...allICTokens]
  }, [allToken, connectData, isConnect])

  useEffect(() => {
    console.log("getToken")
    getAllUserToken().then(res => {
      setUserToken(res)
    })
  }, [getAllUserToken])

  useEffect(() => {
    getConnectData().then(res => {
      setConnectData(res)
      setConnect(true)
    })
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
