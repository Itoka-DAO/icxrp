import { Box, Flex, HStack, Heading, Divider, VStack, Link, Container } from "@chakra-ui/react"
import { FaTwitter, FaDiscord, FaSoundcloud, FaMedium, FaGithub } from "react-icons/fa"
import IconLink from "./IconLink"


const Footer = () => {
  return (
    <Box pb="8" pt="6">
      <Container maxW="1280px">
        <Flex>
          <HStack spacing="14" align="stretch">
            <Box w="300px">
              <Heading color="blackAlpha.400" as="h4" fontSize="xl">NAVIGATE</Heading>
              <Divider my="1" />
              <VStack spacing="-0.5" align="stretch" fontSize="xl" fontWeight={700} color="white">
                <Link>Itoka Home</Link>
                <Link>Muxiv</Link>
              </VStack>
            </Box>

            <Box w="300px">
              <Heading color="blackAlpha.400" as="h4" fontSize="xl">FOLLOW US</Heading>
              <Divider my="1" />
              <VStack spacing="-0.5" align="stretch" fontSize="xl" fontWeight={700} color="white">
                <IconLink href="#" icon={FaTwitter}>Twitter</IconLink>
                <IconLink href="#" icon={FaDiscord}>Discord</IconLink>
                <IconLink href="#" icon={FaSoundcloud}>SoundCloud</IconLink>
                <IconLink href="#" icon={FaMedium}>Medium</IconLink>
                <IconLink href="#" icon={FaGithub}>Github</IconLink>
              </VStack>
            </Box>
          </HStack>
        </Flex>

        <Box mt="4" fontSize="xs" color="white">© 2022. All rights reserved</Box>
      </Container>
    </Box>
  )
}

export default Footer;
