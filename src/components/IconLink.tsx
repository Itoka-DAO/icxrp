import { HStack, Link, LinkProps, Icon, Box } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface IconLinkProps extends LinkProps {
  icon: IconType
}

const IconLink = ({ icon, children, ...props }: IconLinkProps) => {

  return (
    <Link {...props}>
      <HStack spacing="4">
        <Icon as={icon} />
        <Box>{children}</Box>
      </HStack>
    </Link>
  )

}

export default IconLink;
