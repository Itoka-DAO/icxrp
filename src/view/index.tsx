import { Box, Button, Container, Heading, Text, SimpleGrid, Icon } from "@chakra-ui/react"
import { useContext, useState } from "react"

import { BsChevronDoubleDown } from 'react-icons/bs'

import ConnectPanel from "../components/AuthPanel"
import Card from "../components/Card"
import Footer from "../components/Footer"
import Header from "../components/Header"
import TransferItem from "../components/TransferItem"
import TransferNFT from "../components/TransferNFT"
import TransferSuccess from "../components/TransferSuccess"
import VerifyTransfer from "../components/VerifyTransfer"
import { MainContext, useConnect } from "../context"

import BGImg from '../images/holographic.png'

const NFTList: { chain: "XRP" | "ICP", index: string, thumb: string, name: string, type: any }[] = [
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "success" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
]

const bodyBG = "linear-gradient(135.6deg, rgba(21, 127, 255, 0.2) -8.76%, rgba(11, 1, 26, 0.2) 43.54%, rgba(11, 1, 26, 0.2) 61.3%, rgba(246, 0, 255, 0.2) 110%), #0B011A;"

const Main = () => {

  const [connectPanelVisible, setConnectPanelVisible] = useState(false)

  const { isConnect, connect, openConnectPanel } = useConnect()

  return (
    <Box bg={bodyBG}>
      {/* header */}
      <Header />

      {/* body */}
      {!isConnect && <Box h="100vh" textAlign="center" bgImage={BGImg} bgRepeat="no-repeat" bgPos="center">
        <Heading color="white" fontSize="6xl" lineHeight="tall">Internet Computer - Ripple Bridge</Heading>
        <Heading color="white" fontSize="3xl" as="h3" lineHeight="tall">An Infrastrucutre for Multi-chain Entertainment</Heading>
        {/* <Button bgColor="primary" size="lg" borderRadius="full" w="60" mt="24" onClick={() => setConnectPanelVisible(true)}>Start Transfer</Button> */}
        <Button bgColor="primary" size="lg" borderRadius="full" w="60" mt="24" onClick={openConnectPanel}>Start Transfer</Button>

        {/* <Box color="white">
          <Text>See All NFT Listing</Text>
          <Icon fontWeight={700} fontSize="2xl" as={BsChevronDoubleDown} />
        </Box> */}

      </Box>}

      {!isConnect && <Box mb="140">
        <Container maxW="1200">
          <Card title="All NFT Listing">
            <SimpleGrid columns={2} spacingX="14">
              {NFTList.map(item => <TransferItem nftData={item} />)}
            </SimpleGrid>
          </Card>
        </Container>

      </Box>}

      {isConnect && <>
        <TransferNFT />
        <VerifyTransfer />
        <TransferSuccess />
      </>}


      {/* footer */}
      <Footer />

      <ConnectPanel visible={connectPanelVisible} onClose={() => setConnectPanelVisible(false)} />

    </Box>
  )

}

export default Main
