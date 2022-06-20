import { Box, Button, Center, Container, Heading, HStack, Text, Spinner } from '@chakra-ui/react';
import { useTransfer } from '../hooks';
import Card from './Card';
import { ReadyForTransferItem } from './TransferItem';
import { Step, Steps } from "chakra-ui-steps"
import { transfer2ICSteps, transfer2XRPSteps } from '../hooks/useTransfer';

const VerifyTransfer = () => {

  const { submitTransfer, backToTransfer, selectedTransferNFT, unSelectNFT, submitLoading, transferStep } = useTransfer()

  return (
    <Container maxW="1200">
      <Box textAlign="center">
        {!submitLoading && <Heading color="white" fontSize="6xl">Please Verify Your Transaction</Heading>}
        {submitLoading && <Heading mb="4" color="white" fontSize="6xl">Processing Transaction</Heading>}
        {submitLoading && <Text color="red" fontSize="2xl">Warning: do not fresh the page.</Text>}
      </Box>

      <Center>
        {!submitLoading && <Box maxW="670" mb="6" mt="12" flex="1">
          <Card title="Transfer List">
            {selectedTransferNFT.map(item => <ReadyForTransferItem key={item.tokenId} onRemoveFromTransfer={() => unSelectNFT(item)} nftData={item} />)}
          </Card>
        </Box>}

        {submitLoading && <Box py="40" w="600px">
          <Steps colorScheme="whiteAlpha" activeStep={transferStep}>
            {(selectedTransferNFT[0]?.chain === "XRP" ? transfer2ICSteps : transfer2XRPSteps).map(({ label }, index) => {
              let icon: any = transferStep === index ? Spinner : undefined
              return <Step icon={icon} label={<Box color="white">{label}</Box>} key={label} />
            })}
          </Steps>
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
