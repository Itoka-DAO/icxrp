import { Container, Flex, HStack, Icon, IconButton, Text, Tooltip, useClipboard, VStack, Link } from '@chakra-ui/react'
import { BiExit } from 'react-icons/bi';
import { useConnect } from '../hooks';
import { ellipsisKey, ellipsisShort } from '../utils';

const Header = () => {

  const { isConnect, disconnect, connectData } = useConnect()

  const { onCopy } = useClipboard(connectData?.principal || "")
  const { onCopy: onCopyPublicKey } = useClipboard(connectData?.xrp?.publicKey || "")
  const { onCopy: onCopyPrivateKey } = useClipboard(connectData?.xrp?.privateKey || "")

  return (
    <Container maxW="1440" py="10">
      <Flex justifyContent="space-between" alignItems="flex-start">

        <HStack fontSize="32px">
          <Text color="second" fontSize="5xl" fontFamily="Himagsikan">ITOKA</Text>
          <Text color="white">IC-XRP</Text>
        </HStack>

        {isConnect && connectData && <HStack align="stretch">
          <VStack color="gray.300" align="stretch">
            <Tooltip label={connectData.principal}>
              <Text title={connectData.principal}>Welcome User: <Link onClick={onCopy}>{ellipsisShort(connectData.principal)}</Link> </Text>
            </Tooltip>
            {connectData.xrp && <Text>XRP Public Key: <Link onClick={onCopyPublicKey}>{ellipsisKey(connectData.xrp.publicKey)}</Link> </Text>}
            {connectData.xrp && <Text>XRP Private Key: <Link onClick={onCopyPrivateKey}>{ellipsisKey(connectData.xrp.privateKey)}</Link> </Text>}
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
