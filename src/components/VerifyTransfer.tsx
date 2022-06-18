import { Box, Button, Center, Container, Heading, HStack, Spinner } from '@chakra-ui/react';
import { useTransfer } from '../hooks';
import Card from './Card';
import { ReadyForTransferItem } from './TransferItem';

const VerifyTransfer = () => {

  const { submitTransfer, backToTransfer, selectedTransferNFT, unSelectNFT, submitLoading } = useTransfer()


  return (
    <Container maxW="1200">
      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">Please Verify Your Transaction</Heading>
      </Box>

      <Center>
        {!submitLoading && <Box maxW="670" mb="6" mt="12" flex="1">
          <Card title="Transfer List">
            {selectedTransferNFT.map(item => <ReadyForTransferItem key={item.id} onRemoveFromTransfer={() => unSelectNFT(item)} nftData={item} />)}
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
      </Center>


      {!submitLoading && <HStack w="full" justifyContent="center" spacing="14">
        <Button width="186px" borderRadius="full" onClick={backToTransfer}>Go Back to Edit</Button>
        <Button width="186px" borderRadius="full" bgColor="primary" onClick={submitTransfer} disabled={selectedTransferNFT.length === 0}>Confirm</Button>
      </HStack>}
    </Container>
  );
};

export default VerifyTransfer;
