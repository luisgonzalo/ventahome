import React from "react";
import { GetServerSideProps } from "next";
import {
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import DefaultLayout from "@/features/Layout/DefaultLayout";
import { TbMapPin } from "react-icons/tb";
import PropertyThumbnailSlider from "@/features/Property/components/PropertyThumbnailSlider";
import PropertyStats from "@/features/Property/components/PropertyStats";
import TextContentBox from "@/features/common/modules/TextContentBox";
import PropertyYoutubeEmbeded from "@/features/Property/components/PropertyYoutubeEmbeded";
import PropertyMatterPortEmbed from "@/features/Property/components/PropertyMatterPortEmbed";
import { getProperty } from "@/features/Property/API/getProperty";
import { Property } from "@/lib/property";
import { usePropertyFormat } from "@/features/common/Hooks/usePropertyFormat";

const PropertyDetail = ({ property }: { property: Property }) => {
  const {
    address,
    propertyType,
    price,
    title,
    rooms,
    baths,
    purpose,
    sqSize,
    externalID,
    photos,
    description,
    coverVideo,
    panorama,
    amenities,
  } = usePropertyFormat(property);

  const images = photos as string[];

  return (
    <DefaultLayout title={title} description={description}>
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
          <GridItem colSpan={6}>
            <Text
              fontSize="3xl"
              fontWeight="medium"
              color="blue.800"
              textAlign={{ base: "center", md: "left" }}
            >
              {propertyType} | {title}
            </Text>
            <Flex
              fontSize="xl"
              color="blue.600"
              textAlign="center"
              flexDirection={{ base: "column", sm: "row" }}
              gap="0.5rem"
              marginY={{ base: "1rem", sm: "0" }}
            >
              <TbMapPin />
              <Text fontWeight="ligth">
                {address} - ID:{externalID}
              </Text>
              <Badge
                colorScheme="green"
                padding="0.4rem"
                width="fit-content"
                height="fit-content"
                marginX={{ base: "auto", lg: "0" }}
              >
                {purpose}
              </Badge>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 6, md: 3 }}>
            <PropertyThumbnailSlider photos={images} />
          </GridItem>
          <GridItem colSpan={{ base: 6, md: 3 }}>
            <PropertyStats
              rooms={rooms}
              baths={baths}
              price={price}
              sqSize={Number(sqSize)}
            />
            <TextContentBox title="Descripción">
              <Text
                fontWeight="light"
                color="gray.600"
                fontSize="1rem"
                noOfLines={4}
              >
                {description}
              </Text>
            </TextContentBox>
            <TextContentBox title="Equipamiento">
              <SimpleGrid
                columns={{ base: 1, sm: 2 }}
                fontWeight="light"
                color="gray.600"
                fontSize="1rem"
              >
                {amenities.length
                  ? amenities.map((item: string) => (
                      <Text key={item}>{item}</Text>
                    ))
                  : "Por favor contacte con nosotros para más información"}
              </SimpleGrid>
            </TextContentBox>
          </GridItem>
          {coverVideo.length > 0 && (
            <GridItem colSpan={{ base: 6, sm: 3 }}>
              <TextContentBox title="Vídeo">
                <PropertyYoutubeEmbeded coverVideo={coverVideo} />
              </TextContentBox>
            </GridItem>
          )}
          {typeof panorama === "string" && (
            <GridItem colSpan={{ base: 6, sm: 3 }}>
              <TextContentBox title="Paseo virtual 3D">
                <PropertyMatterPortEmbed panorama={panorama} />
              </TextContentBox>
            </GridItem>
          )}
        </Grid>
      </Box>
    </DefaultLayout>
  );
};

export default PropertyDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const property = await getProperty(id!);

  return {
    props: { property },
  };
};
