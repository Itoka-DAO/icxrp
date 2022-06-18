import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Card = (props: { children: React.ReactNode, title?: string, loading?: boolean }) => {

  return (
    <Box>
      {props?.title && <Heading color="white" textAlign="center" mb="4">{props?.title}</Heading>}
      <Box height="600px" bgColor="rgba(77, 104, 137, 0.34)" px="10" py="10" w="full" overflow="auto">
        {props.children}
      </Box>
    </Box>
  )

}

export default Card;
