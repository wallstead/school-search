import React, { Dispatch, SetStateAction } from 'react';
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
    useDisclosure,
} from '@chakra-ui/react';
import { theme } from '@theme/index';
import { CheckIcon, InfoOutlineIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { NCESDistrictFeatureAttributes } from '@utils/nces';

const DistrictListItem: React.FC<{
    district: NCESDistrictFeatureAttributes;
    selectedDistrict: string | undefined;
    setSelectedDistrict: Dispatch<SetStateAction<string | undefined>>;
}> = ({ district, selectedDistrict, setSelectedDistrict }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const selected = district.LEAID === selectedDistrict;

    return (
        <ListItem
            py={2}
            px={3}
            borderRadius={12}
            transition="background-color 150ms linear, border 150ms linear"
            background={selected ? 'gray.100' : 'gray.50'}
            border={selected ? `2px solid ${theme.colors.brand.darkBlue}` : '2px solid transparent'}
            _hover={{
                background: 'gray.100',
                cursor: 'pointer',
            }}
            _active={{
                background: 'gray.200',
            }}
            onClick={() => (selected ? setSelectedDistrict('') : setSelectedDistrict(district.LEAID))}
        >
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textTransform="capitalize">{district.NAME.toLowerCase()}</ModalHeader>
                    <ModalCloseButton />
                    <Divider orientation="horizontal" />
                    <ModalBody mb={2}>
                        <Link
                            href="https://data-nces.opendata.arcgis.com/datasets/nces::private-school-locations-current/api"
                            isExternal
                        >
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
                                maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0))',
                            }}
                        >
                            {Object.entries(district).map((districtInfo) => {
                                return (
                                    <ListItem key={districtInfo[0]}>
                                        <Text fontWeight="bold">{districtInfo[0]}:</Text> {districtInfo[1]}
                                    </ListItem>
                                );
                            })}
                        </UnorderedList>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <HStack justify="space-between">
                <HStack>
                    <Text userSelect="none" textTransform="capitalize">
                        {district.NAME.toLowerCase()}, {district.LSTATE}
                    </Text>
                    <Button
                        colorScheme="transparent"
                        variant="ghost"
                        px={2}
                        onClick={(event) => {
                            event.stopPropagation(); // Stop click from bubbling up to the list item
                            onOpen();
                        }}
                    >
                        <InfoOutlineIcon />
                    </Button>
                </HStack>
                {selected && (
                    <ScaleFade initialScale={0.5} in={true}>
                        <CheckIcon color={theme.colors.brand.darkBlue} mb={1} />
                    </ScaleFade>
                )}
            </HStack>
        </ListItem>
    );
};

export default DistrictListItem;
