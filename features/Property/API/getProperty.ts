import { Convert, Property } from "@/lib/property";
import fsPromises from "fs/promises";
import path from "path";

export const getProperty = async (id: string | string[]): Promise<Property> => {
  // Get the path of the json file
  const filePath = path.join(
    process.cwd(),
    `./features/data/${id}/property.json`
  );
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  const property = Convert.toProperty(jsonData.toString());

  return property;
};
