import { useContext, useState, useMemo } from 'react';
import { MainContext, Step } from '../context';
import {
  crossIC2XRP,
  crossXRP2IC,
  getTokenIdentifier,
  transferNFT,
} from '../services';
import { NFTokenFormated } from '../types/token';
import { useConnect } from './useConnect';
import { useToken } from './useToken';
import { useSteps } from 'chakra-ui-steps';

export const transfer2ICSteps = [
  { label: 'Query XRP keys' },
  { label: 'request burning to XRPL' },
];

export const transfer2XRPSteps = [
  { label: 'request stacking' },
  { label: 'request minting to XRPL' },
];

export const useTransfer = () => {
  const {
    step,
    setStep,
    selectedTransferNFT,
    setSelectedTransferNFT,
    transferXRPHash,
    setTransferXRPHash,
  } = useContext(MainContext);

  const { isConnect, connectData } = useConnect();
  const { userToken, initToken } = useToken();
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    nextStep,
    reset,
    activeStep: transferStep,
  } = useSteps({
    initialStep: 0,
  });

  const canSelectNFTs = useMemo(() => {
    return userToken.filter(
      (item) =>
        !selectedTransferNFT.map((item) => item.tokenId).includes(item.tokenId)
    );
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

    for await (const item of selectedTransferNFT) {
      if (item.chain === 'ICP') {
        const identifier = await getTokenIdentifier(item.tokenId);
        const transferRes = await transferNFT(
          connectData.principal,
          identifier,
          connectData.type
        );
        if ('err' in transferRes) {
          console.log(transferRes);
        }
      }

      nextStep();

      if (item.chain === 'ICP') {
        const res = await crossIC2XRP({
          ...CrossPayload,
          TokenIndex: Number(item.tokenId),
        });
        setTransferXRPHash([
          ...transferXRPHash,
          { indexToken: item.tokenIndex, hash: res?.res?.tx?.result?.hash },
        ]);
      }
      if (item.chain === 'XRP') {
        const res = await crossXRP2IC({
          ...CrossPayload,
          NFTokenID: item.tokenId.toString(),
        });
        setTransferXRPHash([
          ...transferXRPHash,
          { indexToken: item.tokenIndex, hash: res?.res?.tx?.result?.hash },
        ]);
      }
    }
    setStep(Step.Completed);
    reset();
    setSubmitLoading(false);
  };

  const completeToReturn = () => {
    initToken();
    setSelectedTransferNFT([]);
    backToTransfer();
    setTransferXRPHash([]);
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
    transferStep,
    transferXRPHash,
  };
};
