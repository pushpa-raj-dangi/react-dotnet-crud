import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Switch, Textarea, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Product } from "../types/product";
import { BASE_URL } from "../constant";

type AddProductProps = {
        isOpen: boolean;
        onClose: () => void;
        refetch: () => void;
        currentProduct?: Product;
};

const AddProduct = ({isOpen,onClose,currentProduct,refetch}:AddProductProps) => {
  const toast = useToast();

    const [product,setProduct] = useState({
        id: currentProduct?.id || 0,
        name: currentProduct?.name || "",
        description: currentProduct?.description || "",
        price: currentProduct?.price || 0,
        isInStore: currentProduct?.isInStore || false,
    });
    
    const [isLoading,setIsLoading] = useState(false);

    const onSave = ()=>{
      if(!product.name)
      {
        toast({
          title: "Error",
          description: "Please fill all fields",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
        return;
      }

        if(currentProduct){
          edit(currentProduct.id);
        }
        else{
          add();
        }
    }

    const edit = (id:number) => {
        axios.put<Product>(`${BASE_URL}/${id}`,product)
        .then(()=>{
          toast({
            title: "Product Updated",
            description: "Product updated successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          refetch();
          onClose();
        })
        .catch((error)=>{
          console.log(error);
        })
        .finally(()=>{
            setIsLoading(false);
        })
      }

      const add = () => {
        axios.post<Product>(BASE_URL,product)
        .then(()=>{
          toast({
            title: "Product Added",
            description: "Product added successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          
          refetch();
          onClose();
        })
        .catch((error)=>{
          console.log(error);
        })
        .finally(()=>{
            setIsLoading(false);
        })
      }



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropBlur={3} backdropFilter={"blur(2px)"} />
      <ModalContent>
        <ModalHeader>
          {currentProduct ? "Edit Product" : "Add Product"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={product.name}
            required
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Product Name" size="md" mb={3} />
          <Textarea
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          placeholder="Product Description" size="md" mb={3} />

          <Input 
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: parseInt(e.target.value) })}
          placeholder="Product Price" size="md" mb={3} type="number" />

          <h5>Available in store</h5>
          <Switch
            isChecked={product.isInStore}
            onChange={(e) => setProduct({ ...product, isInStore: e.target.checked })}
            colorScheme="blue"
            size="md"
          
            mb={3}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button 
          onClick={onSave}
          colorScheme="blue"
          isLoading={isLoading}
          >
            {currentProduct ? "Update" : "Add"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddProduct