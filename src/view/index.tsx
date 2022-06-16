import { Box, Button, Center, Divider, Flex, Heading, HStack, Icon, Link, Text, VStack } from "@chakra-ui/react"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { ReadyForTransferItem, ReadyToAddTransferItem, SuccessTransferItem } from "../components/TransferItem"

const NFTList: { chain: "XRP" | "ICP", index: string, thumb: string, name: string, type: any }[] = [
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "normal" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "ICP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "success" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "ready" },
  { chain: "XRP", index: "001", name: "Bazahei #0asd8", thumb: "", type: "transfer" },
]

const Main = () => {

  return (
    <Box bg="blackAlpha.700">
      {/* header */}
      <Header />


      {/* body */}
      <Box textAlign="center">
        <Heading color="white" fontSize="6xl" lineHeight="tall">Internet Computer - Ripple Bridge</Heading>
        <Heading color="white" fontSize="3xl" as="h3" lineHeight="tall">An Infrastrucutre for Multi-chain Entertainment</Heading>
        <Button borderRadius="full" w="60" mt="24">Start Transfer</Button>
      </Box>

      <Box textAlign="center">
        <Heading color="second" fontSize="6xl">Congradulations!</Heading>
        <Heading color="white" fontSize="6xl">Your Transfer is Completed!</Heading>
      </Box>

      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">Please Verify Your Transaction</Heading>
      </Box>

      <Box textAlign="center">
        <Heading color="white" fontSize="6xl">NFT Transfer</Heading>
      </Box>

      <Box>
        <Heading textAlign="center" color="white">All NFT Listing</Heading>
        <Box p="14" bg="whiteAlpha.300">
          {NFTList.map(item => {

            switch (item.type) {
              case "normal":

                break;
              case "ready":
                return <ReadyForTransferItem onRemoveFromTransfer={() => { }} nftData={item} />
              case "transfer":
                return <ReadyToAddTransferItem onAddToTransfer={() => { }} nftData={item} />
              case "success":
                return <SuccessTransferItem nftData={item} />
              default:
                break;
            }

          })}
        </Box>

      </Box>


      {/* footer */}
      <Footer />

    </Box>
  )

}

export default Main
