import { Box, Button, Container, Heading } from "@chakra-ui/react";
import { useTransfer } from "../context";
import Card from "./Card";
import { SuccessTransferItem } from "./TransferItem";

const TransferSuccess = () => {

  const { backToTransfer, selectedTransferNFT } = useTransfer()

  return (
    <Container maxW="1200">

      <Box textAlign="center">
        <Heading color="second" fontSize="6xl">Congradulations!</Heading>
        <Heading color="white" fontSize="6xl">Your Transfer is Completed!</Heading>
      </Box>

      <Box maxW="670" mb="6">
        <Card title="Transfer List">
          {selectedTransferNFT.map(item => <SuccessTransferItem nftData={item} />)}
        </Card>
      </Box>

      <Button borderRadius="full" bgColor="primary" onClick={backToTransfer}>Return to NFT Transfer</Button>

    </Container>
  )

}

export default TransferSuccess;
