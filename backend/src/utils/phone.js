function normalizePakistaniPhone(value) {
  const phone = String(value || '').trim().replace(/[\s()-]/g, '')
  if (/^03\d{9}$/.test(phone)) return `+92${phone.slice(1)}`
  if (/^\+923\d{9}$/.test(phone)) return phone
  return null
}

module.exports = { normalizePakistaniPhone }
