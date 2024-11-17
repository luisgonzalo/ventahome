import { Hit } from "@/lib/properties";

export const useHitFormat = (property: Hit) => {
  const address = property.location.map((item) => item.name).join(", ");
  const coverPhoto = property.coverPhoto.url;
  const propertyType = `${property.category[0].name} ${property.category[1].name}`;
  const price = property.price.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  const title = property.title;
  const rooms = property.rooms;
  const baths = property.baths;
  const purpose = property.purpose;
  const sqSize = property.area.toFixed(2);
  const externalID = property.externalID;

  const coverVideoUrl = property.coverVideo.url;
  const coverVideo = coverVideoUrl.slice(coverVideoUrl.length - 11);

  const furshied = property.furnishingStatus;

  return {
    address,
    coverPhoto,
    propertyType,
    price,
    title,
    rooms,
    baths,
    purpose,
    sqSize,
    externalID,
    coverVideo,
    furshied,
  };
};
