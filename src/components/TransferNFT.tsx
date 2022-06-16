import { Box, Button, Container, Heading, HStack } from "@chakra-ui/react";
import Card from "./Card";

const TransferNFT = () => {

  return (
    <Container>

      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">NFT Transfer</Heading>
      </Box>

      <HStack spacing="10">

        <Box>
          <Heading color="white">Your Assets</Heading>

          <Card>
            Card
          </Card>

        </Box>

        <Box>
          <Heading color="white">Transfer List</Heading>
        </Box>

      </HStack>

      <HStack spacing="10">
        <Button borderRadius="full">Discard Changes</Button>
        <Button borderRadius="full" bgColor="primary">Proceed to Transfer</Button>
      </HStack>


    </Container>
  )

}

export default TransferNFT;
