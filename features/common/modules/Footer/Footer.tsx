import React from "react";
import Link from "next/link";
import { HiHomeModern } from "react-icons/hi2";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import {
  services,
  about,
  ourOffices,
  workWithUs,
} from "@/features/common/modules/Footer/FooterConst";

const Footer = () => {
  return (
    <Box backgroundColor="blue.600">
      <Box
        maxWidth="1280px"
        margin="0 auto"
        paddingY="3rem"
        paddingX={{ base: "2rem" }}
      >
        <SimpleGrid
          column="4"
          color="whiteAlpha.700"
          gap="1.7rem"
          minChildWidth="150px"
        >
          <Flex flexDirection="column">
            <FooterHeader title="¿Quiénes somos?" />
            {services.map((item) => (
              <FooterLink key={item.name} link={item.link} name={item.name} />
            ))}
          </Flex>
          <Flex flexDirection="column">
            <FooterHeader title="¿Qué hacemos?" />
            {about.map((item) => (
              <FooterLink key={item.name} link={item.link} name={item.name} />
            ))}
          </Flex>
          <Flex flexDirection="column">
            <FooterHeader title="Oficinas" />
            {ourOffices.map((item) => (
              <FooterLink key={item.name} link={item.link} name={item.name} />
            ))}
          </Flex>
          <Flex flexDirection="column">
            <FooterHeader title="Trabajemos juntos" />
            {workWithUs.map((item) => (
              <FooterLink key={item.name} link={item.link} name={item.name} />
            ))}
          </Flex>
        </SimpleGrid>
      </Box>
      <Box
        backgroundColor="blue.900"
        display="flex"
        padding="2rem"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        color="white"
      >
        <Box display="flex" gap="2" alignItems="center">
          <HiHomeModern />
          <Text fontSize="lg" fontWeight="black">
            VentaHome
          </Text>
        </Box>
        <Text marginTop="1rem" fontSize="xs" textAlign="center">
          Todos los derechos reservados
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;

const FooterLink = ({ link, name }: { link: string; name: string }) => {
  return (
    <Text>
      <Link href={link}>{name}</Link>
    </Text>
  );
};

const FooterHeader = ({ title }: { title: string }) => {
  return (
    <Text as="h4" fontWeight="light" fontSize="xl" marginBottom="1rem">
      {title}
    </Text>
  );
};
