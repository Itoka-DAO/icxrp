import { HStack, Icon, Tag, Text, VStack, Flex, Tooltip } from "@chakra-ui/react";
import { FiCheckCircle, FiPlusSquare, FiXCircle, FiArrowRight } from 'react-icons/fi'
import { NFTTokenFormated } from "../types/token";
import { ellipsis } from "../utils";

interface BlockChainTagProps {
  // isOnIC: boolean;
  // blockChain: "XRP" | "ICP";
  chain: "XRP" | "ICP"
  type?: "added" | "success"
}

export const BlockChainTag = ({ chain, type }: BlockChainTagProps) => {

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
          <Tag w="44px" textAlign="center" fontWeight={700} bgColor="transparent" color={other.toLowerCase()}>{other}</Tag>
          <Icon color="gray.500" fontSize="2xl" as={FiArrowRight} />
          <Tag w="44px" textAlign="center" fontWeight={700} bgColor={primary.toLowerCase()} color="white">{primary}</Tag>
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
  nftData: NFTTokenFormated;
}

const TransferItem = ({ onAddToTransfer, onRemoveFromTransfer, type, nftData }: TransferItemProps) => {

  return (
    <Flex align="center" justifyContent="space-between" color="white" fontSize="sm" h="78px" borderBottom="1px solid white" px="4">
      <HStack>
        <Text>{nftData.id}</Text>
        {/* <Image src={nftData?.thumb} /> */}
        <Tooltip closeOnMouseDown={false} label={nftData.tokenIdentifier}>
          {ellipsis(nftData?.tokenIdentifier)}
        </Tooltip>
      </HStack>
      <HStack spacing="6">
        <BlockChainTag chain={nftData.chain} type={type} />
        {onAddToTransfer && <VStack spacing="0.5" color="primary" onClick={onAddToTransfer}>
          <Icon fontSize="2xl" as={FiPlusSquare} />
          <Text fontWeight={600}>Add to Transfer</Text>
        </VStack>}
        {onRemoveFromTransfer && <Icon color="primary" onClick={onRemoveFromTransfer} fontSize="2xl" as={FiXCircle} />}
        {type === "success" && <Icon color="second" fontSize="2xl" as={FiCheckCircle} />}
      </HStack>
    </Flex>
  )

}

export default TransferItem;

interface ReadyToAddTransferItemProps extends Required<Pick<TransferItemProps, "onAddToTransfer" | "nftData">> { }
export const ReadyToAddTransferItem = (props: ReadyToAddTransferItemProps) => (
  <TransferItem {...props} />
)

interface ReadyForTransferItemProps extends Required<Pick<TransferItemProps, "onRemoveFromTransfer" | "nftData">> { }
export const ReadyForTransferItem = (props: ReadyForTransferItemProps) => (
  <TransferItem type="added" {...props} />
)

interface SuccessTransferItemProps extends Required<Pick<TransferItemProps, "nftData">> { }
export const SuccessTransferItem = (props: SuccessTransferItemProps) => <TransferItem type="success" {...props} />
