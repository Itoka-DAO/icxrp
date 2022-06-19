import { Box, Flex, HStack, Heading, Divider, VStack, Link, Container, Image } from "@chakra-ui/react"
import { FaTwitter, FaDiscord, FaSoundcloud, FaMedium, FaGithub } from "react-icons/fa"
import IconLink from "./IconLink"
import dfinityLogo from '../images/dfinitylogo.png'
import xrpLogo from '../images/xrplogo.png'

const Footer = () => {
  return (
    <Box pb="8" pt="6" bgColor="blackAlpha.200">
      <Container maxW="1280px">
        <Flex justifyContent="space-between">
          <HStack spacing="14" align="stretch">
            <Box w="300px">
              <Heading color="whiteAlpha.600" as="h4" fontSize="xl">NAVIGATE</Heading>
              <Divider my="2" borderColor="primary" />
              <VStack spacing="-0.5" align="stretch" fontSize="xl" fontWeight={700} color="white">
                <Link href="https://itoka.xyz">Itoka Home</Link>
                <Link href="https://ku323-qyaaa-aaaai-ackgq-cai.ic0.app/airdrop">Muxiv</Link>
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
                <IconLink href="https://github.com/Itoka-DAO" icon={FaGithub}>Github</IconLink>
              </VStack>
            </Box>
          </HStack>
          <VStack w="186px">
            <Link><Image src={dfinityLogo} /></Link>
            <Link><Image src={xrpLogo} /></Link>
          </VStack>
        </Flex>

        <Box mt="4" fontSize="xs" color="white">© 2022. All rights reserved</Box>
      </Container>
    </Box>
  )
}

export default Footer;
