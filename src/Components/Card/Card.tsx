import { Link, unstable_useViewTransitionState } from "react-router-dom"
import { Country } from "../../lib/types"
import { setCommas } from "../../lib/utils"
import './ListCard.css'

export default function Card(
  {name: { common, official },
  population,
  region,
  capital,
  flags: {png, alt}
}: Country) {
  const to = `/${official.replace(/\s/g, '%20')}`
  const isTransitioning = unstable_useViewTransitionState(to)

  return (
    <li>
      <article className="card">
        <Link to={to} unstable_viewTransition >
          <img src={png} alt={alt} style={{viewTransitionName: isTransitioning ? 'flag' : ''}} />
        </Link>
        <h3>{common}</h3>
        <p>Population: <span>{setCommas(population)}</span></p>
        <p>Region: <span>{region}</span></p>
        <p>Capital: <span>{capital}</span></p>
      </article>
    </li>
  )
}
