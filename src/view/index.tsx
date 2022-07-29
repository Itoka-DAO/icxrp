import { Box, Button, Container, Heading, SimpleGrid } from "@chakra-ui/react"
import { useState } from "react"


import ConnectPanel from "../components/AuthPanel"
import Card from "../components/Card"
import Footer from "../components/Footer"
import Header from "../components/Header"
import TransferItem from "../components/TransferItem"
import TransferNFT from "../components/TransferNFT"
import TransferSuccess from "../components/TransferSuccess"
import VerifyTransfer from "../components/VerifyTransfer"
import { Step } from "../context"
import { useConnect, useToken, useTransfer } from '../hooks'

import BGImg from '../images/holographic.png'

const bodyBG = "linear-gradient(135.6deg, rgba(21, 127, 255, 0.2) -8.76%, rgba(11, 1, 26, 0.2) 43.54%, rgba(11, 1, 26, 0.2) 61.3%, rgba(246, 0, 255, 0.2) 110%), #0B011A;"

const Main = () => {

  const [connectPanelVisible, setConnectPanelVisible] = useState(false)

  const { isConnect, openConnectPanel, isLogining } = useConnect()

  const { step } = useTransfer()

  const { allToken } = useToken()

  const [disclaimerShow, setDisclaimerShow] = useState(true)

  return (
    <Box bg={bodyBG} minHeight="100vh">
      {/* header */}
      <Header />

      {/* body */}
      {!isConnect && <Box h="100vh" textAlign="center" bgImage={BGImg} bgRepeat="no-repeat" bgPos="center">
        <Heading color="white" fontSize="6xl" lineHeight="tall">Itoka Cross-Chain Nexus<small>(beta)</small></Heading>
        <Heading color="white" fontSize="3xl" as="h3" lineHeight="tall">An Infrastructure for Multi-chain Entertainment</Heading>
        {/* <Button bgColor="primary" size="lg" borderRadius="full" w="60" mt="24" onClick={() => setConnectPanelVisible(true)}>Start Transfer</Button> */}
        <Button bgColor="primary" size="lg" borderRadius="full" w="60" mt="24" isLoading={isLogining} onClick={openConnectPanel}>Start Transfer</Button>

        {/* <Box color="white">
          <Text>See All NFT Listing</Text>
          <Icon fontWeight={700} fontSize="2xl" as={BsChevronDoubleDown} />
        </Box> */}

      </Box>}

      {!isConnect && <Box mb="140">
        <Container maxW="1200">
          <Card title="All Bazahei NFT Listing">
            <SimpleGrid columns={2} spacingX="14">
              {allToken.map(item => <TransferItem xrpLink={item.chain === "XRP" ? `https://nft-devnet.xrpl.org/transactions/${item.tokenId}` : undefined} key={item.tokenId} nftData={item} />)}
            </SimpleGrid>
          </Card>
        </Container>

      </Box>}

      {isConnect && <Box pb="14">
        {step === Step.Transfer && <TransferNFT disclaimerShow={disclaimerShow} onClose={() => setDisclaimerShow(false)} />}
        {step === Step.Verify && <VerifyTransfer />}
        {step === Step.Completed && < TransferSuccess />}
      </Box>}


      {/* footer */}
      {!isConnect && <Footer />}

      <ConnectPanel visible={connectPanelVisible} onClose={() => setConnectPanelVisible(false)} />

    </Box>
  )

}

export default Main
