import { Box, Button, Flex, HStack, Heading, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";


export const ProductSeklation = () => {
  return (
    <Box fontFamily={"poppins"} shadow={"md"} rounded={"md"} m={32}>
      <Flex px={5} alignItems={"center"} justifyContent={"space-between"}>
        <Heading textAlign={"center"} py={10} as="h1" fontSize={"30"}>
         <Skeleton w={20} height={"20px"}></Skeleton>
        </Heading>
            <Skeleton w={20} height={"20px"}>
        <Button >
                Add New
        </Button>
            </Skeleton>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th fontWeight={"bold"} fontSize={14}>
                <Skeleton w={20}  height={"20px"}>20</Skeleton>
              </Th>
              <Th fontWeight={"bold"} fontSize={14}>
                <Skeleton w='20'  height={"20px"}>Name</Skeleton>
              </Th>
              <Th fontWeight={"bold"} fontSize={14}>
                <Skeleton height={"20px"}></Skeleton>
              </Th>
              <Th fontWeight={"bold"} fontSize={14} isNumeric>
                <Skeleton height={"20px"}></Skeleton>
              </Th>
              <Th fontWeight={"bold"} fontSize={14}>
                <Skeleton w={'20'} height={"20px"}></Skeleton>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({length:5}).map((_,i) => (
              <Tr key={i}>
                <Td>
                  <Skeleton w={20} height={"20px"}>1</Skeleton>
                </Td>
                <Td display={"flex"} gap={2} alignItems={"center"}>
                  <SkeletonCircle  height={"20px"}></SkeletonCircle>
                  <Skeleton height={"20px"}>Name</Skeleton>
                </Td>
                <Td>
                  <Skeleton height={"20px"}></Skeleton>
                </Td>
                <Td isNumeric>
                  <Skeleton height={"20px"}></Skeleton>
                </Td>
                <Td>
                  <HStack gap={2}>
                    <SkeletonCircle  height={"20px"}></SkeletonCircle>
                    <SkeletonCircle height={"20px"}></SkeletonCircle>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
