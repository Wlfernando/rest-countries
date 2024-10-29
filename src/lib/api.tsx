import { Params } from "react-router-dom"
import { Countries, ExtendedCountry } from "./types"

const BASE_URL = 'https://restcountries.com/v3.1/'
const fields = '?fields=name'
const shortFields = fields + ',flags,population,region,capital'
const extendedFields = shortFields + ',currencies,subregion,tld,currencies,languages,borders&fullText=true'

function confirm(res: Response) {
  if (res.ok) return res.json()
  return Promise.reject(`Error: ${res.status}`)
}

function getDetailedCountry(params: string): Promise<ExtendedCountry> {
  return fetch(BASE_URL + params + extendedFields)
    .then(confirm)
    .then(res => res[0])
}

function getSummarizedCountries(params: string): Promise<Countries> {
  return fetch(BASE_URL + params + shortFields)
    .then(confirm)
}

function getCountryNameByAlpha(code: string) {
  return fetch(BASE_URL + `alpha${fields}&codes=${code}` )
    .then(confirm)
}

const defaultCountries = ['germany', 'united states of america', 'brazil', 'iceland', 'afghanistan', 'Åland Islands', 'albania', 'algeria']
  .map((country) => getSummarizedCountries(`name/${country}`))

export async function getCountries({request}: {request: Request}): Promise<Countries> {
  const { searchParams: search } = new URL(request.url)

  if(!search.has('country')) return await Promise.all(defaultCountries).then((res) => res.flat())

  const country = search.get('country')

  if(search.has('region')) {
    const region = await getSummarizedCountries(`region/${search.get('region')}`)

    if(country) return region.filter(({name: {common}}) => common.includes(country))

    return region
  }

  if(!country) return await getSummarizedCountries('all')

  return await getSummarizedCountries(`name/${country}`)
}

export async function getTheCountry({ params }: { params: Params<'name'> }) {
  const country = await getDetailedCountry(`name/${params.name!}`)
  const { borders: bor } = country
  const borders = bor.length ? await getCountryNameByAlpha(bor.join(',')) : []

  return { country, borders }
}
