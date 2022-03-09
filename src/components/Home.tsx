import React from "react"
import {
    Center,
    Heading,
    ScaleFade,
} from "@chakra-ui/react"
import Search from './Search'


const Home: React.FC = () => {
    return (
        <Center px={{ base: '24px', md: '100px' }} pt="150px">
            <ScaleFade initialScale={0.9} in={true}>
                <Heading as='h1' size='2xl' mb={5} textAlign='center'>School Search</Heading>
                <Search />
            </ScaleFade>
        </Center>
    );
};

export default Home