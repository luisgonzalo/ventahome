// To parse this data:
//
//   import { Convert, Property } from "./file";
//
//   const property = Convert.toProperty(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Property {
  description: string;
  id: number;
  objectID: number;
  ownerID: number;
  userExternalID: string;
  sourceID: number;
  state: string;
  geography: Geography;
  purpose: string;
  price: number;
  product: string;
  productLabel: string;
  rentFrequency: null;
  referenceNumber: string;
  permitNumber: string;
  projectNumber: null;
  title: string;
  title_l1: string;
  title_l2: string;
  description_l1: string;
  description_l2: string;
  externalID: string;
  slug: string;
  slug_l1: string;
  slug_l2: string;
  location: Category[];
  category: Category[];
  createdAt: number;
  approvedAt: number;
  updatedAt: number;
  touchedAt: number;
  reactivatedAt: number;
  rooms: number;
  baths: number;
  area: number;
  score: number;
  score_l1: number;
  score_l2: number;
  coverPhoto: Photo;
  coverVideo: CoverVideo;
  photoCount: number;
  videoCount: number;
  panoramaCount: number;
  photos: Photo[];
  floorPlans: any[];
  floorPlan: FloorPlan;
  videos: CoverVideo[];
  panoramas: CoverVideo[];
  amenities: PropertyAmenity[];
  phoneNumber: PhoneNumber;
  contactName: string;
  agency: Agency;
  active: boolean;
  hasExactGeography: boolean;
  verification: Verification;
  isVerified: boolean;
  completionStatus: string;
  randBoostScore: number;
  randBoostScore_l1: number;
  randBoostScore_l2: number;
  furnishingStatus: string;
  type: string;
  cityLevelScore: number;
  indyScore: number;
  indyScore_l1: number;
  indyScore_l2: number;
  hasMatchingFloorPlans: boolean;
  hidePrice: boolean;
  locationPurposeTier: number;
}

export interface Agency {
  id: number;
  objectID: number;
  name: string;
  name_l1: string;
  name_l2: string;
  externalID: string;
  product: string;
  productScore: number;
  licenses: License[];
  logo: Logo;
  slug: string;
  slug_l1: string;
  slug_l2: string;
  tr: number;
  tier: number;
  roles: any[];
  active: boolean;
  commercialNumber: null;
  shortNumber: null;
}

export interface License {
  number: string;
  authority: string;
}

export interface Logo {
  id: number;
  url: string;
}

export interface PropertyAmenity {
  externalGroupID: number;
  groupRank: number;
  text: string;
  text_l1: string;
  text_l2: string;
  amenities: AmenityAmenity[];
}

export interface AmenityAmenity {
  text: string;
  text_l1: string;
  text_l2: string;
  value: Value;
  rank: number;
  slug: string;
  format: Format;
  externalID: number;
}

export enum Format {
  Checkbox = "checkbox",
}

export enum Value {
  True = "True",
}

export interface Category {
  id: number;
  level: number;
  externalID: string;
  name: string;
  name_l1: string;
  name_l2: string;
  slug: string;
  slug_l1: string;
  slug_l2: string;
  type?: string;
}

export interface Photo {
  id: number;
  externalID: string;
  title: null;
  orderIndex: number;
  nimaScore: number;
  url: string;
  main?: boolean;
}

export interface CoverVideo {
  externalID: number;
  title: null;
  host: string;
  url: string;
  orderIndex: number;
}

export interface FloorPlan {
  id: number;
  typeIdentifier: string;
  typeIdentifierValue: string;
  images: Image[];
  models: Model[];
}

export interface Image {
  id: number;
  externalID: string;
  orderIndex: number;
  image2D: Image2D;
  image3D: Image2D;
  label: string;
}

export interface Image2D {
  id: number;
}

export interface Model {
  id: number;
  externalID: string;
  orderIndex: null;
  placeholderImage: Image2D;
  label: null;
  modelURL: null;
}

export interface Geography {
  lat: number;
  lng: number;
}

export interface PhoneNumber {
  mobile: string;
  phone: string;
  whatsapp: string;
  phoneNumbers: string[];
  mobileNumbers: string[];
}

export interface Verification {
  status: string;
  type: string;
  eligible: boolean;
  comment: null;
  updatedAt: number;
  verifiedAt: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toProperty(json: string): Property {
    return cast(JSON.parse(json), r("Property"));
  }

  public static propertyToJson(value: Property): string {
    return JSON.stringify(uncast(value, r("Property")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Property: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "ownerID", js: "ownerID", typ: 0 },
      { json: "userExternalID", js: "userExternalID", typ: "" },
      { json: "sourceID", js: "sourceID", typ: 0 },
      { json: "state", js: "state", typ: "" },
      { json: "geography", js: "geography", typ: r("Geography") },
      { json: "purpose", js: "purpose", typ: "" },
      { json: "price", js: "price", typ: 0 },
      { json: "product", js: "product", typ: "" },
      { json: "productLabel", js: "productLabel", typ: "" },
      { json: "rentFrequency", js: "rentFrequency", typ: null },
      { json: "referenceNumber", js: "referenceNumber", typ: "" },
      { json: "permitNumber", js: "permitNumber", typ: "" },
      { json: "projectNumber", js: "projectNumber", typ: null },
      { json: "title", js: "title", typ: "" },
      { json: "title_l1", js: "title_l1", typ: "" },
      { json: "title_l2", js: "title_l2", typ: "" },
      { json: "description", js: "description", typ: "" },
      { json: "description_l1", js: "description_l1", typ: "" },
      { json: "description_l2", js: "description_l2", typ: "" },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "slug", js: "slug", typ: "" },
      { json: "slug_l1", js: "slug_l1", typ: "" },
      { json: "slug_l2", js: "slug_l2", typ: "" },
      { json: "location", js: "location", typ: a(r("Category")) },
      { json: "category", js: "category", typ: a(r("Category")) },
      { json: "createdAt", js: "createdAt", typ: 0 },
      { json: "approvedAt", js: "approvedAt", typ: 0 },
      { json: "updatedAt", js: "updatedAt", typ: 0 },
      { json: "touchedAt", js: "touchedAt", typ: 3.14 },
      { json: "reactivatedAt", js: "reactivatedAt", typ: 0 },
      { json: "rooms", js: "rooms", typ: 0 },
      { json: "baths", js: "baths", typ: 0 },
      { json: "area", js: "area", typ: 3.14 },
      { json: "score", js: "score", typ: 0 },
      { json: "score_l1", js: "score_l1", typ: 0 },
      { json: "score_l2", js: "score_l2", typ: 0 },
      { json: "coverPhoto", js: "coverPhoto", typ: r("Photo") },
      { json: "coverVideo", js: "coverVideo", typ: r("CoverVideo") },
      { json: "photoCount", js: "photoCount", typ: 0 },
      { json: "videoCount", js: "videoCount", typ: 0 },
      { json: "panoramaCount", js: "panoramaCount", typ: 0 },
      { json: "photos", js: "photos", typ: a(r("Photo")) },
      { json: "floorPlans", js: "floorPlans", typ: a("any") },
      { json: "floorPlan", js: "floorPlan", typ: r("FloorPlan") },
      { json: "videos", js: "videos", typ: a(r("CoverVideo")) },
      { json: "panoramas", js: "panoramas", typ: a(r("CoverVideo")) },
      { json: "amenities", js: "amenities", typ: a(r("PropertyAmenity")) },
      { json: "phoneNumber", js: "phoneNumber", typ: r("PhoneNumber") },
      { json: "contactName", js: "contactName", typ: "" },
      { json: "agency", js: "agency", typ: r("Agency") },
      { json: "active", js: "active", typ: true },
      { json: "hasExactGeography", js: "hasExactGeography", typ: true },
      { json: "verification", js: "verification", typ: r("Verification") },
      { json: "isVerified", js: "isVerified", typ: true },
      { json: "completionStatus", js: "completionStatus", typ: "" },
      { json: "randBoostScore", js: "randBoostScore", typ: 0 },
      { json: "randBoostScore_l1", js: "randBoostScore_l1", typ: 0 },
      { json: "randBoostScore_l2", js: "randBoostScore_l2", typ: 0 },
      { json: "furnishingStatus", js: "furnishingStatus", typ: "" },
      { json: "type", js: "type", typ: "" },
      { json: "cityLevelScore", js: "cityLevelScore", typ: 0 },
      { json: "indyScore", js: "indyScore", typ: 0 },
      { json: "indyScore_l1", js: "indyScore_l1", typ: 0 },
      { json: "indyScore_l2", js: "indyScore_l2", typ: 0 },
      { json: "hasMatchingFloorPlans", js: "hasMatchingFloorPlans", typ: true },
      { json: "hidePrice", js: "hidePrice", typ: true },
      { json: "locationPurposeTier", js: "locationPurposeTier", typ: 0 },
    ],
    false
  ),
  Agency: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "name_l1", js: "name_l1", typ: "" },
      { json: "name_l2", js: "name_l2", typ: "" },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "product", js: "product", typ: "" },
      { json: "productScore", js: "productScore", typ: 0 },
      { json: "licenses", js: "licenses", typ: a(r("License")) },
      { json: "logo", js: "logo", typ: r("Logo") },
      { json: "slug", js: "slug", typ: "" },
      { json: "slug_l1", js: "slug_l1", typ: "" },
      { json: "slug_l2", js: "slug_l2", typ: "" },
      { json: "tr", js: "tr", typ: 0 },
      { json: "tier", js: "tier", typ: 0 },
      { json: "roles", js: "roles", typ: a("any") },
      { json: "active", js: "active", typ: true },
      { json: "commercialNumber", js: "commercialNumber", typ: null },
      { json: "shortNumber", js: "shortNumber", typ: null },
    ],
    false
  ),
  License: o(
    [
      { json: "number", js: "number", typ: "" },
      { json: "authority", js: "authority", typ: "" },
    ],
    false
  ),
  Logo: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "url", js: "url", typ: "" },
    ],
    false
  ),
  PropertyAmenity: o(
    [
      { json: "externalGroupID", js: "externalGroupID", typ: 0 },
      { json: "groupRank", js: "groupRank", typ: 0 },
      { json: "text", js: "text", typ: "" },
      { json: "text_l1", js: "text_l1", typ: "" },
      { json: "text_l2", js: "text_l2", typ: "" },
      { json: "amenities", js: "amenities", typ: a(r("AmenityAmenity")) },
    ],
    false
  ),
  AmenityAmenity: o(
    [
      { json: "text", js: "text", typ: "" },
      { json: "text_l1", js: "text_l1", typ: "" },
      { json: "text_l2", js: "text_l2", typ: "" },
      { json: "value", js: "value", typ: r("Value") },
      { json: "rank", js: "rank", typ: 0 },
      { json: "slug", js: "slug", typ: "" },
      { json: "format", js: "format", typ: r("Format") },
      { json: "externalID", js: "externalID", typ: 0 },
    ],
    false
  ),
  Category: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "level", js: "level", typ: 0 },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "name_l1", js: "name_l1", typ: "" },
      { json: "name_l2", js: "name_l2", typ: "" },
      { json: "slug", js: "slug", typ: "" },
      { json: "slug_l1", js: "slug_l1", typ: "" },
      { json: "slug_l2", js: "slug_l2", typ: "" },
      { json: "type", js: "type", typ: u(undefined, "") },
    ],
    false
  ),
  Photo: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "title", js: "title", typ: null },
      { json: "orderIndex", js: "orderIndex", typ: 0 },
      { json: "nimaScore", js: "nimaScore", typ: 3.14 },
      { json: "url", js: "url", typ: "" },
      { json: "main", js: "main", typ: u(undefined, true) },
    ],
    false
  ),
  CoverVideo: o(
    [
      { json: "externalID", js: "externalID", typ: 0 },
      { json: "title", js: "title", typ: null },
      { json: "host", js: "host", typ: "" },
      { json: "url", js: "url", typ: "" },
      { json: "orderIndex", js: "orderIndex", typ: 0 },
    ],
    false
  ),
  FloorPlan: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "typeIdentifier", js: "typeIdentifier", typ: "" },
      { json: "typeIdentifierValue", js: "typeIdentifierValue", typ: "" },
      { json: "images", js: "images", typ: a(r("Image")) },
      { json: "models", js: "models", typ: a(r("Model")) },
    ],
    false
  ),
  Image: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "orderIndex", js: "orderIndex", typ: 0 },
      { json: "image2D", js: "image2D", typ: r("Image2D") },
      { json: "image3D", js: "image3D", typ: r("Image2D") },
      { json: "label", js: "label", typ: "" },
    ],
    false
  ),
  Image2D: o([{ json: "id", js: "id", typ: 0 }], false),
  Model: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "orderIndex", js: "orderIndex", typ: null },
      { json: "placeholderImage", js: "placeholderImage", typ: r("Image2D") },
      { json: "label", js: "label", typ: null },
      { json: "modelURL", js: "modelURL", typ: null },
    ],
    false
  ),
  Geography: o(
    [
      { json: "lat", js: "lat", typ: 3.14 },
      { json: "lng", js: "lng", typ: 3.14 },
    ],
    false
  ),
  PhoneNumber: o(
    [
      { json: "mobile", js: "mobile", typ: "" },
      { json: "phone", js: "phone", typ: "" },
      { json: "whatsapp", js: "whatsapp", typ: "" },
      { json: "phoneNumbers", js: "phoneNumbers", typ: a("") },
      { json: "mobileNumbers", js: "mobileNumbers", typ: a("") },
    ],
    false
  ),
  Verification: o(
    [
      { json: "status", js: "status", typ: "" },
      { json: "type", js: "type", typ: "" },
      { json: "eligible", js: "eligible", typ: true },
      { json: "comment", js: "comment", typ: null },
      { json: "updatedAt", js: "updatedAt", typ: 3.14 },
    ],
    false
  ),
  Format: ["checkbox"],
  Value: ["True"],
};
