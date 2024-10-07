import './Button.css'

export default function Button({
  children,
  className,
  modClass = '',
  type = 'button',
  onClick = () => {},
}:{
  children?: React.ReactNode;
  className?: string;
  modClass?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const mod = modClass ? ` button_${modClass}` : '';
  const newClass = !!className ? ' ' + className : '';

  return (
    <>
      <button 
        className={`button${mod}${newClass}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}
