import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';
import { useWallet } from '../hooks';
import { getUserICTokenIndexs, getXRPNFTokens } from '../services';
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

  const [userTokenInit, setUserTokenInit] = useState(false)

  const getAllUserToken = useCallback(async () => {
    if (!isConnect || !connectData || !connectData.xrp || allToken.length === 0) return [];
    setUserTokenInit(true);
    console.log("Get user IC Tokens")
    const userICTokenIndexs = await getUserICTokenIndexs(connectData.principal);

    console.log("Get user XRP Tokens")
    const userXRPTokens = await getXRPNFTokens(connectData.xrp.publicKey, connectData.xrp.privateKey);

    const userTokens = [...userICTokenIndexs, ...userXRPTokens]

    const allUserTokens = allToken.filter(token => {
      return userTokens.includes(token.tokenId)
    })

    console.log("allXRP Tokens", allUserTokens)
    return allUserTokens
  }, [allToken, connectData, isConnect])

  useEffect(() => {
    if (userTokenInit) return;
    console.log("getToken")
    getAllUserToken().then(res => {
      setUserToken(res)
    })
  }, [getAllUserToken, userTokenInit])

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
