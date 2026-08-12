type Img = 'png' | 'alt';
type Names = 'common' | 'official';
type Capitals = {
  attributes: Record<"administrative" | "constitutional" | "executive" | "judicial" | "legislative" | "primary", boolean>;
  coordinates: Record<"lat" | "lng", number>;
  name: string;
}
type Native = {
  [key: string]: {
    common: string;
    official: string;
  };
}

interface Currency {
  name: string;
  symbol: string;
}

export type Country = {
  name: Record<Names, string>;
  population: number;
  region: string;
  capital: string;
  flags: Record<Img, string>;
}

export type ExtendedCountry = Omit<Country, "flags"> & {
  name: {native: {[key: string]: {common: string, official: string}}};
  borders: string[];
  currencies: {[key: string]: Currency};
  tld: string[];
  subregion: string;
  languages: string[];
  flags: Record<'svg' | 'alt', string>;
  code: string;
}

export type Countries = Country[];

export type RawApiCountry = {
  names: Record<Names, string>,
  capitals: Capitals[],
  flag: {
    ["url_png"]: string,
    description: string,
  },
  region: string,
  population: number,
};

export type RawApiExtendedCountry = Omit<RawApiCountry, 'flag'> & {
  names: {
    native: Native;
  };
  capitals: Capitals[];
  flag: {
    description: string;
    ['url_svg']: string;
  };
  subregion: string;
  borders: string[];
  currencies: Record<'code' | 'name' | 'symbol', string>[];
  languages: Record<"bcp47" | "iso639_1" | "iso639_2b" | "iso639_2t" | "iso639_3" | "name" | "native_name", string>[];
  tlds: string[];
  codes: { ['alpha_3']: string },
}
