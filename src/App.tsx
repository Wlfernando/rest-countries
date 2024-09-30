import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import RootLayout from './Components/RootLayout/RootLayout'

const router = createBrowserRouter([{
  path: '/',
  element: <RootLayout />,
}])

export default function App() {
  return <RouterProvider router={router} />
}
