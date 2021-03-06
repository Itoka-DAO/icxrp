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
  logining: boolean;
  setLogining: React.Dispatch<React.SetStateAction<boolean>>;
  loadingToken: boolean;
  setLoadingToken: React.Dispatch<React.SetStateAction<boolean>>;
  loadingUserToken: boolean;
  setLoadingUserToken: React.Dispatch<React.SetStateAction<boolean>>;
  setUserTokenInit: React.Dispatch<React.SetStateAction<boolean>>;
  transferXRPHash: { indexToken: number, hash: string }[];
  setTransferXRPHash: React.Dispatch<React.SetStateAction<{ indexToken: number, hash: string }[]>>;
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
  logining: false,
  setLogining: () => { },
  loadingToken: false,
  setLoadingToken: () => { },
  loadingUserToken: false,
  setLoadingUserToken: () => { },
  setUserTokenInit: () => { },
  transferXRPHash: [],
  setTransferXRPHash: () => { }
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

  const [logining, setLogining] = useState(true)
  const [loadingToken, setLoadingToken] = useState(false)
  const [loadingUserToken, setLoadingUserToken] = useState(false)

  const [transferXRPHash, setTransferXRPHash] = useState<{ indexToken: number, hash: string }[]>([])

  const getAllUserToken = useCallback(async () => {
    if (!isConnect || !connectData || !connectData.xrp || allToken.length === 0) return [];
    setUserTokenInit(true);
    setLoadingUserToken(true)
    console.log("Get user IC Tokens")
    const userICTokenIndexs = await getUserICTokenIndexs(connectData.principal);

    console.log("Get user XRP Tokens")
    const userXRPTokens = await getXRPNFTokens(connectData.xrp.publicKey, connectData.xrp.privateKey);

    const userTokens = [...userICTokenIndexs, ...userXRPTokens]

    const allUserTokens = allToken.filter(token => {
      return userTokens.includes(token.tokenId)
    })

    console.log("allXRP Tokens", allUserTokens)
    setLoadingUserToken(false)
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

    // getConnectType().then(res => {
    //   if (res) {

    //   }

    //   setLogining(false)
    // })

    getConnectData().then(res => {
      setConnectData(res)
      setConnect(true)
    }).catch(() => {
      console.log("No connect data")
    }).finally(() => {
      setLogining(false)
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
      allToken, setAllToken, userToken,
      logining, setLogining,
      loadingToken, setLoadingToken,
      setUserTokenInit,
      loadingUserToken, setLoadingUserToken,
      transferXRPHash, setTransferXRPHash
    }}>
      {children}
    </MainContext.Provider>
  )

};
