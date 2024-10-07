import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../Header/Header";

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration getKey={(location) => location.key} />
      <Header />
      <Outlet />
      <footer style={{padding: 2}}>
        <p style={{textAlign:"center"}}>
          Challenge by <a href="https://www.frontendmentor.io/">Frontendmentor</a>. &copy; 2024. Fernando A. Malfavón.
        </p>
      </footer>
    </>
  )
}
