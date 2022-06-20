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
            <Text mb="4">Because XRPL NFT-Dev net is under development, the Itoka IC-XRP cross-chain project is for R&D purpose, and the Itoka team airdropped the Bazahei NFTs to the community for free. The <strong>XRPL NFT-Dev net will be reset and merged</strong> to the main net in the future. Please pay attention to the Ripple Labs announcement.</Text>
            <Text mb="4" fontWeight={700}>XRPL NFT-Dev is for experiencing only. We extremely recommend stake NFT assets on the Internet Computer network.</Text>
            <Text mb="4">The investors must conduct their own research before trading. Itoka and OctAI Inc. do not accept any responsibility or liability for any loss of assets investment.</Text>
          </Box>
          <Center py="10">
            <Checkbox onChange={() => props.onClose()}>I have read, understand, and agree to the above</Checkbox>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Disclaimer
