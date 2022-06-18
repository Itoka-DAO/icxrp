import { Container, Flex, HStack, Icon, IconButton, Text, Tooltip, VStack } from '@chakra-ui/react'
import { BiExit } from 'react-icons/bi';
import { useConnect } from '../hooks';
import { ellipsisKey, ellipsisShort } from '../utils';

const Header = () => {

  const { isConnect, disconnect, connectData } = useConnect()

  return (
    <Container maxW="1440" py="10">
      <Flex justifyContent="space-between" alignItems="flex-start">

        <HStack fontSize="32px">
          <Text color="second" fontSize="5xl" fontFamily="Himagsikan">ITOKA</Text>
          <Text color="white">IC-XRP Bridge</Text>
        </HStack>

        {isConnect && connectData && <HStack align="stretch">
          <VStack color="gray.300" align="stretch">
            <Tooltip label={connectData.principal}>
              <Text title={connectData.principal}>Welcome User: {ellipsisShort(connectData.principal)}</Text>
            </Tooltip>
            {connectData.xrp && <Tooltip title={connectData.xrp.publicKey}><Text>XRP Public Key: {ellipsisKey(connectData.xrp.publicKey)}</Text></Tooltip>}
            {connectData.xrp && <Tooltip title={connectData.xrp.privateKey}><Text>XRP Private Key: {ellipsisKey(connectData.xrp.privateKey)}</Text></Tooltip>}
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
