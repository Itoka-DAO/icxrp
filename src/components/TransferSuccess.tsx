import { Box, Button, Container, Heading } from "@chakra-ui/react";

const TransferSuccess = () => {

  return (
    <Container>

      <Box textAlign="center">
        <Heading color="second" fontSize="6xl">Congradulations!</Heading>
        <Heading color="white" fontSize="6xl">Your Transfer is Completed!</Heading>
      </Box>

      <Button borderRadius="full" bgColor="primary">Return to NFT Transfer</Button>

    </Container>
  )

}

export default TransferSuccess;
