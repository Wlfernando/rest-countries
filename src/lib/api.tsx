import { Params } from "react-router-dom"
import { Countries, Country, ExtendedCountry, RawApiCountry } from "./types"
import { setConjuction } from "./utils"

const BASE_URL = 'https://api.restcountries.com/countries/v5'
const queryOfficial = '?names.official='
const queryCommon = '?names.common='
const fields = 'response_fields=names.common'
const shortFields = fields + ',names.official,flag.url_png,flag.description,population,region,capitals'
const extendedFields = shortFields + ',currencies,subregion,tld,currencies,languages,borders&fullText=true'
const options = {
  headers: {
    'Authorization': import.meta.env.VITE_REST_COUNTRIES_KEY,
  }
};

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
    capital: capitals.length > 1 ? setConjuction(capitals.map(({ name }) => name)) : capitals.length ? capitals[0].name : 'Null',
    flags: {
      png,
      alt: description || `flag of ${official}`,
    },
    region,
    population,
  }
}

function getDetailedCountry(params: string): Promise<ExtendedCountry> {
  return fetch(BASE_URL + params + extendedFields)
    .then(confirm)
    .then(res => res[0])
}

function getSummarizedCountries(params: string | undefined = undefined): Promise<Countries> {
  const filters = !!params ? params + '&' + shortFields : '?' + shortFields + '&limit=100';

  return fetch(BASE_URL + filters, options)
    .then(confirm)
    .then(res => res.data.objects.map(tailorCountryFetched))
}

function getCountryNameByAlpha(code: string) {
  return fetch(BASE_URL + `alpha${fields}&codes=${code}` )
    .then(confirm)
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
  const country = await getDetailedCountry(`name/${params.name!}`)
  const { borders: bor } = country
  const borders = bor.length ? await getCountryNameByAlpha(bor.join(',')) : []

  return { country, borders }
}
