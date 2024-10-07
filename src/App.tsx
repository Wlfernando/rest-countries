import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './Components/RootLayout/RootLayout'
import CountryList from './Components/CountryList/CountryList'
import { getCountries, getTheCountry } from './lib/api'
import DisplayCountry from './Components/DisplayCountry/DisplayCountry'

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  children: [{
    loader: getCountries,
    shouldRevalidate: ({ nextUrl }) => nextUrl.pathname === '/',
    index: true,
    element: <CountryList />,
  },{
    path: ':name',
    loader: getTheCountry,
    element: <DisplayCountry />
  }],
}])

export default function App() {
  return <RouterProvider router={router} />
}
