import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import {
    Input,
    ScaleFade,
    Spinner,
    InputGroup,
    HStack,
    InputLeftElement,
    Button,
    VStack,
    OrderedList,
    ListItem,
    Divider,
    Text
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Card } from "@components/design/Card";
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"


const Search: React.FC = () => {
    const [searching, setSearching] = useState(false)
    const [districtSearch, setDistrictSearch] = useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolSearch, setSchoolSearch] = useState<NCESSchoolFeatureAttributes[]>([]);
    const [districtInput, setDistrictInput] = useState('washoe');
    const [schoolInput, setSchoolInput] = useState('');

    function clearSearches() {
        setDistrictInput('');
        setSchoolInput('');
    }

    async function startSearch(district: string, school: string) {
        setSearching(true)

        let districtSearchResults: NCESDistrictFeatureAttributes[] = [];

        if (district.length > 0) {
            districtSearchResults = await searchSchoolDistricts(district)
            setDistrictSearch(districtSearchResults)
            console.log("District results", districtSearchResults)
        } else {
            setDistrictSearch([]);
        }

        if (school.length > 0) {
            const demoSchoolSearch = await searchSchools(school, districtSearchResults[0].LEAID)
            setSchoolSearch(demoSchoolSearch)
            console.log("School results", demoSchoolSearch)
        } else {
            setSchoolSearch([]);
        }

        setSearching(false)
    }

    // To delay search until the user stops typing to not abuse the API
    const delayedSearch = useCallback(
        debounce((district, school) => startSearch(district, school), 600),
        []
    );

    // Whenever the district or school name inputs change, trigger a search
    useEffect(() => {
        delayedSearch(districtInput, schoolInput)
    }, [districtInput, schoolInput]);

    return (
        <Card variant="rounded">
            <HStack spacing="5px">
                <HStack spacing="0px">
                    <InputGroup size="lg">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="gray.300" />}
                        />
                        <Input
                            type="tel"
                            placeholder="School District"
                            borderRightRadius="0"
                            borderRightColor="transparent"
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
                            borderLeftRadius="0"
                            value={schoolInput}
                            onChange={(e) => setSchoolInput(e.target.value)}
                        />
                    </InputGroup>
                </HStack>
                <HStack spacing="5px">
                    <Button
                        colorScheme="green"
                        variant="ghost"
                        borderRadius="11px"
                        size="lg"
                        onClick={() => clearSearches()}
                    >
                        Clear
                    </Button>
                </HStack>
            </HStack>
            {searching ? (
                <Spinner mt={3} />
            ) : (
                districtSearch.length > 0 && (
                    <VStack mt={3} w="100%">
                        <Text w="100%" fontWeight="bold">
                            Districts
                        </Text>
                        <OrderedList
                            w="100%"
                            listStyleType="none"
                            overflowY="auto"
                            maxHeight="200px"
                            spacing={3}
                        >
                            {districtSearch.map((district) => {
                                return (
                                    <ListItem>
                                        {district.NAME}, {district.LSTATE}
                                    </ListItem>
                                );
                            })}
                        </OrderedList>
                        <Divider orientation="horizontal" />
                    </VStack>
                )
            )}
        </Card>
    );
};

export default Search;
