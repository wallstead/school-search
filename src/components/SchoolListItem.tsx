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
import {theme} from '@theme/index';
import {googleMapsKey} from '../utils/maps'
import {InfoOutlineIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {NCESSchoolFeatureAttributes } from "@utils/nces"
import GoogleMapReact from 'google-map-react'


const SchoolListItem: React.FC<{
    school: NCESSchoolFeatureAttributes;
}> = ({school}) => {
    const {isOpen, onOpen, onClose} = useDisclosure(); 

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textTransform="capitalize">{school.NAME?.toLowerCase()}</ModalHeader>
                    <ModalCloseButton />
                    <Divider orientation="horizontal" />
                    <ModalBody mb={2}>
                        <Box height={300} mb={3} borderWidth={2} borderColor={theme.colors.brand.blue}>
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: googleMapsKey }}
                                defaultCenter={{
                                    lat: school.LAT ? school.LAT : 0,
                                    lng: school.LON ? school.LON : 0,
                                  }}
                                defaultZoom={15}
                                draggable={false}
                            >
                                <Box borderWidth={3} borderColor={theme.colors.brand.blue} borderRadius="50%" height={20} width={20} position="relative" left={-10} top={-10}></Box>
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