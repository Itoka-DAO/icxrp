import { Box } from "@chakra-ui/react";
import React from "react";

const Card = (props: { children: React.ReactNode }) => {

  return (
    <Box bgColor="rgba(77, 104, 137, 0.34)" px="10" py="14">
      {props.children}
    </Box>
  )

}

export default Card;
