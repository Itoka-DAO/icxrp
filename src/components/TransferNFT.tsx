import { Box, Button, Container, Heading, HStack } from "@chakra-ui/react";
import { useTransfer } from "../context";
import Card from "./Card";
import { ReadyForTransferItem, ReadyToAddTransferItem } from "./TransferItem";

const TransferNFT = () => {

  const { verifyTransfer, selectedTransferNFT, selectNFT, unSelectNFT, canSelectNFTs } = useTransfer()

  return (
    <Container maxW="1200">

      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">NFT Transfer</Heading>
      </Box>

      <HStack spacing="14" justifyContent="space-between" mb="6">
        <Box flex="1">
          <Card title="Your Assets">
            {canSelectNFTs.map(item => <ReadyToAddTransferItem onAddToTransfer={() => selectNFT(item)} nftData={item} />)}
          </Card>
        </Box>

        <Box flex="1">
          <Card title="Transfer List">
            {selectedTransferNFT.map(item => <ReadyForTransferItem onRemoveFromTransfer={() => unSelectNFT(item)} nftData={item} />)}
          </Card>
        </Box>

      </HStack>

      <HStack spacing="14">
        <Button borderRadius="full">Discard Changes</Button>
        <Button borderRadius="full" bgColor="primary" onClick={verifyTransfer}>Proceed to Transfer</Button>
      </HStack>


    </Container>
  )

}

export default TransferNFT;
