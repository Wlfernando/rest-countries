import './Button.css'

export default function Button({
  children,
  className,
  type = 'button',
  onClick = () => {},
}:{
  children?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <>
      <button 
        className={`button${!!className ? ' ' + className : ''}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  )
}
