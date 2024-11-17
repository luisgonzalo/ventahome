import React from "react";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import DefaultLayout from "@/features/Layout/DefaultLayout";
import { Box, SimpleGrid } from "@chakra-ui/react";
import PropertyCard from "@/features/common/modules/PropertyCard";
import { getProperties } from "@/features/common/API/getProperties";
import { Hit, Properties as PropertiesResult } from "@/lib/properties";

const Properties = ({ properties }: { properties: PropertiesResult }) => {
  return (
    <DefaultLayout
      title="Properties"
      description='"Find your dream home with our real estate website. Browse through thousands of listings, connect with expert agents, and discover the perfect property for your lifestyle. Start your search today and make your homeownership dreams a reality.'
    >
      <Box backgroundColor="#f7f8f9" padding="3rem">
        <Box maxWidth="1280px" margin="0 auto">
          <SimpleGrid
            columns={{ base: 1, sm: 3 }}
            gap={{ base: "0", sm: "2rem" }}
          >
            {properties.hits.map((hit, index) => (
              <PropertyCard key={index} hit={hit} />
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default Properties;

export const getStaticProps: GetStaticProps = async () => {
  const properties = await getProperties();

  return {
    props: {
      properties: properties,
    },
  };
};
