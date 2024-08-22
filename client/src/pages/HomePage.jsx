import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, SimpleGrid, Text, VStack, Box, keyframes } from '@chakra-ui/react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';

// Define a keyframe animation for subtle text movement
const bounceAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log("Products", products);

    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"5xl"}
                    fontWeight={"extrabold"}
                    bgGradient={"linear(to-r, blue.600, cyan.500, blue.600, purple.700)"}
                    bgClip={"text"}
                    textAlign={"center"}
                    textShadow={"2px 2px 4px rgba(0, 0, 0, 0.4)"}
                    animation={`${bounceAnimation} 3s ease-in-out infinite`}
                >
                    Current Products
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3
                    }}
                    spacing={10}
                    w={"full"}
                    minH="200px"
                    placeItems="center"
                    gridTemplateColumns={products.length === 0 ? '1fr' : null} // Ensure single column layout when no products are found
                >
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <Text fontSize='xl' textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
                            No Products Found{" "}
                            <Link to={"/create"}>
                                <Text as={'span'} color={'blue.500'} _hover={{ textDecoration: "underline" }}>
                                    Create a product
                                </Text>
                            </Link>
                        </Text>
                    )}
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default HomePage;
