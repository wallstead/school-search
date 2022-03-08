import React from "react";
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

const Home: React.FC = () => {
  return (
    <ScaleFade initialScale={0.9} in={true}>
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
              />
            </InputGroup>
          </HStack>
          <HStack spacing="5px">
            <Button colorScheme="green" variant="ghost" borderRadius="11px" size="lg">
              Clear
            </Button>
            <Button colorScheme="green" variant="solid" borderRadius="11px" size="lg">
              Search
            </Button>
          </HStack>
        </HStack>
      </Card>
    </ScaleFade>
  );
};

export default Home;
