import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { Spinner } from "@chakra-ui/react";
import { Card } from "@components/design/Card";
import DistrictListItem from "./DistrictListItem";
import SchoolListItem from "./SchoolListItem";
import { searchSchoolDistricts, searchSchools, NCESDistrictFeatureAttributes, NCESSchoolFeatureAttributes } from "@utils/nces"
import SearchInputs from "./SearchInputs";
import ResultsList from "./ResultsList";


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

    async function startDistrictSearch(district: string, chosenDistrictID: NCESSchoolFeatureAttributes["LEAID"]) {
        setSearchingDistricts(true);
        if (district.length > 0) {
            const districtSearchResults = await searchSchoolDistricts(district);
            setDistrictSearch(districtSearchResults);

            // if chosenDistrictID no longer exists in results, trigger a school search update
            const chosenDistrictInResults = districtSearchResults.find(district => district.LEAID === chosenDistrictID);
            if (!chosenDistrictInResults) {
                setSelectedDistrict('');
            }
        } else {
            setDistrictSearch([]);
            setSelectedDistrict('');
        }
        setSearchingDistricts(false);
    }

    async function startSchoolSearch(school: string, chosenDistrictID: NCESSchoolFeatureAttributes["LEAID"]) {
        setSearchingSchools(true);
        // If school search input is not empty or a district has been selected
        if (school.length > 0 || (chosenDistrictID && chosenDistrictID.length > 0)) {
            const schoolSearchResults = await searchSchools(school, chosenDistrictID);
            setSchoolSearch(schoolSearchResults);
        } else {
            setSchoolSearch([]);
        }
        setSearchingSchools(false);
    }

    // To delay search until the user stops typing to not abuse the API
    const delayedDistrictSearch = useCallback(
        debounce((district, selectedDistrict) => startDistrictSearch(district, selectedDistrict), 600),
        []
    );

    const delayedSchoolSearch = useCallback(
        debounce((school, selectedDistrict) => startSchoolSearch(school, selectedDistrict), 600),
        []
    );

    // Whenever the district or school name inputs change, trigger a delayed search
    useEffect(() => {
        delayedDistrictSearch(districtInput, selectedDistrict)
    }, [districtInput]);

    useEffect(() => {
        delayedSchoolSearch(schoolInput, selectedDistrict)
    }, [schoolInput]);

    // When the selected district is changed, instanty trigger a search
    useEffect(() => {
        startSchoolSearch(schoolInput, selectedDistrict)
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
                <ResultsList title="Districts" helperText="Select a district to filter schools">
                    {districtSearch.map((district) => {
                        return (
                            <DistrictListItem district={district} selectedDistrict={selectedDistrict} setSelectedDistrict={setSelectedDistrict} key={district.OBJECTID} />
                        );
                    })}
                </ResultsList>
            ) : null}
            {searchingSchools ? (
                <Spinner mt={3} />
            ) : schoolSearch.length > 0 ? (
                <ResultsList title="Schools">
                    {schoolSearch.map((school, index) => {
                        return (
                            <SchoolListItem school={school} key={index} />
                        );
                    })}
                </ResultsList>
            ) : null}
        </Card>
    );
};

export default Search;