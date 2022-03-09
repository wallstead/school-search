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
    Text,
    Box,
} from "@chakra-ui/react";
import { Search2Icon, CheckIcon, InfoOutlineIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Card } from "@components/design/Card";
import DistrictListItem from "./DistrictListItem";
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"


const Search: React.FC = () => {
    const [searching, setSearching] = useState(false);
    const [districtSearch, setDistrictSearch] = useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolSearch, setSchoolSearch] = useState<NCESSchoolFeatureAttributes[]>([]);
    const [districtInput, setDistrictInput] = useState('');
    const [schoolInput, setSchoolInput] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState<NCESSchoolFeatureAttributes["LEAID"]>('');
    

    function clearSearches() {
        setDistrictInput('');
        setSchoolInput('');
        setSelectedDistrict('');
    }

    async function startSearch(district: string, school: string, chosenDistrict: NCESSchoolFeatureAttributes["LEAID"]) {
        setSearching(true)

        let districtSearchResults: NCESDistrictFeatureAttributes[] = [];

        if (district.length > 0) {
            districtSearchResults = await searchSchoolDistricts(district)
            setDistrictSearch(districtSearchResults)
            console.log("District results", districtSearchResults)
        } else {
            setDistrictSearch([]);
        }

        // If chosenDistrict is set, check if it's in the results array for the search 
        let matchingChosenDistrict = undefined;
        if (chosenDistrict) {
            matchingChosenDistrict = districtSearchResults.find(district => district.LEAID === chosenDistrict);
        } 

        if (school.length > 0) {
            // Filter schools by the matching chosen district from teh district search results, only if the matching district exists.
            const schoolSearchResults = await searchSchools(school, matchingChosenDistrict?.LEAID)
            setSchoolSearch(schoolSearchResults)
            console.log("School results", schoolSearchResults)
        } else {
            setSchoolSearch([]);
        }

        setSearching(false)
    }

    // To delay search until the user stops typing to not abuse the API
    const delayedSearch = useCallback(
        debounce((district, school, chosenDistrict) => startSearch(district, school, chosenDistrict), 600),
        []
    );

    // Whenever the district or school name inputs change, trigger a delayed search
    useEffect(() => {
        delayedSearch(districtInput, schoolInput, selectedDistrict)
    }, [districtInput, schoolInput]);

    // When the selected district is changed, instanty trigger a search
    useEffect(() => {
        startSearch(districtInput, schoolInput, selectedDistrict)
    }, [selectedDistrict]);

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
                <>
                    {districtSearch.length > 0 &&  
                        <Box w="100%">
                            <ScaleFade initialScale={0.9} in={true}>
                                <VStack mt={3} w="100%">
                                    <HStack w="100%">
                                        <Text fontWeight="bold">Districts</Text>
                                        <Text color="gray.700">
                                            Select a district to filter schools
                                        </Text>
                                    </HStack>
                                    <Divider orientation="horizontal" />
                                    <OrderedList
                                        w="100%"
                                        listStyleType="none"
                                        overflowY="auto"
                                        maxHeight="200px"
                                        spacing={1}
                                    >
                                        {districtSearch.map((district) => {
                                            
                                            return (
                                                <DistrictListItem district={district} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} />
                                            );
                                        })}
                                    </OrderedList>
                                    <Divider orientation="horizontal" />
                                </VStack>
                            </ScaleFade>
                        </Box>
                    }
                    {schoolSearch.length > 0 && 
                        <Box w="100%">
                            <ScaleFade initialScale={0.9} in={true}>
                                <VStack mt={3} w="100%">
                                    <Text fontWeight="bold" w="100%">Schools</Text>
                                    <Divider orientation="horizontal" />
                                    <OrderedList
                                        w="100%"
                                        listStyleType="none"
                                        overflowY="auto"
                                        maxHeight="200px"
                                        spacing={1}
                                    >
                                        {schoolSearch.map((school) => {
                                            return (
                                                <ListItem
                                                    py={2}
                                                    px={3}
                                                >
                                                    <HStack>
                                                        <Text userSelect="none">
                                                            {school.NAME}
                                                        </Text>
                                                    </HStack>
                                                </ListItem>
                                            );
                                        })}
                                    </OrderedList>
                                    <Divider orientation="horizontal" />
                                </VStack>
                            </ScaleFade>
                        </Box>
                    }
                </>
            )}
        </Card>
    );
};

export default Search;