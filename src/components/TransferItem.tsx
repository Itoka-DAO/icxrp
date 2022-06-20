import { HStack, Icon, Tag, Text, VStack, Flex, Tooltip, Image, Modal, ModalBody, ModalContent, ModalOverlay, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiCheckCircle, FiPlusSquare, FiXCircle, FiArrowRight } from 'react-icons/fi'
import { getICMetadata, getXRPMetadata } from "../services";
import { NFTokenFormated } from "../types/token";
import { ellipsis } from "../utils";

interface BlockChainTagProps {
  chain: "XRP" | "ICP";
  type?: "added" | "success";
  xrpLink?: string;
}

export const BlockChainTag = ({ chain, type, xrpLink }: BlockChainTagProps) => {

  const primary = chain;
  const other = chain === "ICP" ? "XRP" : "ICP";

  switch (type) {
    case "added":
      return (
        <HStack spacing="1">
          <Tag w="44px" textAlign="center" fontWeight={700} color="white" bgColor={primary.toLowerCase()}>{primary}</Tag>
          <Icon color="gray.500" fontSize="2xl" as={FiArrowRight} />
          <Tag w="44px" textAlign="center" fontWeight={700} color={other.toLowerCase()} bgColor="transparent">{other}</Tag>
        </HStack>
      )
    case "success":
      return (
        <HStack spacing="1">
          <Tag w="44px" textAlign="center" fontWeight={700} bgColor="transparent" color={primary.toLowerCase()}>
            {primary === "XRP" ? <Link textDecoration="underline" target="_blank" href={xrpLink}>{primary}</Link> : primary}
          </Tag>
          <Icon color="gray.500" fontSize="2xl" as={FiArrowRight} />
          <Tag w="44px" textAlign="center" fontWeight={700} bgColor={other.toLowerCase()} color="white">
            {other === "XRP" ? <Link textDecoration="underline" target="_blank" href={xrpLink}>{other}</Link> : other}
          </Tag>
        </HStack>
      )
    default:
      return <Tag w="44px" textAlign="center" fontWeight={700} color="white" bgColor={primary.toLowerCase()}>{primary}</Tag>
  }

}

interface TransferItemProps {
  onAddToTransfer?: () => void;
  onRemoveFromTransfer?: () => void;
  type?: "added" | "success"
  nftData: NFTokenFormated;
  disabled?: boolean;
  xrpLink?: string;
}

const TransferItem = ({ onAddToTransfer, onRemoveFromTransfer, type, nftData, disabled, xrpLink }: TransferItemProps) => {

  const [isOpen, setIsOpen] = useState(false)

  const [image, setImage] = useState("")

  useEffect(() => {
    if (type === "success") {
      if (nftData.chain === "ICP") {
        getXRPMetadata(nftData.tokenIndex).then(setImage)
      }
      if (nftData.chain === "XRP") {
        getICMetadata(nftData.tokenIndex).then(setImage)
      }
    }
    setImage(nftData.metadata)
  }, [nftData, type])


  return (
    <Flex align="center" justifyContent="space-between" color="white" fontSize="sm" h="78px" borderBottom="1px solid white" px="4">
      <HStack spacing={2}>
        <Text>{nftData.tokenIndex}</Text>
        <Image cursor="pointer" onClick={() => setIsOpen(true)} src={image} w="60px" />
        <Tooltip closeOnMouseDown={false} label={nftData.tokenIdentifier}>
          <Text pl={type === "success" ? 10 : 2}>{ellipsis(nftData?.tokenIdentifier)}</Text>
        </Tooltip>
      </HStack>
      <HStack spacing="6">
        <BlockChainTag chain={nftData.chain} type={type} xrpLink={xrpLink} />
        {onAddToTransfer && !disabled && <VStack spacing="0.5" color="primary" onClick={disabled ? undefined : onAddToTransfer} >
          <Icon fontSize="2xl" as={FiPlusSquare} />
          <Text fontWeight={600}>Add to Transfer</Text>
        </VStack>}
        {onRemoveFromTransfer && <Icon color="primary" onClick={onRemoveFromTransfer} fontSize="2xl" as={FiXCircle} />}
        {type === "success" && <Icon color="second" fontSize="2xl" as={FiCheckCircle} />}
      </HStack>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image src={image} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )

}

export default TransferItem;

interface ReadyToAddTransferItemProps extends Required<Pick<TransferItemProps, "onAddToTransfer" | "nftData">> {
  disabled: boolean;
}
export const ReadyToAddTransferItem = (props: ReadyToAddTransferItemProps) => (
  <TransferItem {...props} disabled={props.disabled} />
)

interface ReadyForTransferItemProps extends Required<Pick<TransferItemProps, "onRemoveFromTransfer" | "nftData">> {
}
export const ReadyForTransferItem = (props: ReadyForTransferItemProps) => (
  <TransferItem type="added" {...props} />
)

interface SuccessTransferItemProps extends Required<Pick<TransferItemProps, "nftData" | "xrpLink">> { }
export const SuccessTransferItem = (props: SuccessTransferItemProps) => <TransferItem type="success" {...props} />
