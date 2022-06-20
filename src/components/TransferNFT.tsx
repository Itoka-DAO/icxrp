import { Box, Button, Container, Heading, HStack } from "@chakra-ui/react";
import { useTransfer, useToken } from "../hooks";
import Card from "./Card";
import Disclaimer from "./Disclaimer";
import { ReadyForTransferItem, ReadyToAddTransferItem } from "./TransferItem";

const TransferNFT = ({ disclaimerShow, onClose }: { disclaimerShow: boolean; onClose: () => void }) => {

  const { verifyTransfer, selectedTransferNFT, selectNFT, unSelectNFT, canSelectNFTs, discardChange } = useTransfer()
  const { loading } = useToken()

  return (
    <Container maxW="1200">

      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">NFT Transfer</Heading>
      </Box>

      <HStack spacing="14" justifyContent="space-between" mb="6" mt="12">
        <Box flex="1">
          <Card title="Your Assets" loading={loading}>
            {canSelectNFTs.map(item => <ReadyToAddTransferItem disabled={selectedTransferNFT.length === 1} key={item.tokenId} onAddToTransfer={() => selectNFT(item)} nftData={item} />)}
          </Card>
        </Box>

        <Box flex="1">
          <Card title="Transfer List">
            {selectedTransferNFT.map(item => <ReadyForTransferItem key={item.tokenId} onRemoveFromTransfer={() => unSelectNFT(item)} nftData={item} />)}
          </Card>
        </Box>

      </HStack>

      <HStack spacing="14" justifyContent="center">
        <Button width="186px" borderRadius="full" onClick={discardChange}>Discard Changes</Button>
        <Button width="186px" borderRadius="full" bgColor="primary" onClick={verifyTransfer} disabled={selectedTransferNFT.length === 0}>Proceed to Transfer</Button>
      </HStack>

      <Disclaimer show={disclaimerShow} onClose={onClose} />


    </Container>
  )

}

export default TransferNFT;
