import React, { Children } from "react";
import {
    ScaleFade,
    HStack,
    VStack,
    OrderedList,
    Divider,
    Text,
    Box,
} from "@chakra-ui/react";


const ResultsList: React.FC<{
    title: string;
    helperText?: string;
}> = ({title, helperText, children}) => {
    const childCount = Children.count(children);
    
    return (
        <Box w="100%">
            <ScaleFade initialScale={0.9} in={true}>
                <VStack mt={3} w="100%">
                    <HStack w="100%">
                        <Text fontWeight="bold">{title}</Text>
                        {helperText &&
                            <Text color="gray.700">
                                {helperText}
                            </Text>
                        }
                    </HStack>
                    <Divider orientation="horizontal" />
                    <OrderedList
                        w="100%"
                        listStyleType="none"
                        overflowY="auto"
                        maxHeight="200px"
                        spacing={1}
                        pb={childCount > 3 ? 5 : 0}
                        sx={{
                            maskImage: childCount > 3 ? 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))' : 'none'
                        }}
                    >
                        {children}
                    </OrderedList>
                    <Divider orientation="horizontal" />
                </VStack>
            </ScaleFade>
        </Box>
    );
};

export default ResultsList;