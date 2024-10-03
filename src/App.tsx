import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './Components/RootLayout/RootLayout'
import CountryList from './Components/CountryList/CountryList'
import { getCountries } from './lib/api'

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
  children: [{
    index: true,
    element: <CountryList />,
    loader: getCountries,
  }],
}])

export default function App() {
  return <RouterProvider router={router} />
}
