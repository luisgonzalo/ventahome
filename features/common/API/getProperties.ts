import { Convert, Properties } from "@/lib/properties";
import fsPromises from "fs/promises";
import path from "path";

export async function getProperties(): Promise<Properties> {
  // Get the path of the json file
  const filePath = path.join(process.cwd(), "./features/data/properties.json");
  // Read the json file
  const jsonData = await fsPromises.readFile(filePath);
  // Parse data as json
  const properties = Convert.toProperties(jsonData.toString());

  return properties;
}
