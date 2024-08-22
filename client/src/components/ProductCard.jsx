import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, Badge, Tooltip, useToast, Modal, useDisclosure, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, VStack, ModalContent, Input, ModalFooter, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
    const textcolor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const priceColor = useColorModeValue("teal.500", "teal.300");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const [updatedProduct, setupdatedProduct] = useState(product)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { deleteProducts, updateProducts } = useProductStore()
    const toast = useToast()
    const handledeleteProducts = async (pid) => {
        const { success, message } = await deleteProducts(pid);
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Product Deleted',
                description: 'The product has been deleted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProducts(pid, updatedProduct)
        onClose()
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Success',
                description: 'Updated Successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        }

    }

    return (
        <Box
            borderWidth="1px"
            borderColor={borderColor}
            shadow={'md'}
            rounded={'2xl'}
            overflow={'hidden'}
            transition={'all 0.3s ease-in-out'}
            _hover={{
                transform: "translateY(-5px)",
                shadow: "2xl",
                borderColor: useColorModeValue("teal.500", "teal.300"),
            }}
            bg={bg}
            maxW={{ base: '100%', md: 'sm' }}
            mx="auto"
        >
            <Box position="relative" overflow="hidden" roundedTop="2xl">
                <Image
                    src={product.image}
                    alt={product.name}
                    h={56}
                    w='full'
                    objectFit={'cover'}
                    transition="transform 0.3s ease"
                    _hover={{ transform: "scale(1.05)" }}
                    roundedTop="2xl"
                />
                <Badge
                    position="absolute"
                    top={2}
                    right={2}
                    bg={useColorModeValue("teal.500", "teal.300")}
                    color="white"
                    fontSize="0.8em"
                    px={3}
                    py={1}
                    rounded="full"
                    textTransform="uppercase"
                >
                    Featured
                </Badge>
            </Box>
            <Box p={6}>
                <Heading
                    as='h3'
                    size='lg'
                    fontWeight="bold"
                    mb={2}
                    isTruncated
                    bgGradient="linear(to-r, teal.400, teal.600)"
                    bgClip="text"
                >
                    {product.name}
                </Heading>

                <Text
                    fontWeight={'semibold'}
                    fontSize={'2xl'}
                    color={priceColor}
                    mb={4}
                >
                    ${product.price}
                </Text>

                <Text
                    color={textcolor}
                    fontSize={'md'}
                    mb={6}
                    lineHeight="1.6"
                    noOfLines={2}
                >
                    {product.description}
                </Text>

                <HStack spacing={4} justifyContent="center">
                    <Tooltip label="Edit product" aria-label="Edit Product">
                        <IconButton
                            icon={<EditIcon />}
                            onClick={onOpen}
                            colorScheme='teal'
                            aria-label='Edit Product'
                            variant="solid"
                            rounded="full"
                            size="lg"
                            _hover={{ bg: useColorModeValue("teal.400", "teal.600") }}
                        />
                    </Tooltip>
                    <Tooltip label="Delete product" aria-label="Delete Product">
                        <IconButton
                            icon={<DeleteIcon />}
                            colorScheme='red'
                            aria-label='Delete Product'
                            variant="solid"
                            rounded="full"
                            size="lg"
                            _hover={{ bg: useColorModeValue("red.400", "red.600") }}
                            onClick={() => handledeleteProducts(product._id)}
                        />
                    </Tooltip>
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setupdatedProduct({ ...updatedProduct, name: e.target.value })}

                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setupdatedProduct({ ...updatedProduct, price: e.target.value })}


                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setupdatedProduct({ ...updatedProduct, image: e.target.value })}


                            />
                        </VStack>



                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update

                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel

                        </Button>

                    </ModalFooter>

                </ModalContent>


            </Modal>
        </Box>
    );
}

export default ProductCard;
