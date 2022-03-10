import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import {
    Input,
    ScaleFade,
    Spinner,
    InputGroup,
    HStack,
    Stack,
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
import {theme} from '@theme/index';
import DistrictListItem from "./DistrictListItem";
import SchoolListItem from "./SchoolListItem";
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"
import SearchInputs from "./SearchInputs";


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
        console.log('searching', searching)
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
            Trigger school search if the search string changes OR
            we can no longer find the chosen district in the search
            results for districts, if there was a search made for those
        */

        let matchingChosenDistrictID = chosenDistrict;
        let shouldTriggerSchoolSearch = false;

        if (chosenDistrict && didSearchDistricts) {
            const matchingChosenDistrict = districtSearchResults.find(district => district.LEAID === chosenDistrict);
            matchingChosenDistrictID = matchingChosenDistrict?.LEAID;
            shouldTriggerSchoolSearch = true;
        }
        
        if (searching === "school" || shouldTriggerSchoolSearch) {
            setSearchingSchools(true);

            // If school search input is not empty or a district has been selected
            if (school.length > 0 || (matchingChosenDistrictID && matchingChosenDistrictID.length > 0)) {
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
            <SearchInputs 
                districtInput={districtInput} 
                schoolInput={schoolInput}
                setDistrictInput={setDistrictInput}
                setSchoolInput={setSchoolInput}
                clearSearches={clearSearches}
            />
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