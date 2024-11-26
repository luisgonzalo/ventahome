import { getProperties } from "@/features/common/API/getProperties";
import FeaturedProperties from "@/features/Home/components/FeaturedProperties";
import HeroBanner from "@/features/Home/components/HeroBanner";
import MeetTheTeam from "@/features/Home/components/MeetTheTeam";
import Partners from "@/features/Home/components/Partners";
import Testimonials from "@/features/Home/components/Testimonials";
import DefaultLayout from "@/features/Layout/DefaultLayout";
import { Hit } from "@/lib/properties";
import { GetStaticProps } from "next";

export default function Home({
  featuredProperties,
}: {
  featuredProperties: Hit[];
}) {
  return (
    <DefaultLayout
      title="VentaHome"
      description="Encuentra el hogar de tus sueños"
    >
      <HeroBanner />
      <FeaturedProperties featuredProperties={featuredProperties} />
      <MeetTheTeam />
      {/* <Partners /> */}
      <Testimonials />
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const properties = await getProperties();
  return {
    props: { featuredProperties: properties.hits },
  };
};
