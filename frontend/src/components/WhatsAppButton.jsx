import { MessageCircle } from 'lucide-react'
import { siteData } from '../data/siteData'

export default function WhatsAppButton({
  mode = 'chat',
  children,
  className = '',
  label,
}) {
  const groupMode = mode === 'group'
  const href = groupMode
    ? siteData.whatsappGroupLink
    : `${siteData.whatsappLink}${siteData.whatsappLink.includes('?') ? '&' : '?'}text=${encodeURIComponent(siteData.whatsappPrefilledMessage)}`
  const accessibleLabel = label || (groupMode ? 'Join the RizMern WhatsApp group' : 'Chat with Rizwan on WhatsApp')

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
    >
      {className.includes('whatsapp-float') && <span className="whatsapp-pulse" />}
      {children || <MessageCircle size={23} aria-hidden="true" />}
    </a>
  )
}
