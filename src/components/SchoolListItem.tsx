import React from "react";
import {
    HStack,
    UnorderedList,
    ListItem,
    Divider,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Link,
    useDisclosure,
    Box
} from "@chakra-ui/react";
import {googleMapsKey} from '../utils/maps'
import {InfoOutlineIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {NCESSchoolFeatureAttributes } from "@utils/nces"
import GoogleMapReact from 'google-map-react'


const SchoolListItem: React.FC<{
    school: NCESSchoolFeatureAttributes;
}> = ({school}) => {

    const {isOpen, onOpen, onClose} = useDisclosure(); 
    const location = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
      }
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textTransform="capitalize">{school.NAME?.toLowerCase()}</ModalHeader>
                    <ModalCloseButton />
                    <Divider orientation="horizontal" />
                    <ModalBody mb={2}>
                        <Box height={300}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: googleMapsKey }}
                            defaultCenter={location}
                            defaultZoom={1}
                        >
                            
                        </GoogleMapReact>
                        </Box>
                        <Link href='https://data-nces.opendata.arcgis.com/datasets/nces::private-school-locations-current/api' isExternal>
                            {'Data from data-nces.opendata.arcgis.com '} <ExternalLinkIcon ml={2} mb={1} />
                        </Link>
                        <UnorderedList 
                            listStyleType="none" 
                            ml={0} 
                            mt={2} 
                            spacing={1} 
                            maxHeight="300px" 
                            overflowY="auto"
                            pb={5}
                            sx={{
                                maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))'
                            }}
                        >
                            {Object.entries(school).map(schoolInfo => {
                                return <ListItem key={schoolInfo[0]}><Text fontWeight="bold">{schoolInfo[0]}:</Text> {schoolInfo[1]}</ListItem>
                            })}
                        </UnorderedList>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <ListItem
                py={2}
                px={3}
                borderRadius={12}
                transition="background-color 150ms linear"
                background="gray.50"
                _hover={{
                    background: "gray.100",
                    cursor: "pointer",
                }}
                _active={{
                    background: "gray.200"
                }}
                onClick={onOpen}
            >
                
                <HStack height={"40px"}>
                    <Text userSelect="none" mr={3}>{school.NAME}</Text>
                    <InfoOutlineIcon />
                </HStack>
            </ListItem>
        </>
    );
};

export default SchoolListItem;