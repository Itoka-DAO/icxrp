import { useContext, useState, useMemo } from 'react';
import { MainContext, Step } from '../context';
import { crossIC2XRP, crossXRP2IC } from '../services';
import { NFTokenFormated } from '../types/token';
import { useConnect } from './useConnect';
import { useToken } from './useToken';

export const useTransfer = () => {
  const { step, setStep, selectedTransferNFT, setSelectedTransferNFT } =
    useContext(MainContext);

  const { isConnect, connectData } = useConnect();
  const { userToken } = useToken();
  const [submitLoading, setSubmitLoading] = useState(false);

  const canSelectNFTs = useMemo(() => {
    return userToken.filter((item) => !selectedTransferNFT.includes(item));
  }, [selectedTransferNFT, userToken]);

  const discardChange = () => {
    setSelectedTransferNFT([]);
  };

  const selectNFT = (token: NFTokenFormated) => {
    setSelectedTransferNFT([...selectedTransferNFT, token]);
  };

  const unSelectNFT = (token: NFTokenFormated) => {
    setSelectedTransferNFT(
      selectedTransferNFT.filter((item) => item !== token)
    );
  };

  const verifyTransfer = () => {
    setStep(Step.Verify);
  };

  const submitTransfer = async () => {
    if (!isConnect || !connectData?.xrp) return;
    setSubmitLoading(true);
    const CrossPayload = {
      xrpPublicKey: connectData.xrp.publicKey,
      xrpPrivateKey: connectData.xrp.privateKey,
      principal: connectData.principal,
    };
    selectedTransferNFT.map((item) => {
      if (item.chain === 'ICP') {
        crossIC2XRP({ ...CrossPayload, TokenIndex: Number(item.id) });
      }
      if (item.chain === 'XRP') {
        crossXRP2IC({ ...CrossPayload, NFTokenID: item.id.toString() });
      }
      return item;
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        setSubmitLoading(false);
        setStep(Step.Completed);
      }, 5000);
    });
  };

  const completeToReturn = () => {
    setSelectedTransferNFT([]);
    backToTransfer();
  };

  const backToTransfer = () => {
    setStep(Step.Transfer);
  };

  return {
    step,
    selectNFT,
    unSelectNFT,
    verifyTransfer,
    submitTransfer,
    backToTransfer,
    discardChange,
    selectedTransferNFT,
    canSelectNFTs,
    submitLoading,
    completeToReturn,
  };
};
