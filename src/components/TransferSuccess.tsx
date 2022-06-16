import { Box, Button, Container, Heading } from "@chakra-ui/react";
import Card from "./Card";
import { SuccessTransferItem } from "./TransferItem";

const NFTList: { chain: "XRP" | "ICP", index: string, thumb: string, name: string, type: any }[] = [
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "success" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
]


const TransferSuccess = () => {

  return (
    <Container maxW="1200">

      <Box textAlign="center">
        <Heading color="second" fontSize="6xl">Congradulations!</Heading>
        <Heading color="white" fontSize="6xl">Your Transfer is Completed!</Heading>
      </Box>

      <Box maxW="670" mb="6">
        <Card title="Transfer List">
          {NFTList.map(item => <SuccessTransferItem nftData={item} />)}
        </Card>
      </Box>

      <Button borderRadius="full" bgColor="primary">Return to NFT Transfer</Button>

    </Container>
  )

}

export default TransferSuccess;
