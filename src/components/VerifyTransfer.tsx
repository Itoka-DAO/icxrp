import { Box, Button, Container, Heading, HStack } from '@chakra-ui/react';

const VerifyTransfer = () => {
  return (
    <Container>
      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">Please Verify Your Transaction</Heading>
        <Heading color="white" fontSize="3xl">Transfer List</Heading>
      </Box>

      <HStack>
        <Button borderRadius="full">Go Back to Edit</Button>
        <Button borderRadius="full" bgColor="primary">Confirm</Button>
      </HStack>
    </Container>
  );
};

export default VerifyTransfer;
