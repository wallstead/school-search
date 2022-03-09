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
    Divider,
    Text,
    Box,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { Card } from "@components/design/Card";
import DistrictListItem from "./DistrictListItem";
import SchoolListItem from "./SchoolListItem";
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"


const Search: React.FC = () => {
    const [searchingDistricts, setSearchingDistricts] = useState(false);
    const [searchingSchools, setSearchingSchools] = useState(false);
    const [districtSearch, setDistrictSearch] = useState<NCESDistrictFeatureAttributes[]>([]);
    const [schoolSearch, setSchoolSearch] = useState<NCESSchoolFeatureAttributes[]>([]);
    const [districtInput, setDistrictInput] = useState('');
    const [schoolInput, setSchoolInput] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState<NCESSchoolFeatureAttributes["LEAID"]>('');

    function clearSearches() {
        setDistrictInput('');
        setSchoolInput('');
        setSelectedDistrict('');
        setSchoolSearch([]);
        setDistrictSearch([]);
    }

    async function startSearch(searching: string, district: string, school: string, chosenDistrict: NCESSchoolFeatureAttributes["LEAID"]) {
        // Only search districts if the district search string has changed
        let didSearchDistricts = false;
        let districtSearchResults: NCESDistrictFeatureAttributes[] = [];

        if (searching === "district") {
            didSearchDistricts = true;
            setSearchingDistricts(true);
    
            if (district.length > 0) {
                districtSearchResults = await searchSchoolDistricts(district);
                setDistrictSearch(districtSearchResults);
                console.log("District results", districtSearchResults);
            } else {
                setDistrictSearch([]);
            }
    
            setSearchingDistricts(false);
        }

        /* 
            We need to trigger school search if the search string changes OR
            we can no longer find the chosen district in the search results for districts, if there was a search made for those
        */

        let matchingChosenDistrictID = undefined;
        let shouldTriggerSchoolSearch = false;
        if (chosenDistrict) {
            if (didSearchDistricts) {
                const matchingChosenDistrict = districtSearchResults.find(district => district.LEAID === chosenDistrict);
                matchingChosenDistrictID = matchingChosenDistrict?.LEAID;
                shouldTriggerSchoolSearch = true
            } else {
                matchingChosenDistrictID = chosenDistrict
            }
        }
        
        if (searching === "school" || shouldTriggerSchoolSearch) {
            setSearchingSchools(true);
            
            if (school.length > 0) {
                // Filter schools by the matching chosen district from teh district search results, only if the matching district exists
                const schoolSearchResults = await searchSchools(school, matchingChosenDistrictID);
                setSchoolSearch(schoolSearchResults);
                console.log("School results", schoolSearchResults);
            } else {
                setSchoolSearch([]);
            }
    
            setSearchingSchools(false);
        }
    }

    // To delay search until the user stops typing to not abuse the API
    const delayedSearch = useCallback(
        debounce((searching, district, school, chosenDistrict) => startSearch(searching, district, school, chosenDistrict), 600),
        []
    );

    // Whenever the district or school name inputs change, trigger a delayed search
    useEffect(() => {
        delayedSearch("district", districtInput, schoolInput, selectedDistrict)
    }, [districtInput]);

    useEffect(() => {
        delayedSearch("school", districtInput, schoolInput, selectedDistrict)
    }, [schoolInput]);

    // When the selected district is changed, instanty trigger a search
    useEffect(() => {
        startSearch("school", districtInput, schoolInput, selectedDistrict)
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
            {searchingDistricts ? (
                <Spinner mt={3} />
            ) : districtSearch.length > 0 ? (
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
                                pb={districtSearch.length > 3 ? 5 : 0}
                                sx={{
                                    maskImage: districtSearch.length > 3 ? 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))' : 'none'
                                }}
                            >
                                {districtSearch.map((district) => {
                                    
                                    return (
                                        <DistrictListItem district={district} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} key={district.OBJECTID} />
                                    );
                                })}
                            </OrderedList>
                            <Divider orientation="horizontal" />
                        </VStack>
                    </ScaleFade>
                </Box>
            ) : null}
            {searchingSchools ? (
                <Spinner mt={3} />
            ) : schoolSearch.length > 0 ? (
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
                                pb={schoolSearch.length > 3 ? 5 : 0}
                                sx={{
                                    maskImage: schoolSearch.length > 3 ? 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))' : 'none'
                                }}
                            >
                                {schoolSearch.map((school, index) => {
                                    return (
                                        <SchoolListItem school={school} key={index} />
                                    );
                                })}
                            </OrderedList>
                            <Divider orientation="horizontal" />
                        </VStack>
                    </ScaleFade>
                </Box>
            ) : null}
        </Card>
    );
};

export default Search;