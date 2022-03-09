import React, {Dispatch, SetStateAction} from "react";
import {
    ScaleFade,
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
    Button,
    useDisclosure
} from "@chakra-ui/react";
import {CheckIcon, InfoOutlineIcon, ExternalLinkIcon} from "@chakra-ui/icons";
import {NCESDistrictFeatureAttributes } from "@utils/nces"


const DistrictListItem: React.FC<{
    district: NCESDistrictFeatureAttributes; 
    selectedDistrict: string | undefined;
    setSelectedDistrict: Dispatch<SetStateAction<string | undefined>>;
}> = ({district, selectedDistrict, setSelectedDistrict}) => {
    
    const {isOpen, onOpen, onClose} = useDisclosure(); 
    const selected = district.LEAID === selectedDistrict;

    return (
        <ListItem
            py={2}
            px={3}
            borderRadius={12}
            transition="background-color 150ms linear"
            background={selected ? "gray.100" : "transparent"}
            _hover={{
                background: "gray.100",
                cursor: "pointer",
            }}
            _active={{
                background: "gray.200"
            }}
            onClick={() => selected ? setSelectedDistrict('') : setSelectedDistrict(district.LEAID)}
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textTransform="capitalize">{district.NAME.toLowerCase()}</ModalHeader>
                    <ModalCloseButton />
                    <Divider orientation="horizontal" />
                    <ModalBody mb={2}>
                        <Link href='https://data-nces.opendata.arcgis.com/datasets/nces::private-school-locations-current/api' isExternal>
                            {'Data from data-nces.opendata.arcgis.com '} <ExternalLinkIcon ml={2} mb={1} />
                        </Link>
                        
                        <UnorderedList listStyleType="none" ml={0} mt={2} spacing={1}>
                            {Object.entries(district).map(districtInfo => {
                                return <ListItem><Text fontWeight="bold">{districtInfo[0]}:</Text> {districtInfo[1]}</ListItem>
                            })}
                        </UnorderedList>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <HStack justify="space-between">
                <HStack>
                    <Text userSelect="none" textTransform="capitalize">
                        {district.NAME.toLowerCase()},{" "}
                        {district.LSTATE}
                    </Text>
                    <Button colorScheme='transparent' variant='ghost' px={2} onClick={(event) => {
                        event.stopPropagation(); // Stop click from bubbling up to the list item
                        onOpen();
                    } }>
                        <InfoOutlineIcon />
                    </Button>
                </HStack>
                {selected &&
                    <ScaleFade initialScale={0.5} in={true}>
                        <CheckIcon color="green" mb={1} />
                    </ScaleFade>}
            </HStack>
        </ListItem>
    );
};

export default DistrictListItem;