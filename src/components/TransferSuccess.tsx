import { Box, Button, Center, Container, Heading } from "@chakra-ui/react";
import { useTransfer } from "../hooks";
import Card from "./Card";
import { SuccessTransferItem } from "./TransferItem";

const TransferSuccess = () => {

  const { completeToReturn, selectedTransferNFT } = useTransfer()

  return (
    <Container maxW="1200">

      <Box textAlign="center">
        <Heading color="second" fontSize="6xl">Congradulations!</Heading>
        <Heading color="white" fontSize="6xl">Your Transfer is Completed!</Heading>
      </Box>

      <Center>
        <Box maxW="670" my="6" flex="1">
          <Card>
            {selectedTransferNFT.map(item => <SuccessTransferItem key={item.id} nftData={item} />)}
          </Card>
        </Box>
      </Center>

      <Center>
        <Button borderRadius="full" bgColor="primary" onClick={completeToReturn}>Return to NFT Transfer</Button>
      </Center>

    </Container>
  )

}

export default TransferSuccess;
