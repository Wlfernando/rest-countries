type Img = 'png' | 'svg' | 'alt';
type Names = 'common' | 'official';

interface Currency {
  name: string;
  symbol: string;
}

interface Country {
  borders: string[];
  capital: string[];
  currencies: {[key: string]: Currency};
  flags: Record<Img, string>;
  name: Record<Names, string>;
  tld: string[];
  region: string;
  subregion: string;
  languages: {[key: string]: string};
  population: number;
}

export type Countries = Country[];
