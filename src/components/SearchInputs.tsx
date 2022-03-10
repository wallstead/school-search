import React, {Dispatch, SetStateAction} from "react";
import {
    Input,
    InputGroup,
    Stack,
    InputLeftElement,
    Button
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
                <InputGroup size="lg" mb={{ base: '5px', md: '0' }}>
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        type="tel"
                        placeholder="School District"
                        borderRightRadius={{ base: 'default', md: '0' }}
                        borderRightColor={{ base: 'default', md: 'transparent' }}
                        value={districtInput}
                        onChange={(e) => setDistrictInput(e.target.value)}
                    />
                </InputGroup>
                <InputGroup size="lg">
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Search2Icon color="gray.300" />}
                    />
                    <Input
                        type="tel"
                        placeholder="School Name"
                        borderLeftRadius={{ base: 'default', md: '0' }}
                        value={schoolInput}
                        onChange={(e) => setSchoolInput(e.target.value)}
                    />
                </InputGroup>
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