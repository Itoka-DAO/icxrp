import { Container, Flex, HStack, Icon, IconButton, Text, VStack } from '@chakra-ui/react'
import { BiExit } from 'react-icons/bi';
import { useConnect } from '../context';


const Header = () => {

  const { isConnect, disconnect } = useConnect()

  return (
    <Container maxW="1440" py="10">
      <Flex justifyContent="space-between" alignItems="flex-start">

        <HStack fontSize="32px">
          <Text color="second" fontSize="5xl" fontFamily="Himagsikan">ITOKA</Text>
          <Text color="white">IC-XRP Bridge</Text>
        </HStack>

        {isConnect && <HStack align="stretch">
          <VStack color="gray.300" align="stretch">
            <Text>Welcome User: ioa93-...-asdas</Text>
            <Text>XRP Public Key: ase34-...-91oas</Text>
            <Text>XRP Private Key: shdj**klei</Text>
          </VStack>
          <IconButton
            onClick={disconnect}
            fontSize="2xl" color="primary"
            colorScheme="transpartent" aria-label='exit'
            icon={<Icon as={BiExit} />} />
        </HStack>}
      </Flex>
    </Container>
  )

}

export default Header;
