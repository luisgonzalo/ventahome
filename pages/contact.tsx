import ContactForm from "@/features/common/modules/ContactForm";
import TextContentBox from "@/features/common/modules/TextContentBox";
import DefaultLayout from "@/features/Layout/DefaultLayout";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

const Contact = () => {
  return (
    <DefaultLayout
      title="Contact"
      description='"Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.'
    >
      <Box
        backgroundColor="#f7f8f9"
        paddingY="3rem"
        paddingX={{ base: "1rem", md: "3rem" }}
      >
        <Grid
          templateColumns="repeat(6, 1fr)"
          gap="5"
          maxWidth="1280px"
          margin="0 auto"
        >
          <GridItem colSpan={{ base: 6, md: 4 }}>
            <TextContentBox title="Contacta con nosotros">
              <ContactForm />
            </TextContentBox>
          </GridItem>
          <GridItem colSpan={{ base: 6, md: 2 }}>
            <TextContentBox title="Dirección Postal:">
              <Text
                fontWeight="light"
                color="gray.600"
                fontSize="1rem"
                marginBottom="1rem"
              >
                Ignacio Francés <br />
                Director VentaHome
                <br />
                Avda Miguel Díaz Recio 24, Bajo. 29010 Málaga
              </Text>
            </TextContentBox>
          </GridItem>
        </Grid>
      </Box>
    </DefaultLayout>
  );
};

export default Contact;
