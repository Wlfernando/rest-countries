import { useEffect, useRef, useState } from "react";
import './Select.css'

export default function Select({
  options,
  leyend,
  className = '',
}:{
  options: string[];
  leyend: string;
  className?: string;
}) {
  const [inert, setInert] = useState(true);
  const [radio, setRadio] = useState(leyend);
  const listRef = useRef<null | HTMLUListElement>(null);
  const indexRef = useRef(-1);

  useEffect(() => {
    if (inert) {
      listRef.current!.setAttribute('inert', '')
      return
    } else listRef.current!.removeAttribute('inert')

    const children = listRef.current!.children
    const length = children.length - 1
    const focus = (index: number) => (children[index].firstElementChild as HTMLElement)!.focus()

    const listen = (e: KeyboardEvent) => {
      const { key } = e
      const arrowUp = key === 'ArrowUp'
      const arrowDown = key === 'ArrowDown'
      const home = key === 'Home'
      const end = key === 'End'
      const escape = key === 'Escape'

      if (arrowUp || arrowDown || home || end) e.preventDefault()
      else if (escape) {
        indexRef.current = -1
        setInert(true)
        return
      }

      if (arrowUp && indexRef.current > 0) {
        focus(--indexRef.current)
        return
      } else if (arrowUp) return

      if (arrowDown && indexRef.current < length) {
        focus(++indexRef.current)
        return
      } else if (arrowDown) return

      if (home) {
        focus(indexRef.current = 0)
        return
      }

      if (end) {
        focus(indexRef.current = length)
        return
      }
    }

    window.addEventListener('keydown', listen);
    return () => {
      window.removeEventListener('keydown', listen);
    }
  }, [inert])

  useEffect(() => {
    if (radio !== leyend) listRef.current!.closest('form')?.requestSubmit()
  }, [radio])

  function handleSelect(input: string) {
    setRadio(input)
    setInert(!inert)
  }

  return (
    <>
      <fieldset 
        className={`select${className && ` ${className}`}`} 
        role="menu" 
        aria-roledescription="select"
      >
        <div 
          className="label" 
          onClick={() => setInert(!inert)} 
          tabIndex={0} 
          onKeyDown={({ key }) => {if (key === 'Enter') setInert(!inert)}}
        >
          <span className="leyend">{radio}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/>
          </svg>
        </div>
        <ul role="radiogroup" ref={listRef}>
          {options.map((o, i) => {
            const isChecked = o === radio

            return <li key={i} >
            <label
              tabIndex={0}
              onKeyDown={({ key }) => {
                if (key !== 'Enter') return
                handleSelect(o)
              }}
              onFocus={() => {
                indexRef.current = i
              }}
            >
              <input 
                type="radio"
                name="region"
                value={o.toLowerCase()}
                onChange={() => {
                  handleSelect(o)
                }}
                tabIndex={-1}
                checked={isChecked}
              />
              <span>{o}</span>
            </label>
          </li>})}
        </ul>
      </fieldset>
    </>
  )
}