import { HStack, Icon, Image, Tag, Text, VStack, Flex, Box } from "@chakra-ui/react";
import { FiCheckCircle, FiPlusSquare, FiXCircle, FiArrowRight } from 'react-icons/fi'

interface BlockChainTagProps {
  blockChain: "XRP" | "ICP";
  type?: "added" | "success"
}

export const BlockChainTag = ({ blockChain, type }: BlockChainTagProps) => {

  const primary = blockChain;
  const other = (blockChain === "XRP") ? "ICP" : "XRP";


  switch (type) {
    case "added":
      return (
        <Box>
          <Tag w="44px" textAlign="center" fontWeight={700} color="white" bgColor={primary.toLowerCase()}>{primary}</Tag>
          <Icon fontSize="2xl" as={FiArrowRight} />
          <Tag w="44px" textAlign="center" fontWeight={700} color={other.toLowerCase()} bgColor="transparent">{other}</Tag>
        </Box>
      )
    case "success":
      return (
        <Box>
          <Tag w="44px" textAlign="center" fontWeight={700} bgColor="transparent" color={other.toLowerCase()}>{other}</Tag>
          <Icon fontSize="2xl" as={FiArrowRight} />
          <Tag w="44px" textAlign="center" fontWeight={700} bgColor={primary.toLowerCase()} color="white">{primary}</Tag>
        </Box>
      )
    default:
      return <Tag w="44px" textAlign="center" fontWeight={700} color="white" bgColor={primary.toLowerCase()}>{primary}</Tag>
  }

}

interface TransferItemProps {
  onAddToTransfer?: () => void;
  onRemoveFromTransfer?: () => void;
  type?: "added" | "success"
  nftData: {
    index: string;
    name: string;
    thumb: string;
    chain: "XRP" | "ICP"
  }
}

const TransferItem = ({ onAddToTransfer, onRemoveFromTransfer, type, nftData }: TransferItemProps) => {

  return (
    <Flex align="center" justifyContent="space-between" color="white" fontSize="sm">
      <HStack>
        <Text>{nftData?.index}</Text>
        <Image src={nftData?.thumb} />
        <Text>{nftData?.name}</Text>
      </HStack>
      <HStack>
        <BlockChainTag blockChain={nftData.chain} type={type} />
        {onAddToTransfer && <VStack color="primary" onClick={onAddToTransfer}>
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
