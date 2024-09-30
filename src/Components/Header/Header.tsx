import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../Button/Button'
import './Header.css'
import { faMoon as regular } from '@fortawesome/free-regular-svg-icons'
import { faMoon as solid } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [theme, setTheme] = useState<'dark' | 'light' | ''>('');
  const rootRef = useRef<null | HTMLHtmlElement>(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!window.matchMedia) return 
    const media = window.matchMedia('(prefers-color-scheme: dark)').matches
    const infered = media ? 'dark' : 'light'
    rootRef.current = document.querySelector('html') as HTMLHtmlElement
    rootRef.current!.setAttribute('data-theme', infered)
    setTheme(infered)
  }, [])

  return (
    <>
      <header className="header" >
        <h1 className='header__title' >Where in the world?</h1>
        <Button onClick={() => {
          const infered = isDark ? 'light' : 'dark'
          setTheme(infered)
          rootRef.current!.dataset.theme = infered
        }} >
          <FontAwesomeIcon icon={isDark ? solid : regular} />
          <span className='header__button-txt' >{` ${theme} mode`}</span>
        </Button>
      </header>
    </>
  )
}