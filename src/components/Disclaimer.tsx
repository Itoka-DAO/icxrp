import { Modal, ModalOverlay, ModalContent, Box, Checkbox, ModalBody, Heading, Center, Text } from "@chakra-ui/react"

interface DisclaimerProps {
  show: boolean;
  onClose: () => void;
}

const Disclaimer = (props: DisclaimerProps) => {

  return (
    <Modal isOpen={props.show} onClose={() => { }} size="xl">
      <ModalOverlay />
      <ModalContent bg="whiteAlpha.900">
        <ModalBody>
          <Heading mt="8" mb="10" fontSize="64px" textAlign="center" fontWeight={400}>Disclaimer</Heading>
          <Box px="16" mb="16" fontSize="sm">
            <Text mb="4">The Itoka IC-XRP cross-chain project is for R&D purposes only. Since the XRPL NFT-Dev net is still under development and will be
               <strong>reset and merged to the main net </strong> in the future, we <strong> highly recommend storing NFT assets on the Internet Computer network. </strong> 
               Please pay attention to the Ripple Labs announcement. Itoka and OctAI Inc. do not accept any responsibility or liability for any loss of assets caused by XRPL updates.
          </Text>
            <Text mb="4" fontWeight={700}>The Itoka team airdropped the Bazahei NFTs to the community for free. </Text>
            <Text mb="4">Investors must conduct their own research before trading. Itoka and OctAI Inc. do not accept any responsibility or liability for any loss of assets or investments.</Text>
          </Box>
          <Center py="10">
            <Checkbox colorScheme = "black" onChange={() => props.onClose()}>I have read, understood, and agree to the above</Checkbox>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Disclaimer
