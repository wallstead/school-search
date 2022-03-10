import React from 'react';
import { Center, Heading, ScaleFade, Text } from '@chakra-ui/react';
import Search from './Search';

const Home: React.FC = () => {
    return (
        <Center px={{ base: '24px', md: '100px' }} pt={{ base: '100px', md: '150px' }} position="relative">
            <ScaleFade initialScale={0.9} in={true}>
                <Heading as="h1" size="2xl" mb={7} textAlign="center">
                    School{' '}
                    <Text as="span" backgroundImage="https://characterstrong.com/wp-content/themes/charactertheme/images/homepage/yellow_underline.svg" backgroundPosition="left bottom" backgroundRepeat="no-repeat" backgroundSize="5em" paddingBottom="12px">
                        Search
                    </Text>
                </Heading>
                <Search />
            </ScaleFade>
        </Center>
    );
};

export default Home;
