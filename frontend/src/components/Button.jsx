import { Link } from 'react-router-dom'

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  ...props
}) {
  const classes = `button button--${variant} ${className}`.trim()
  const content = <>{children}</>

  if (to) {
    return <Link className={classes} to={to} {...props}>{content}</Link>
  }

  if (href) {
    return <a className={classes} href={href} {...props}>{content}</a>
  }

  return <button className={classes} {...props}>{content}</button>
}
