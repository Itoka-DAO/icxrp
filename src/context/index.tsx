import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { NFTTokenFormated } from '../types/token';
import { formatToken } from '../utils';

export enum Step {
  Transfer,
  Verify,
  Completed
}

interface MainContextType {
  isConnect: boolean;
  setConnect: React.Dispatch<React.SetStateAction<boolean>>;
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

  const [isConnect, setConnect] = useState(false)
  const [connectPanelVisible, setConnectPanelVisible] = useState(false)

  const [step, setStep] = useState(Step.Transfer)

  const [selectedTransferNFT, setSelectedTransferNFT] = useState<NFTTokenFormated[]>([])

  const [allToken, setAllToken] = useState<NFTTokenFormated[]>([])
  const userToken = useMemo(() => {
    if (!isConnect) return []
    return allToken;
  }, [allToken, isConnect])

  return (
    <MainContext.Provider value={{
      isConnect, setConnect,
      connectPanelVisible, setConnectPanelVisible,
      step, setStep,
      selectedTransferNFT, setSelectedTransferNFT,
      allToken, setAllToken, userToken
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

export const useTransfer = () => {

  const { step, setStep, selectedTransferNFT, setSelectedTransferNFT, userToken } = useContext(MainContext)
  const [submitLoading, setSubmitLoading] = useState(false)

  const canSelectNFTs = useMemo(() => {
    return userToken.filter(item => !selectedTransferNFT.includes(item))
  }, [selectedTransferNFT, userToken])

  const discordChange = () => {
    setSelectedTransferNFT([])
  }

  const selectNFT = (token: NFTTokenFormated) => {
    setSelectedTransferNFT([...selectedTransferNFT, token])
  }

  const unSelectNFT = (token: NFTTokenFormated) => {
    setSelectedTransferNFT(selectedTransferNFT.filter(item => item !== token))
  }

  const verifyTransfer = () => {
    setStep(Step.Verify)
  }

  const submitTransfer = async () => {
    setSubmitLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        setSubmitLoading(false)
        setStep(Step.Completed)
      }, 5000);
    })

  }

  const backToTransfer = () => {
    setStep(Step.Transfer)
  }


  return {
    step,
    selectNFT,
    unSelectNFT,
    verifyTransfer,
    submitTransfer,
    backToTransfer,
    discordChange,
    selectedTransferNFT,
    canSelectNFTs,
    submitLoading
  }

}

export const useToken = () => {

  const { allToken, setAllToken } = useContext(MainContext)

  useEffect(() => {

    setAllToken([
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-0", tokenIndex: 0, isOnIC: true, metadata: "1111", nftokenID: "" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-1", tokenIndex: 1, isOnIC: true, metadata: "1111", nftokenID: "" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-2", tokenIndex: 1, isOnIC: false, metadata: "1111", nftokenID: "1" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-3", tokenIndex: 1, isOnIC: true, metadata: "1111", nftokenID: "" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-4", tokenIndex: 1, isOnIC: false, metadata: "1111", nftokenID: "2" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-5", tokenIndex: 1, isOnIC: false, metadata: "1111", nftokenID: "3" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-6", tokenIndex: 1, isOnIC: true, metadata: "1111", nftokenID: "" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-7", tokenIndex: 1, isOnIC: false, metadata: "1111", nftokenID: "4" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-8", tokenIndex: 1, isOnIC: false, metadata: "1111", nftokenID: "5" },
      { tokenIdentifier: "p2xe7-2ikor-uwiaa-aaaaa-caasv-yaqca-aaaaa-9", tokenIndex: 1, isOnIC: true, metadata: "1111", nftokenID: "" },
    ].map(item => formatToken(item)))

  }, [setAllToken])

  return {
    allToken
  }

}
