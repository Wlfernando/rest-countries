import { Link } from 'react-router-dom'
import earth from '../../../public/planet-earth.png'
import './Error.css'

export default function ErrorBoundary() {
  return (
    <>
      <main className='error-message'>
        <h2>Oops!</h2>
        <img src={earth} alt='planet earth with a question mark' />
        <p>It seems we don't found the country.</p>
        <p>Return to the <Link to='/' >principal page</Link>.</p>
      </main>
    </>
  )
}