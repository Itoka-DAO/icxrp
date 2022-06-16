import { Box, Flex, HStack, Heading, Divider, VStack, Link, Container } from "@chakra-ui/react"
import { FaTwitter, FaDiscord, FaSoundcloud, FaMedium, FaGithub } from "react-icons/fa"
import IconLink from "./IconLink"

const Footer = () => {
  return (
    <Box pb="8" pt="6" bgColor="blackAlpha.200">
      <Container maxW="1280px">
        <Flex>
          <HStack spacing="14" align="stretch">
            <Box w="300px">
              <Heading color="whiteAlpha.600" as="h4" fontSize="xl">NAVIGATE</Heading>
              <Divider my="2" borderColor="primary" />
              <VStack spacing="-0.5" align="stretch" fontSize="xl" fontWeight={700} color="white">
                <Link>Itoka Home</Link>
                <Link>Muxiv</Link>
              </VStack>
            </Box>

            <Box w="300px">
              <Heading color="whiteAlpha.600" as="h4" fontSize="xl">FOLLOW US</Heading>
              <Divider my="2" borderColor="primary" />
              <VStack spacing="-0.5" align="stretch" fontSize="xl" fontWeight={700} color="white">
                <IconLink href="https://twitter.com/Itoka_NFT" icon={FaTwitter}>Twitter</IconLink>
                <IconLink href="https://discord.gg/2kR54ypC7a" icon={FaDiscord}>Discord</IconLink>
                <IconLink href="https://soundcloud.com/octai-music" icon={FaSoundcloud}>SoundCloud</IconLink>
                <IconLink href="https://medium.com/@Itoka_NFT" icon={FaMedium}>Medium</IconLink>
                <IconLink href="https://github.com/ItokaDAO" icon={FaGithub}>Github</IconLink>
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
