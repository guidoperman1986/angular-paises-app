// To parse this data:
//
//   import { Convert } from "./file";
//
//   const rESTCountriesResponse = Convert.toRESTCountriesResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Country {
    name:         Name;
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    currencies:   Currencies;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    string;
    languages:    Languages;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders:      string[];
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    gini:         Gini;
    fifa:         string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  string;
    capitalInfo:  CapitalInfo;
    postalCode:   PostalCode;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  string;
}

export interface CoatOfArms {
    png: string;
    svg: string;
}

export interface Currencies {
    ARS: Ars;
}

export interface Ars {
    name:   string;
    symbol: string;
}

export interface Demonyms {
    eng: Eng;
    fra: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Gini {
    "2019": number;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Languages {
    grn: string;
    spa: string;
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

export interface NativeName {
    grn: Translation;
    spa: Translation;
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}


export interface Error {
    status: number,
    message: string
}

export interface Currency {
    code:   string;
    name:   string;
    symbol: string;
}

export interface Flags {
    svg: string;
    png: string;
}

export interface Language {
    iso639_1:   string;
    iso639_2:   string;
    name:       string;
    nativeName: string;
}

export interface RegionalBloc {
    acronym:       string;
    name:          string;
    otherAcronyms: string[];
    otherNames:    string[];
}

export interface Translations {
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    hu: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toRESTCountriesResponse(json: string): Country[] {
        return cast(JSON.parse(json), a(r("RESTCountriesResponse")));
    }

    public static rESTCountriesResponseToJson(value: Country[]): string {
        return JSON.stringify(uncast(value, a(r("RESTCountriesResponse"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
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
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
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
    "RESTCountriesResponse": o([
        { json: "name", js: "name", typ: "" },
        { json: "topLevelDomain", js: "topLevelDomain", typ: a("") },
        { json: "alpha2Code", js: "alpha2Code", typ: "" },
        { json: "alpha3Code", js: "alpha3Code", typ: "" },
        { json: "callingCodes", js: "callingCodes", typ: a("") },
        { json: "capital", js: "capital", typ: "" },
        { json: "altSpellings", js: "altSpellings", typ: a("") },
        { json: "subregion", js: "subregion", typ: "" },
        { json: "region", js: "region", typ: "" },
        { json: "population", js: "population", typ: 0 },
        { json: "latlng", js: "latlng", typ: a(0) },
        { json: "demonym", js: "demonym", typ: "" },
        { json: "area", js: "area", typ: 0 },
        { json: "gini", js: "gini", typ: 3.14 },
        { json: "timezones", js: "timezones", typ: a("") },
        { json: "borders", js: "borders", typ: a("") },
        { json: "nativeName", js: "nativeName", typ: "" },
        { json: "numericCode", js: "numericCode", typ: "" },
        { json: "flags", js: "flags", typ: r("Flags") },
        { json: "currencies", js: "currencies", typ: a(r("Currency")) },
        { json: "languages", js: "languages", typ: a(r("Language")) },
        { json: "translations", js: "translations", typ: r("Translations") },
        { json: "flag", js: "flag", typ: "" },
        { json: "regionalBlocs", js: "regionalBlocs", typ: a(r("RegionalBloc")) },
        { json: "cioc", js: "cioc", typ: "" },
        { json: "independent", js: "independent", typ: true },
    ], false),
    "Currency": o([
        { json: "code", js: "code", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "symbol", js: "symbol", typ: "" },
    ], false),
    "Flags": o([
        { json: "svg", js: "svg", typ: "" },
        { json: "png", js: "png", typ: "" },
    ], false),
    "Language": o([
        { json: "iso639_1", js: "iso639_1", typ: "" },
        { json: "iso639_2", js: "iso639_2", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "nativeName", js: "nativeName", typ: "" },
    ], false),
    "RegionalBloc": o([
        { json: "acronym", js: "acronym", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "otherAcronyms", js: "otherAcronyms", typ: a("") },
        { json: "otherNames", js: "otherNames", typ: a("") },
    ], false),
    "Translations": o([
        { json: "br", js: "br", typ: "" },
        { json: "pt", js: "pt", typ: "" },
        { json: "nl", js: "nl", typ: "" },
        { json: "hr", js: "hr", typ: "" },
        { json: "fa", js: "fa", typ: "" },
        { json: "de", js: "de", typ: "" },
        { json: "es", js: "es", typ: "" },
        { json: "fr", js: "fr", typ: "" },
        { json: "ja", js: "ja", typ: "" },
        { json: "it", js: "it", typ: "" },
        { json: "hu", js: "hu", typ: "" },
    ], false),
};
