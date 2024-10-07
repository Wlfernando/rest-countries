import { Params } from "react-router-dom"
import { Countries } from "./types"

const BASE_URL = 'https://restcountries.com/v3.1/'
const fields = '?fields=flags,name,population,region,capital'
const extendedFields = fields + ',currencies,subregion,tld,currencies,languages,borders'

function confirm(res: Response) {
  if (res.ok) return res.json()
  return Promise.reject(`Error: ${res.status}`)
}

function getOne(params: string) {
  return fetch(BASE_URL + params + extendedFields)
    .then(confirm)
}

function get(params: string) {
  return fetch(BASE_URL + params + fields)
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
  return await getOne(`name/${params.name!}`).then(res => res[0])
}
