import { Params } from "react-router-dom"
import { Countries, Country, ExtendedCountry, RawApiCountry, RawApiExtendedCountry } from "./types"
import { setConjuction } from "./utils"

const BASE_URL = 'https://api.restcountries.com/countries/v5'
const queryOfficial = '?names.official='
const queryCommon = '?names.common='
const fields = 'response_fields=names.common'
const shortFields = fields + ',names.official,flag.url_png,flag.description,population,region,capitals'
const extendedFields = shortFields + ',names.native,currencies,subregion,tlds,currencies,languages,borders,codes.alpha_3'
const options = {
  headers: {
    'Authorization': import.meta.env.VITE_REST_COUNTRIES_KEY,
  }
};

function setCapital(c: RawApiCountry['capitals']) {
  return c.length > 1 ? setConjuction(c.map(({ name }) => name)) : c.length ? c[0].name : 'Null';
}

function confirm(res: Response) {
  if (res.ok) return res.json()
  return Promise.reject(`Error: ${res.status}`)
}

function tailorCountryFetched({
  names: { common, official },
  capitals,
  flag: { ['url_png']: png, description },
  region,
  population,
}: RawApiCountry): Country {

  return {
    name: { common, official },
    capital: setCapital(capitals),
    flags: {
      png,
      alt: description || `flag of ${official}`,
    },
    region,
    population,
  }
}

async function getDetailedCountry(params: string): Promise<ExtendedCountry> {
  const {
    names: {
      common,
      official,
      native,
    },
    population,
    region,
    capitals,
    flag: {
      ['url_svg']: svg,
      description,
    },
    subregion,
    borders,
    currencies,
    languages,
    tlds,
    codes: { ['alpha_3']: code },
  }: RawApiExtendedCountry = await fetch(BASE_URL + params + '&' + extendedFields.replace('flag.url_png', 'flag.url_svg'), options)
    .then(confirm)
    .then(res => res.data.objects[0]);

  return {
    name: {
      common,
      official,
      native,
    },
    population,
    region,
    capital: setCapital(capitals),
    flags: {
      svg,
      alt: description,
    },
    subregion,
    borders,
    currencies: currencies.reduce((obj, { code, name, symbol }) => ({...obj, [code]: { name, symbol }}), {}), // this allow the previous format
    languages: languages.map(({ name }) => name),
    tld: tlds,
    code,
  }
}

function getSummarizedCountries(params: string | undefined = undefined): Promise<Countries> {
  const filters = !!params ? params + '&' + shortFields : '?' + shortFields + '&limit=100';

  return fetch(BASE_URL + filters, options)
    .then(confirm)
    .then(res => res.data.objects.map(tailorCountryFetched))
}

function getCountryBorders(code: string) {
  return fetch(BASE_URL + '/borders/' + code + '?response_fields=names.common,codes.alpha_3', options)
    .then(confirm)
    .then(({ data: { objects }}) => objects.map((border: Pick<RawApiExtendedCountry, 'names' | 'codes'>) => ({ name: border.names, code: border.codes['alpha_3'] })))
}

const defaultCountries = [
  'Federal Republic of Germany',
  'United States of America',
  'Federative Republic of Brazil',
  'Iceland',
  'Islamic Republic of Afghanistan',
  'Åland Islands',
  'Republic of Albania',
  'People\'s Democratic Republic of Algeria',
]
  .map((country) => getSummarizedCountries(queryOfficial + country))

export async function getCountries({request}: {request: Request}): Promise<Countries> {
  const { searchParams: search } = new URL(request.url)

  if(!search.has('country')) 
    return await Promise.all(defaultCountries)
      .then((res) => res.flat())

  const country = search.get('country')

  if(search.has('region')) {
    const nameFilter = country ? queryCommon + country + '&' : '?';
    const region = await getSummarizedCountries(nameFilter + 'region=' + search.get('region'));

    return region
  }

  if(!country) return await getSummarizedCountries()

  return await getSummarizedCountries(queryCommon + country)
}

export async function getTheCountry({ params }: { params: Params<'name'> }) {
  const country = await getDetailedCountry(`/names.official?q=${params.name!}`)
  const { borders: bor, code } = country
  const borders = bor.length ? await getCountryBorders(code) : []

  return { country, borders }
}
