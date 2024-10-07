import { Form, useLoaderData } from "react-router-dom";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Select from "../Select/Select";
import './CountryList.css'
import { Countries } from "../../lib/types";
import Card from "../Card/Card";

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
          {countries.map((country) => <Card key={country.name.official} {...country} />)}
        </ul>
      </main>
    </>
  )
}
