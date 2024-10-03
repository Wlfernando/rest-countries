import { Countries } from "./types"

const BASE_URL = 'https://restcountries.com/v3.1/'
const fields = '?fields=name,capital,currencies,population,region,subregion,tld,currencies,languages,borders,flags'

function get(params: string) {
  return fetch(BASE_URL + params + fields)
    .then((res) => {
      if (res.ok) return res.json()
      return Promise.reject(`Error: ${res.status}`)
    })
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
