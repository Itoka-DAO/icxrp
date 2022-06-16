import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex, Heading, HStack, IconButton, Text } from "@chakra-ui/react";
import { DfinityIcon, PlugIcon, StoicIcon } from "./Icons";

interface ConnectPanelProps {
  visible: boolean;
  onClose: () => void;
}

const ConnectPanel = ({ visible, onClose }: ConnectPanelProps) => {

  return (
    <Drawer
      size="md"
      placement='right'
      isOpen={visible}
      onClose={onClose} >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody bgColor="second" px="20">
          <Flex flexDir="column" justifyContent="center" h="full">
            <Heading fontSize="2xl" mb="4">Welcome</Heading>
            <Heading fontSize="3xl" mb="14">Connect Wallet to start your transfer</Heading>
            <Button
              w="full"
              size="lg"
              bgColor="black"
              color="primary"
              borderRadius="full"
              colorScheme="blackAlpha"
              fontSize="sm"
              leftIcon={<DfinityIcon fontSize="4xl" />}>Connect with Internet Identity</Button>
            <Box mt="40">
              <Text fontWeight="700" mb="4">or connect with</Text>
              <HStack spacing="2">
                <IconButton aria-label="connect to plug" icon={<PlugIcon />} fontSize="2xl" colorScheme="transparent" />
                <IconButton aria-label="connect to stoic" icon={<StoicIcon />} fontSize="2xl" colorScheme="transparent" />
              </HStack>
            </Box>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )

}

export default ConnectPanel;
