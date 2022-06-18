import { useContext, useState, useMemo } from 'react';
import { MainContext, Step } from '../context';
import { NFTTokenFormated } from '../types/token';

export const useTransfer = () => {
  const {
    step,
    setStep,
    selectedTransferNFT,
    setSelectedTransferNFT,
    userToken,
  } = useContext(MainContext);
  const [submitLoading, setSubmitLoading] = useState(false);

  const canSelectNFTs = useMemo(() => {
    return userToken.filter((item) => !selectedTransferNFT.includes(item));
  }, [selectedTransferNFT, userToken]);

  const discardChange = () => {
    setSelectedTransferNFT([]);
  };

  const selectNFT = (token: NFTTokenFormated) => {
    setSelectedTransferNFT([...selectedTransferNFT, token]);
  };

  const unSelectNFT = (token: NFTTokenFormated) => {
    setSelectedTransferNFT(
      selectedTransferNFT.filter((item) => item !== token)
    );
  };

  const verifyTransfer = () => {
    setStep(Step.Verify);
  };

  const submitTransfer = async () => {
    setSubmitLoading(true);

    selectedTransferNFT.map((item) => {
      if (item.chain === 'ICP') {
        // crossIC2XRP()
      }

      if (item.chain === 'XRP') {
        // crossXRP2IC()
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
