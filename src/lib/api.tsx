import { Params } from "react-router-dom"
import { Countries, ExtendedCountry } from "./types"

const BASE_URL = 'https://restcountries.com/v3.1/'
const fields = '?fields=name'
const fieldsOfCards = fields + ',flags,population,region,capital'
const extendedFields = fieldsOfCards + ',currencies,subregion,tld,currencies,languages,borders&fullText=true'

function confirm(res: Response) {
  if (res.ok) return res.json()
  return Promise.reject(`Error: ${res.status}`)
}

function getOne(params: string) {
  return fetch(BASE_URL + params + extendedFields)
    .then(confirm)
    .then(res => res[0])
}

function get(params: string) {
  return fetch(BASE_URL + params + fieldsOfCards)
    .then(confirm)
}

function getByAlpha(code: string) {
  return fetch(BASE_URL + `alpha${fields}&codes=${code}` )
    .then(confirm)
}

const firstCountries = ['germany', 'united states of america', 'brazil', 'iceland', 'afghanistan', 'Åland Islands', 'albania', 'algeria']
  .map((country) => get(`name/${country}`))

export async function getCountries({request}: {request: Request}): Promise<Countries> {
  const { searchParams: search } = new URL(request.url)

  if(!search.has('country')) return await Promise.all(firstCountries).then((res) => res.flat())

  const country = search.get('country')

  if(search.has('region')) {
    const region: Countries = await get(`region/${search.get('region')}`)

    if(country) return region.filter(({name: {common}}) => common.includes(country))

    return region
  }

  if(!country) return await get('all')

  return await get(`name/${country}`)
}

export async function getTheCountry({ params }: { params: Params<'name'> }) {
  const country: ExtendedCountry = await getOne(`name/${params.name!}`)
  const { borders: bor } = country
  const borders = bor.length ? await getByAlpha(bor.join(',')) : []

  return { country, borders }
}
