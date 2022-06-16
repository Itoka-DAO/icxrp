import { Box, Button, Container, Heading, HStack } from '@chakra-ui/react';
import Card from './Card';
import { ReadyToAddTransferItem } from './TransferItem';

const NFTList: { chain: "XRP" | "ICP", index: string, thumb: string, name: string, type: any }[] = [
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "success" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
]

const VerifyTransfer = () => {
  return (
    <Container maxW="1200">
      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">Please Verify Your Transaction</Heading>
      </Box>

      <Box maxW="670" mb="6">
        <Card title="Transfer List">
          {NFTList.map(item => <ReadyToAddTransferItem onAddToTransfer={() => { }} nftData={item} />)}
        </Card>
      </Box>


      <HStack w="full" justifyContent="center">
        <Button borderRadius="full">Go Back to Edit</Button>
        <Button borderRadius="full" bgColor="primary">Confirm</Button>
      </HStack>
    </Container>
  );
};

export default VerifyTransfer;
