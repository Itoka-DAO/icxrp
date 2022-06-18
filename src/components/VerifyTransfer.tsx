import { Box, Button, Container, Heading, HStack } from '@chakra-ui/react';
import { useTransfer } from '../context';
import Card from './Card';
import { ReadyForTransferItem } from './TransferItem';

const VerifyTransfer = () => {

  const { submitTransfer, backToTransfer, selectedTransferNFT, unSelectNFT } = useTransfer()

  return (
    <Container maxW="1200">
      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">Please Verify Your Transaction</Heading>
      </Box>

      <Box maxW="670" mb="6">
        <Card title="Transfer List">
          {selectedTransferNFT.map(item => <ReadyForTransferItem onRemoveFromTransfer={() => unSelectNFT(item)} nftData={item} />)}
        </Card>
      </Box>


      <HStack w="full" justifyContent="center">
        <Button borderRadius="full" onClick={backToTransfer}>Go Back to Edit</Button>
        <Button borderRadius="full" bgColor="primary" onClick={submitTransfer}>Confirm</Button>
      </HStack>
    </Container>
  );
};

export default VerifyTransfer;
