import { Box, Button, Container, Heading, HStack, Spinner } from '@chakra-ui/react';
import { useTransfer } from '../context';
import Card from './Card';
import { ReadyForTransferItem } from './TransferItem';

const VerifyTransfer = () => {

  const { submitTransfer, backToTransfer, selectedTransferNFT, unSelectNFT, submitLoading } = useTransfer()


  return (
    <Container maxW="1200">
      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">Please Verify Your Transaction</Heading>
      </Box>

      {!submitLoading && <Box maxW="670" mb="6">
        <Card title="Transfer List">
          {selectedTransferNFT.map(item => <ReadyForTransferItem onRemoveFromTransfer={() => unSelectNFT(item)} nftData={item} />)}
        </Card>
      </Box>}

      {submitLoading && <Box>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Box>}


      {!submitLoading && <HStack w="full" justifyContent="center">
        <Button borderRadius="full" onClick={backToTransfer}>Go Back to Edit</Button>
        <Button borderRadius="full" bgColor="primary" onClick={submitTransfer}>Confirm</Button>
      </HStack>}
    </Container>
  );
};

export default VerifyTransfer;
