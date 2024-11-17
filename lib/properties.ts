// To parse this data:
//
//   import { Convert, Properties } from "./file";
//
//   const properties = Convert.toProperties(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Properties {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustive: Exhaustive;
  query: string;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: ProcessingTimingsMS;
  serverTimeMS: number;
}

export interface Exhaustive {
  nbHits: boolean;
}

export interface Hit {
  id: number;
  ownerID: number;
  userExternalID: string;
  sourceID: number;
  state: State;
  _geoloc: Geo;
  geography: Geo;
  purpose: Purpose;
  price: number;
  product: HitProduct;
  productLabel: ProductLabel;
  productScore: number;
  rentFrequency: null;
  referenceNumber: string;
  permitNumber: null | string;
  projectNumber: null;
  title: string;
  title_l1: string;
  title_l2: string;
  externalID: string;
  slug: string;
  slug_l1: string;
  slug_l2: string;
  location: Category[];
  category: Category[];
  createdAt: number;
  updatedAt: number;
  reactivatedAt: number;
  rooms: number;
  baths: number;
  area: number;
  score: number;
  score_l1: number;
  score_l2: number;
  coverPhoto: CoverPhoto;
  coverVideo: CoverVideo;
  photoCount: number;
  videoCount: number;
  panoramaCount: number;
  phoneNumber: PhoneNumber;
  contactName: string;
  agency: HitAgency;
  hash: string;
  keywords: string[];
  isVerified: boolean;
  verification: Verification;
  verifiedScore: number;
  completionStatus: CompletionStatus;
  randBoostScore: number;
  randBoostScore_l1: number;
  randBoostScore_l2: number;
  floorPlanID: number;
  furnishingStatus: FurnishingStatus | null;
  type: HitType;
  ownerAgent: OwnerAgent;
  cityLevelScore: number;
  indyScore: number;
  indyScore_l1: number;
  indyScore_l2: number;
  hasMatchingFloorPlans: boolean;
  photoIDs: number[];
  hidePrice: boolean;
  locationPurposeTier: number;
  objectID: string;
  _highlightResult: HighlightResult;
}

export interface Geo {
  lat: number;
  lng: number;
}

export interface HighlightResult {
  referenceNumber: ExternalID;
  title: ExternalID;
  externalID: ExternalID;
  agency: HighlightResultAgency;
  keywords: ExternalID[];
}

export interface HighlightResultAgency {
  name: ExternalID;
}

export interface ExternalID {
  value: string;
  matchLevel: MatchLevel;
  matchedWords: any[];
}

export enum MatchLevel {
  None = "none",
}

export interface HitAgency {
  id: number;
  objectID: number;
  name: string;
  name_l1: string;
  name_l2: string;
  externalID: string;
  product: AgencyProduct;
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
  authority: Authority;
}

export enum Authority {
  Ded = "DED",
  Rera = "RERA",
}

export interface Logo {
  id: number;
  url: string;
}

export enum AgencyProduct {
  Premium = "premium",
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
  type?: CategoryType;
}

export enum CategoryType {
  CondoBuilding = "condo-building",
  Neighbourhood = "neighbourhood",
}

export enum CompletionStatus {
  Completed = "completed",
}

export interface CoverPhoto {
  id: number;
  externalID: string;
  title: null;
  orderIndex: number;
  nimaScore: number;
  url: string;
  main: boolean;
}

export interface CoverVideo {
  externalID: number;
  title: null;
  host: Host;
  url: string;
  orderIndex: number;
}

export enum Host {
  Youtube = "youtube",
}

export enum FurnishingStatus {
  Furnished = "furnished",
  Unfurnished = "unfurnished",
}

export interface OwnerAgent {
  externalID: string;
  name: string;
  name_l1: string;
  name_l2: string;
  user_image: null | string;
  user_image_id: number | null;
  isTruBroker: boolean;
}

export interface PhoneNumber {
  mobile: string;
  phone: string;
  whatsapp: string;
  phoneNumbers: string[];
  mobileNumbers: string[];
}

export enum HitProduct {
  Hot = "hot",
  Superhot = "superhot",
}

export enum ProductLabel {
  Default = "default",
}

export enum Purpose {
  ForSale = "for-sale",
}

export enum State {
  Active = "active",
}

export enum HitType {
  Property = "property",
}

export interface Verification {
  updatedAt: number;
  eligible: boolean;
  status: Status;
  verifiedAt: number | null;
}

export enum Status {
  Unverified = "unverified",
  Verified = "verified",
}

export interface ProcessingTimingsMS {
  afterFetch: AfterFetch;
  fetch: Fetch;
  request: Request;
  total: number;
}

export interface AfterFetch {
  format: Format;
  total: number;
}

export interface Format {
  total: number;
}

export interface Fetch {
  scanning: number;
  total: number;
}

export interface Request {
  roundTrip: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toProperties(json: string): Properties {
    return cast(JSON.parse(json), r("Properties"));
  }

  public static propertiesToJson(value: Properties): string {
    return JSON.stringify(uncast(value, r("Properties")), null, 2);
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
  Properties: o(
    [
      { json: "hits", js: "hits", typ: a(r("Hit")) },
      { json: "nbHits", js: "nbHits", typ: 0 },
      { json: "page", js: "page", typ: 0 },
      { json: "nbPages", js: "nbPages", typ: 0 },
      { json: "hitsPerPage", js: "hitsPerPage", typ: 0 },
      { json: "exhaustiveNbHits", js: "exhaustiveNbHits", typ: true },
      { json: "exhaustive", js: "exhaustive", typ: r("Exhaustive") },
      { json: "query", js: "query", typ: "" },
      { json: "params", js: "params", typ: "" },
      { json: "processingTimeMS", js: "processingTimeMS", typ: 0 },
      {
        json: "processingTimingsMS",
        js: "processingTimingsMS",
        typ: r("ProcessingTimingsMS"),
      },
      { json: "serverTimeMS", js: "serverTimeMS", typ: 0 },
    ],
    false
  ),
  Exhaustive: o([{ json: "nbHits", js: "nbHits", typ: true }], false),
  Hit: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "ownerID", js: "ownerID", typ: 0 },
      { json: "userExternalID", js: "userExternalID", typ: "" },
      { json: "sourceID", js: "sourceID", typ: 0 },
      { json: "state", js: "state", typ: r("State") },
      { json: "_geoloc", js: "_geoloc", typ: r("Geo") },
      { json: "geography", js: "geography", typ: r("Geo") },
      { json: "purpose", js: "purpose", typ: r("Purpose") },
      { json: "price", js: "price", typ: 0 },
      { json: "product", js: "product", typ: r("HitProduct") },
      { json: "productLabel", js: "productLabel", typ: r("ProductLabel") },
      { json: "productScore", js: "productScore", typ: 0 },
      { json: "rentFrequency", js: "rentFrequency", typ: null },
      { json: "referenceNumber", js: "referenceNumber", typ: "" },
      { json: "permitNumber", js: "permitNumber", typ: u(null, "") },
      { json: "projectNumber", js: "projectNumber", typ: null },
      { json: "title", js: "title", typ: "" },
      { json: "title_l1", js: "title_l1", typ: "" },
      { json: "title_l2", js: "title_l2", typ: "" },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "slug", js: "slug", typ: "" },
      { json: "slug_l1", js: "slug_l1", typ: "" },
      { json: "slug_l2", js: "slug_l2", typ: "" },
      { json: "location", js: "location", typ: a(r("Category")) },
      { json: "category", js: "category", typ: a(r("Category")) },
      { json: "createdAt", js: "createdAt", typ: 0 },
      { json: "updatedAt", js: "updatedAt", typ: 0 },
      { json: "reactivatedAt", js: "reactivatedAt", typ: 3.14 },
      { json: "rooms", js: "rooms", typ: 0 },
      { json: "baths", js: "baths", typ: 0 },
      { json: "area", js: "area", typ: 3.14 },
      { json: "score", js: "score", typ: 0 },
      { json: "score_l1", js: "score_l1", typ: 0 },
      { json: "score_l2", js: "score_l2", typ: 0 },
      { json: "coverPhoto", js: "coverPhoto", typ: r("CoverPhoto") },
      { json: "coverVideo", js: "coverVideo", typ: r("CoverVideo") },
      { json: "photoCount", js: "photoCount", typ: 0 },
      { json: "videoCount", js: "videoCount", typ: 0 },
      { json: "panoramaCount", js: "panoramaCount", typ: 0 },
      { json: "phoneNumber", js: "phoneNumber", typ: r("PhoneNumber") },
      { json: "contactName", js: "contactName", typ: "" },
      { json: "agency", js: "agency", typ: r("HitAgency") },
      { json: "hash", js: "hash", typ: "" },
      { json: "keywords", js: "keywords", typ: a("") },
      { json: "isVerified", js: "isVerified", typ: true },
      { json: "verification", js: "verification", typ: r("Verification") },
      { json: "verifiedScore", js: "verifiedScore", typ: 0 },
      {
        json: "completionStatus",
        js: "completionStatus",
        typ: r("CompletionStatus"),
      },
      { json: "randBoostScore", js: "randBoostScore", typ: 0 },
      { json: "randBoostScore_l1", js: "randBoostScore_l1", typ: 0 },
      { json: "randBoostScore_l2", js: "randBoostScore_l2", typ: 0 },
      { json: "floorPlanID", js: "floorPlanID", typ: 0 },
      {
        json: "furnishingStatus",
        js: "furnishingStatus",
        typ: u(r("FurnishingStatus"), null),
      },
      { json: "type", js: "type", typ: r("HitType") },
      { json: "ownerAgent", js: "ownerAgent", typ: r("OwnerAgent") },
      { json: "cityLevelScore", js: "cityLevelScore", typ: 0 },
      { json: "indyScore", js: "indyScore", typ: 0 },
      { json: "indyScore_l1", js: "indyScore_l1", typ: 0 },
      { json: "indyScore_l2", js: "indyScore_l2", typ: 0 },
      { json: "hasMatchingFloorPlans", js: "hasMatchingFloorPlans", typ: true },
      { json: "photoIDs", js: "photoIDs", typ: a(0) },
      { json: "hidePrice", js: "hidePrice", typ: true },
      { json: "locationPurposeTier", js: "locationPurposeTier", typ: 0 },
      { json: "objectID", js: "objectID", typ: "" },
      {
        json: "_highlightResult",
        js: "_highlightResult",
        typ: r("HighlightResult"),
      },
    ],
    false
  ),
  Geo: o(
    [
      { json: "lat", js: "lat", typ: 3.14 },
      { json: "lng", js: "lng", typ: 3.14 },
    ],
    false
  ),
  HighlightResult: o(
    [
      { json: "referenceNumber", js: "referenceNumber", typ: r("ExternalID") },
      { json: "title", js: "title", typ: r("ExternalID") },
      { json: "externalID", js: "externalID", typ: r("ExternalID") },
      { json: "agency", js: "agency", typ: r("HighlightResultAgency") },
      { json: "keywords", js: "keywords", typ: a(r("ExternalID")) },
    ],
    false
  ),
  HighlightResultAgency: o(
    [{ json: "name", js: "name", typ: r("ExternalID") }],
    false
  ),
  ExternalID: o(
    [
      { json: "value", js: "value", typ: "" },
      { json: "matchLevel", js: "matchLevel", typ: r("MatchLevel") },
      { json: "matchedWords", js: "matchedWords", typ: a("any") },
    ],
    false
  ),
  HitAgency: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "objectID", js: "objectID", typ: 0 },
      { json: "name", js: "name", typ: "" },
      { json: "name_l1", js: "name_l1", typ: "" },
      { json: "name_l2", js: "name_l2", typ: "" },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "product", js: "product", typ: r("AgencyProduct") },
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
      { json: "authority", js: "authority", typ: r("Authority") },
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
      { json: "type", js: "type", typ: u(undefined, r("CategoryType")) },
    ],
    false
  ),
  CoverPhoto: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "externalID", js: "externalID", typ: "" },
      { json: "title", js: "title", typ: null },
      { json: "orderIndex", js: "orderIndex", typ: 0 },
      { json: "nimaScore", js: "nimaScore", typ: 3.14 },
      { json: "url", js: "url", typ: "" },
      { json: "main", js: "main", typ: true },
    ],
    false
  ),
  CoverVideo: o(
    [
      { json: "externalID", js: "externalID", typ: 0 },
      { json: "title", js: "title", typ: null },
      { json: "host", js: "host", typ: r("Host") },
      { json: "url", js: "url", typ: "" },
      { json: "orderIndex", js: "orderIndex", typ: 0 },
    ],
    false
  ),
  OwnerAgent: o(
    [
      { json: "externalID", js: "externalID", typ: "" },
      { json: "name", js: "name", typ: "" },
      { json: "name_l1", js: "name_l1", typ: "" },
      { json: "name_l2", js: "name_l2", typ: "" },
      { json: "user_image", js: "user_image", typ: u(null, "") },
      { json: "user_image_id", js: "user_image_id", typ: u(0, null) },
      { json: "isTruBroker", js: "isTruBroker", typ: true },
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
      { json: "updatedAt", js: "updatedAt", typ: 3.14 },
      { json: "eligible", js: "eligible", typ: true },
      { json: "status", js: "status", typ: r("Status") },
      { json: "verifiedAt", js: "verifiedAt", typ: u(3.14, null) },
    ],
    false
  ),
  ProcessingTimingsMS: o(
    [
      { json: "afterFetch", js: "afterFetch", typ: r("AfterFetch") },
      { json: "fetch", js: "fetch", typ: r("Fetch") },
      { json: "request", js: "request", typ: r("Request") },
      { json: "total", js: "total", typ: 0 },
    ],
    false
  ),
  AfterFetch: o(
    [
      { json: "format", js: "format", typ: r("Format") },
      { json: "total", js: "total", typ: 0 },
    ],
    false
  ),
  Format: o([{ json: "total", js: "total", typ: 0 }], false),
  Fetch: o(
    [
      { json: "scanning", js: "scanning", typ: 0 },
      { json: "total", js: "total", typ: 0 },
    ],
    false
  ),
  Request: o([{ json: "roundTrip", js: "roundTrip", typ: 0 }], false),
  MatchLevel: ["none"],
  Authority: ["DED", "RERA"],
  AgencyProduct: ["premium"],
  CategoryType: ["condo-building", "neighbourhood"],
  CompletionStatus: ["completed"],
  Host: ["youtube"],
  FurnishingStatus: ["furnished", "unfurnished"],
  HitProduct: ["hot", "superhot"],
  ProductLabel: ["default"],
  Purpose: ["for-sale"],
  State: ["active"],
  HitType: ["property"],
  Status: ["unverified", "verified"],
};
