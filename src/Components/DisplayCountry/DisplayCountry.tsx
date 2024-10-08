import './DisplayCountry.css';
import Button from '../Button/Button';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { ExtendedCountry } from '../../lib/types';
import { setCommas } from '../../lib/utils';

export default function DisplayCountry(){
  const {
    country: {
      flags: { svg, alt },
      name: { common, nativeName },
      tld,
      population,
      currencies,
      region,
      languages,
      subregion,
      capital,
    }, borders } = useLoaderData() as {country: ExtendedCountry, borders: Pick<ExtendedCountry, 'name'>[]}
  const navigate = useNavigate()

  return (
    <>
      <main className='display-country'>
        <Button onClick={() => navigate(-1)} modClass='nav'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/>
          </svg>
          <span> Back</span>
        </Button>
        <img src={svg} alt={alt} />
        <article>
          <h2>{common}</h2>
          <p>
            <span>Native Name: </span>
            {Object.values(nativeName)[0].common}
          </p>
          <p className='tld'>
            <span>Top Level Domain: </span>
            {tld.join(', ')}
          </p>
          <p>
            <span>Population: </span>
            {setCommas(population)}
          </p>
          <p className='currencies'>
            <span>Currencies: </span>
            {Object.values(currencies).reduce<string[]>((array, currency) => [...array, currency.name], []).join(', ')}
          </p>
          <p>
            <span>Region: </span>
            {region}
          </p>
          <p className='languages'>
            <span>Languages: </span>
            {Object.values(languages).join(', ')}
          </p>
          <p className='sub-region' >
            <span>Sub Region: </span>
            {subregion}
          </p>
          <p className='capital' >
            <span>Capital: </span>
            {capital}
          </p>
          <p className='border' >
            <span>Border countries: </span>
            {borders.map((b) => <Link key={b.name.common} to={'/' + b.name.official.replace(/\s/g, '%20')} >{b.name.common}</Link>)}
          </p>
        </article>
      </main>
    </>
  )
}
