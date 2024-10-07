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
    let index = indexRef.current

    const listen = (e: KeyboardEvent) => {
      const { key } = e
      const arrowUp = key === 'ArrowUp'
      const arrowDown = key === 'ArrowDown'

      if (arrowUp || arrowDown) e.preventDefault()

      if (arrowUp && index > 0) {
        focus(--index)
      }

      if (arrowDown && index < length) {
        focus(++index)
      }
    }

    window.addEventListener('keydown', listen);
    return () => {
      window.removeEventListener('keydown', listen);
    }
  }, [inert])

  function handleSelect(target: EventTarget & (HTMLLabelElement | HTMLInputElement), input: string) {
    setInert(!inert)
    setRadio(input)
    target.closest('form')!.requestSubmit()
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
            if(isChecked) indexRef.current = i

            return <li key={i} >
            <label tabIndex={0} onKeyDown={({ key, currentTarget }) => {
              if (key !== 'Enter') return
              handleSelect(currentTarget, o)
            }}>
              <input 
                type="radio"
                name="region"
                value={o.toLowerCase()}
                onChange={({ currentTarget }) => {
                  handleSelect(currentTarget, o)
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
