type Img = 'png' | 'alt';
type Names = 'common' | 'official';
type Capitals = {
  attributes: Record<"administrative" | "constitutional" | "executive" | "judicial" | "legislative" | "primary", boolean>;
  coordinates: Record<"lat" | "lng", number>;
  name: string;
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
  name: {nativeName: {[key: string]: {common: string, official: string}}};
  borders: string[];
  currencies: {[key: string]: Currency};
  tlds: string[];
  subregion: string;
  languages: string[];
  flags: Record<'svg' | 'alt', string>;
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
