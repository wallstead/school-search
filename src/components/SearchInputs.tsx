import React, {Dispatch, SetStateAction} from "react";
import {
    Input,
    InputGroup,
    Stack,
    InputLeftElement,
    Button,
    FormControl,
    Text,
    FormLabel,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons"
import {theme} from '@theme/index'


const SearchInputs: React.FC<{
    districtInput: string;
    schoolInput: string;
    setDistrictInput: Dispatch<SetStateAction<string>>;
    setSchoolInput: Dispatch<SetStateAction<string>>;
    clearSearches: () => void;
}> = ({districtInput, schoolInput, setDistrictInput, setSchoolInput, clearSearches}) => {
    return (
        <Stack spacing="5px" direction={{ base: 'column', md: 'row' }}>
            <Stack spacing="0px" direction={{ base: 'column', md: 'row' }}>
                <FormControl variant='floating'>
                    <InputGroup size="lg" mb={{ base: '15px', md: '0' }}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="gray.300" />}
                        />
                        <Input
                            type="tel"
                            borderRightRadius={{ base: 'default', md: '0' }}
                            borderRightColor={{ base: 'default', md: 'transparent' }}
                            value={districtInput}
                            placeholder=" "
                            onChange={(e) => setDistrictInput(e.target.value)}
                        />
                        <FormLabel>School District</FormLabel>
                    </InputGroup>
                </FormControl>
                <FormControl variant='floating'>
                    <InputGroup size="lg">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="gray.300" />}
                        />
                        <Input
                            type="tel"
                            placeholder=" "
                            borderLeftRadius={{ base: 'default', md: '0' }}
                            value={schoolInput}
                            onChange={(e) => setSchoolInput(e.target.value)}
                        />
                        <FormLabel>School Name</FormLabel>
                    </InputGroup>
                </FormControl>
            </Stack>
            <Button
                colorScheme="green"
                color={theme.colors.brand.darkGreen}
                variant="ghost"
                borderRadius="11px"
                size="lg"
                onClick={() => clearSearches()}
            >
                Clear
            </Button>
        </Stack>
    );
};

export default SearchInputs;