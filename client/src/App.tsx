import { AddIcon, DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Avatar, Badge, Box, Button, Flex, Heading, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import AddProduct from './components/AddProduct';
import { ProductSeklation } from './components/ProductSeklation';
import ViewDetail from './components/ViewDetail';
import { BASE_URL } from './constant';
import { Product } from './types/product';

function App() {

  const [data,setData]=  useState<Product[]>([]);
  const {isOpen,onOpen,onClose} = useDisclosure();
  const {isOpen:isViewOpen,onOpen:onViewOpen,onClose:onViewClose} = useDisclosure();
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [currentProduct,setCurrentProduct] = useState<Product>();


  useEffect(()=>{
    fetchProducts();
  },[])

  const handleEdit = (id:number) => {
    axios.get<Product>(`${BASE_URL}/${id}`)
    .then((response)=>{
      setCurrentProduct(response.data);
      onOpen();
    })
    .catch((error)=>{
      console.log(error);
    })


  }

  const refetch=()=>{
    fetchProducts();
  }

  const fetchProducts = () => {
    setIsLoading(true);
     axios
       .get<Product[]>(BASE_URL)
       .then((response) => {
         setData(response.data);
       })
       .catch((error) => {
         console.log(error);
       })
       .finally(() => {
         setIsLoading(false);
       });
  }


  const handleOpenForm = () => {
    setCurrentProduct(undefined);
    onOpen();
  }

  const handleDelete = (id:number) => {
    axios.delete(`${BASE_URL}/${id}`)
    .then(()=>{
      fetchProducts();
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const handleView = (id:number)=>{
   axios.get<Product>(`${BASE_URL}/${id}`)
   .then((response)=>{
      setCurrentProduct(response.data);
      onViewOpen();
   })
    .catch((error)=>{
      console.log(error);
    })

  }


  if(isLoading){
    return <ProductSeklation/>
  }


  return (
    <Box fontFamily={"poppins"} shadow={"md"} rounded={"md"} m={32}>
      <Flex px={5} alignItems={"center"} justifyContent={"space-between"}>
        <Heading textAlign={"center"} py={10} as="h1" fontSize={"30"}>
          Product List
        </Heading>
        <Button
          leftIcon={<AddIcon />}
          onClick={handleOpenForm}
          colorScheme={"blue"}
        >
          Add Product
        </Button>
      </Flex>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th fontWeight={"bold"} fontSize={14}>
                Id
              </Th>
              <Th fontWeight={"bold"} fontSize={14}>
                Name
              </Th>
              <Th fontWeight={"bold"} fontSize={14}>
                Description
              </Th>
              <Th fontWeight={"bold"} fontSize={14} isNumeric>
                Price
              </Th>
              <Th fontWeight={"bold"} fontSize={14}>
                Is In store?
              </Th>
              <Th fontWeight={"bold"} fontSize={14}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((product: Product) => (
              <Tr key={product.id}>
                <Td>{product.id}</Td>
                <Td display={"flex"} gap={2} alignItems={"center"}>
                  <Avatar size={"sm"} name={product.name} />
                  {product.name}
                </Td>
                <Td>{product.description}</Td>
                <Td isNumeric>${product.price}</Td>
                <Td>
                  <Badge
                    size={"lg"}
                    colorScheme={product.isInStore ? "green" : "red"}
                  >
                    {product.isInStore ? "Yes" : "No"}
                  </Badge>
                </Td>
                <Td cursor={'pointer'}>
                  <HStack gap={2}>
                    <EditIcon
                      onClick={() => handleEdit(product.id)}
                      boxSize={22}
                      color="blue"
                    />
                    <Popover>
                      <PopoverTrigger>
                        <DeleteIcon boxSize={22} color="red" />
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Confirmation!</PopoverHeader>
                        <PopoverBody>
                          Are you sure you want to delete?
                        </PopoverBody>
                        <PopoverFooter>
                          <Button
                          onClick={()=>{
                            handleDelete(product.id);
                          }
                          }
                          float={"right"} colorScheme="red" size={"sm"}>
                            Yes
                          </Button>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                    <ViewIcon
                    onClick={()=>{handleView(product.id)}}
                    boxSize={22} color="green" />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {data.length === 0 && (
        <Heading textAlign={"center"} py={10} as="h5" fontSize={"15"}>
          No data
        </Heading>
      )}

      {isOpen && (
        <AddProduct
          currentProduct={currentProduct}
          refetch={refetch}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      {
        isViewOpen && (
          <ViewDetail
          currentProduct={currentProduct}
          isOpen={isViewOpen}
          onClose={onViewClose}
          />
        )
      }
    </Box>
  );
}

export default App
