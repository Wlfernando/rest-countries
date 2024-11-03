import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './Components/RootLayout/RootLayout'
import CountryList from './Components/CountryList/CountryList'
import { getCountries, getTheCountry } from './lib/api'
import DisplayCountry from './Components/DisplayCountry/DisplayCountry'
import ErrorBoundary from './Components/Error/Error'

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  children: [{
    loader: getCountries,
    errorElement: <ErrorBoundary />,
    shouldRevalidate: ({ nextUrl }) => nextUrl.pathname === '/',
    index: true,
    element: <CountryList />,
  },{
    path: ':name',
    loader: getTheCountry,
    errorElement: <ErrorBoundary />,
    element: <DisplayCountry />
  }],
}])

export default function App() {
  return <RouterProvider router={router} />
}
