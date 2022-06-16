import { Box, Button, Container, Heading, HStack, SimpleGrid } from "@chakra-ui/react";
import Card from "./Card";
import TransferItem, { ReadyForTransferItem, ReadyToAddTransferItem } from "./TransferItem";

const NFTList: { chain: "XRP" | "ICP", index: string, thumb: string, name: string, type: any }[] = [
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "success" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
]

const TransferNFT = () => {

  return (
    <Container maxW="1200">

      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">NFT Transfer</Heading>
      </Box>

      <SimpleGrid columns={2} spacing="14" mb={6}>

        <Card title="Your Assets">
          {NFTList.map(item => <ReadyToAddTransferItem onAddToTransfer={() => { }} nftData={item} />)}
        </Card>

        <Card title="Transfer List">
          {NFTList.map(item => <ReadyForTransferItem onRemoveFromTransfer={() => { }} nftData={item} />)}
        </Card>

      </SimpleGrid>

      <HStack spacing="14" justifyContent="center">
        <Button borderRadius="full">Discard Changes</Button>
        <Button borderRadius="full" bgColor="primary">Proceed to Transfer</Button>
      </HStack>


    </Container>
  )

}

export default TransferNFT;
