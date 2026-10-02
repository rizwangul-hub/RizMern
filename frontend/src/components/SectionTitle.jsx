export default function SectionTitle({ eyebrow, title, description, align = 'center', id, as = 'h2' }) {
  const Heading = as === 'h1' ? 'h1' : 'h2'
  return (
    <div className={`section-title section-title--${align}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading id={id}>{title}</Heading>
      {description && <p>{description}</p>}
    </div>
  )
}
