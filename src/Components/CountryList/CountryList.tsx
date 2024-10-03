import { Form, useLoaderData } from "react-router-dom";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Select from "../Select/Select";
import './CountryList.css'
import './ListCard.css'
import { setCommas } from "../../lib/utils";
import { Countries } from "../../lib/types";

export default function CountryList() {
  const countries = useLoaderData() as Countries

  return (
    <>
      <main className="countries">
        <search role="search" className="country-search">
          <Form >
            <fieldset className="search-field">
              <Button type='submit'><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>
              <input type="text" name="country" placeholder="Search for a country..."/>
            </fieldset>
            <Select className="region" leyend='Filter by Region' options={['Africa', 'America', 'Asia', 'Europe', 'Oceania']}/>
          </Form>
        </search>
        <ul className="country-list">
          {countries.map(({name: { common }, population, region, capital, flags: {png, alt}}) => <li key={common}>
            <article className="card">
              <img src={png} alt={alt} />
              <h3>{common}</h3>
              <p>Population: <span>{setCommas(population)}</span></p>
              <p>Region: <span>{region}</span></p>
              <p>Capital: <span>{capital}</span></p>
            </article>
          </li>)}
        </ul>
      </main>
    </>
  )
}
