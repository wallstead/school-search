import React from "react"
import {
    Button,
    Center,
    Heading,
    Text,
    Icon,
    Input,
    ScaleFade,
    OrderedList,
    Divider,
    ListItem,
    Spinner,
    InputGroup, // Some Chakra components that might be usefull
    HStack,
    VStack,
    InputRightAddon,
} from "@chakra-ui/react"
import Search from './Search'


const Home: React.FC = () => {
    return (
        <Center padding="100px">
            {/* <ScaleFade initialScale={0.9} in={true}>
                <Card variant="rounded" borderColor="blue">
                    <Heading>School Data Finder</Heading>
                    <Text>
                        How would you utilize React.useEffect with the searchSchoolDistricts and searchSchools functions? <br />
                        Using <a href="https://chakra-ui.com/docs/principles" target="_blank">Chakra-UI</a> or your favorite UI toolkit, build an interface that allows the user to: <br />
                        <OrderedList>
                            <ListItem>Search for a district</ListItem>
                            <ListItem>Search for a school within the district (or bypass district filter)</ListItem>
                            <ListItem>View all returned data in an organized way</ListItem>
                        </OrderedList>
                    </Text>
                    <Divider margin={4} />
                    <Text>
                        Check the console for example of returned data. <b>Happy coding!</b>< br />
                        {searching ? <Spinner /> : <></>}< br />
                        {districtSearch.length} Demo Districts<br />
                        {schoolSearch.length} Demo Schools<br />
                    </Text>
                </Card>
            </ScaleFade> */}

            <ScaleFade initialScale={0.9} in={true}>
                <Heading as='h1' size='2xl' mb={5} textAlign='center'>School Search</Heading>
                <Search />
            </ScaleFade>
        </Center>
    );
};

export default Home