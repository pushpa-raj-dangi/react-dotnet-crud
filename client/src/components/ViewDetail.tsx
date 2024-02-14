import { Avatar, Badge, Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, HStack, Heading } from "@chakra-ui/react";
import { Product } from "../types/product";
type DetailProps = {
    isOpen:boolean;
    currentProduct:Product | undefined;
    onClose:() => void;
    
}

const ViewDetail = ({isOpen,onClose,currentProduct}:DetailProps) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
      <DrawerOverlay
      backdropBlur={50}
      backdropFilter={"blur(2px)"}
      />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader shadow={'sm'}>View Detail {currentProduct?.name}</DrawerHeader>
        <DrawerBody>
          <HStack alignItems={"center"}>
            <Avatar size="xl" name={currentProduct?.name} />
            <Box p={3}>
              <Heading as={"h2"} fontSize={20}>
                {currentProduct?.name}
              </Heading>
              <Heading as={"h2"} py={2} fontSize={"14"} fontWeight={"normal"}>
                {currentProduct?.description}
              </Heading>
              
              <Heading as={"h2"} fontSize={"32"} fontWeight={"normal"}>
                ${currentProduct?.price}
              </Heading>
              <Heading as={"h2"} fontSize={"20"} fontWeight={"normal"}>
                Available in store : <Badge
                size={"lg"}
                colorScheme={currentProduct?.isInStore ? "green" : "red"}>{currentProduct?.isInStore ? "Yes" : "No"}</Badge>
              </Heading>

            </Box>
          </HStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default ViewDetail