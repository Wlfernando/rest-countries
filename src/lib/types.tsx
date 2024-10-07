type Img = 'png' | 'svg' | 'alt';
type Names = 'common' | 'official';

interface Currency {
  name: string;
  symbol: string;
}

interface Country {
  name: Record<Names, string> & {nativeName: {[key: string]: {common: string, official: string}}};
  population: number;
  region: string;
  capital: string[];
  flags: Record<Img, string>;
}

export interface ExtendedCountry extends Country {
  borders: string[];
  currencies: {[key: string]: Currency};
  tld: string[];
  subregion: string;
  languages: {[key: string]: string};
}

export type Countries = Country[];
