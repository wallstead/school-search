import React, { useState, useEffect } from "react";
import {
    Input,
    ScaleFade,
    Spinner,
    InputGroup,
    HStack,
    InputLeftElement,
    Button,
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

    async function startSearch() {
        setSearching(true)
        const districtSearchResults = await searchSchoolDistricts(districtInput)
        setDistrictSearch(districtSearchResults)
        console.log("District results", districtSearchResults)

        const demoSchoolSearch = await searchSchools("reno", districtSearchResults[0].LEAID)
        setSchoolSearch(demoSchoolSearch)
        console.log("School results", demoSchoolSearch)
        setSearching(false)
    }

    // Whenever the district or school name inputs change, trigger a search
    useEffect(() => {
        startSearch()
    }, []);

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
        </Card>
    );
};

export default Search;
