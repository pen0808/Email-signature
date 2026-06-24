import { useState, useEffect, useCallback, useRef } from 'react'
import Header from './components/Header'
import EditorPanel from './components/EditorPanel'
import PreviewPanel from './components/PreviewPanel'
import GuideModal from './components/GuideModal'

const PLACEHOLDER = {
  linkedin: 'linkedin.com/in/username',
  twitter: 'twitter.com/username',
  github: 'github.com/username',
  facebook: 'facebook.com/username',
  instagram: 'instagram.com/username',
  youtube: 'youtube.com/c/channelname',
  website: 'www.company.com',
}

function getBorderRadius(shape) {
  if (shape === 'round') return '50%'
  if (shape === 'rounded') return '8px'
  return '0px'
}

function getImageContainerStyle(w) {
  return `vertical-align: top; width: ${w}px; max-width: 100%;`
}

function getResponsiveImageStyle(w, r) {
  return `border-radius: ${r}; display: block; width: ${w}px; max-width: 100%; height: ${w}px; object-fit: cover; object-position: center; border: 0; outline: none; text-decoration: none;`
}

export default function App() {
  const [name, setName] = useState('Alexander Wright')
  const [jobTitle, setJobTitle] = useState('Principal Software Architect')
  const [department, setDepartment] = useState('Engineering & Innovation')
  const [company, setCompany] = useState('Pen Technology Group')
  const [email, setEmail] = useState('a.wright@pengroup.com')
  const [phone, setPhone] = useState('+1 (555) 019-2834')
  const [mobile, setMobile] = useState('+1 (555) 019-5829')
  const [website, setWebsite] = useState('www.pengroup.com')
  const [address, setAddress] = useState('100 Pine St, Suite 2400, San Francisco, CA')

  const [imageType, setImageType] = useState('avatar')
  const [imageSource, setImageSource] = useState('preset')
  const [customImageUrl, setCustomImageUrl] = useState('')

  const [currentTemplate, setCurrentTemplate] = useState('classic')
  const [activeAccentColor, setActiveAccentColor] = useState('#2563eb')
  const [activeSecondaryColor, setActiveSecondaryColor] = useState('#4b5563')
  const [font, setFont] = useState('Arial, Helvetica, sans-serif')
  const [fontSizeScale, setFontSizeScale] = useState('medium')
  const [avatarShape, setAvatarShape] = useState('round')
  const [imgWidth, setImgWidth] = useState(100)

  const [toggleDisclaimer, setToggleDisclaimer] = useState(true)
  const [disclaimerText, setDisclaimerText] = useState('IMPORTANT: The contents of this email message and any attachments are intended solely for the addressee(s) and may contain confidential and/or privileged information. If you are not the intended recipient, please notice sender and delete immediately.')

  const [fieldVisibility, setFieldVisibility] = useState({ phone: true, mobile: true, email: true, website: true, address: true })
  const [personalFieldVisibility, setPersonalFieldVisibility] = useState({ department: true, company: true })

  const [socialLinks, setSocialLinks] = useState([
    { platform: 'linkedin', value: 'linkedin.com/in/alexander-wright', label: '' },
    { platform: 'twitter', value: 'twitter.com/alexwright', label: '' },
    { platform: 'github', value: 'github.com/alexwright', label: '' },
  ])

  const [activeTab, setActiveTab] = useState('tab-content')
  const [guideModalOpen, setGuideModalOpen] = useState(false)
  const [activeGuideTab, setActiveGuideTab] = useState('guide-gmail')

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const toastTimer = useRef(null)

  const iframeRef = useRef(null)

  const showToast = useCallback((message, type = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ show: true, message, type })
    toastTimer.current = setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500)
  }, [])

  function getOrigin() {
    if (typeof window !== 'undefined') return window.location.origin
    return ''
  }

  function getSelectedImageUrl() {
    if (imageType === 'none') return ''
    if (imageSource === 'custom') return customImageUrl.trim() || 'https://via.placeholder.com/150'
    const o = getOrigin()
    return imageType === 'avatar' ? `${o}/avatar.png` : `${o}/logo.png`
  }

  function getImageAlt() {
    return imageType === 'avatar' ? `${name || 'Contact'} photo` : 'Company logo'
  }

  const buildSignatureMarkup = useCallback(() => {
    const safeName = name || 'Alexander Wright'
    const safeJobTitle = jobTitle || 'Principal Software Architect'
    const safeDepartment = department || 'Engineering & Innovation'
    const safeCompany = company || 'Pen Technology Group'

    const imgUrl = getSelectedImageUrl()
    const borderRadius = getBorderRadius(avatarShape)
    const displayImage = imageType !== 'none'
    const w = parseInt(imgWidth) || 100

    let sizeName = 15, sizeSub = 13, sizeDetails = 12, sizeDisclaimer = 10
    if (fontSizeScale === 'small') { sizeName = 13; sizeSub = 11; sizeDetails = 11; sizeDisclaimer = 9 }
    else if (fontSizeScale === 'large') { sizeName = 18; sizeSub = 14; sizeDetails = 13; sizeDisclaimer = 11 }

    let detailsList = []
    if (phone && fieldVisibility.phone) detailsList.push(`<span style="color:${activeAccentColor};font-weight:bold;">T:</span> <span style="color:${activeSecondaryColor};">${phone}</span>`)
    if (mobile && fieldVisibility.mobile) detailsList.push(`<span style="color:${activeAccentColor};font-weight:bold;">M:</span> <span style="color:${activeSecondaryColor};">${mobile}</span>`)
    if (email && fieldVisibility.email) detailsList.push(`<span style="color:${activeAccentColor};font-weight:bold;">E:</span> <a href="mailto:${email}" style="color:${activeSecondaryColor};text-decoration:none;">${email}</a>`)
    if (website && fieldVisibility.website) { const cu = website.startsWith('http') ? website : `https://${website}`; detailsList.push(`<span style="color:${activeAccentColor};font-weight:bold;">W:</span> <a href="${cu}" target="_blank" style="color:${activeSecondaryColor};text-decoration:none;">${website}</a>`) }
    if (address && fieldVisibility.address) detailsList.push(`<span style="color:${activeAccentColor};font-weight:bold;">A:</span> <span style="color:${activeSecondaryColor};">${address}</span>`)

    let socialIcons = []
    const baseIconStyle = 'display:inline-block;margin-right:10px;font-size:11px;text-decoration:none;font-weight:bold;'
    socialLinks.forEach(link => {
      if (link.value && link.value.trim()) {
        const val = link.value.trim()
        const url = val.startsWith('http') ? val : `https://${val}`
        let label = ''
        if (link.platform === 'custom' || link.platform === 'website') label = (link.label && link.label.trim()) || (link.platform === 'website' ? 'Website' : 'Link')
        else label = link.platform.charAt(0).toUpperCase() + link.platform.slice(1)
        socialIcons.push(`<a href="${url}" target="_blank" style="${baseIconStyle}color:${activeAccentColor};">${label}</a>`)
      }
    })
    const socialsHtml = socialIcons.length > 0 ? socialIcons.join('<span style="color:#e2e8f0;margin-right:10px;">|</span>') : ''

    const showDept = safeDepartment && personalFieldVisibility.department
    const showComp = safeCompany && personalFieldVisibility.company
    const deptSep = (safeJobTitle && showDept) ? ' | ' : ''
    const companyBlock = showComp ? `<div style="font-size:${sizeSub}px;color:#555555;margin-top:1px;font-weight:500;font-family:${font};">${safeCompany}</div>` : ''
    const titleBlock = (safeJobTitle || showDept) ? `<div style="font-size:${sizeSub}px;color:${activeAccentColor};margin-top:2px;font-weight:600;font-family:${font};">${safeJobTitle}${showDept ? deptSep + safeDepartment : ''}</div>` : ''

    let detailsHtml = detailsList.length > 0 ? detailsList.join(' <span style="color:#cbd5e1;margin:0 4px;">&bull;</span> ') : ''

    let disclaimerHtml = ''
    if (toggleDisclaimer && disclaimerText.trim()) {
      disclaimerHtml = `<table cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;width:100%;border-top:1px solid #e2e8f0;padding-top:8px;"><tr><td style="font-size:${sizeDisclaimer}px;line-height:1.4;color:#94a3b8;font-style:italic;font-family:${font};text-align:justify;">${disclaimerText.trim()}</td></tr></table>`
    }

    const imgTag = `<img src="${imgUrl}" width="${w}" alt="${getImageAlt()}" style="${getResponsiveImageStyle(w, borderRadius)}" />`
    const imgTd = `<td style="padding-right:18px;${getImageContainerStyle(w)}">${imgTag}</td>`

    if (currentTemplate === 'classic') {
      return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};color:#333333;line-height:1.4;max-width:600px;text-align:left;background-color:#ffffff;"><tr><td style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0"><tr>${displayImage ? imgTd + '<td style="width:2px;border-left:2px solid ' + activeAccentColor + ';font-size:1px;line-height:1px;padding:0;" aria-hidden="true">&nbsp;</td>' : ''}<td style="vertical-align:top;padding-left:${displayImage ? '18px' : '0px'};"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="vertical-align:top;font-family:${font};"><div style="font-size:${sizeName}px;font-weight:bold;color:#1e293b;line-height:1.2;font-family:${font};">${safeName}</div>${titleBlock}${companyBlock}</td></tr>${detailsHtml ? '<tr><td style="padding-top:10px;font-size:' + sizeDetails + 'px;color:' + activeSecondaryColor + ';font-family:' + font + ';line-height:1.5;">' + detailsHtml + '</td></tr>' : ''}${socialsHtml ? '<tr><td style="padding-top:10px;font-family:' + font + ';">' + socialsHtml + '</td></tr>' : ''}</table></td></tr></table></td></tr><tr><td style="vertical-align:top;">${disclaimerHtml}</td></tr></table>`
    }

    if (currentTemplate === 'minimalist') {
      return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};color:#333333;line-height:1.4;max-width:600px;text-align:left;background-color:#ffffff;"><tr><td style="vertical-align:top;font-family:${font};"><div style="font-size:${sizeName}px;font-weight:bold;color:#1e293b;line-height:1.2;font-family:${font};">${safeName}</div>${titleBlock}${companyBlock}<table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:10px 0;"><tr><td style="border-top:1px solid #e2e8f0;font-size:1px;line-height:1px;height:1px;">&nbsp;</td></tr></table>${detailsHtml ? '<div style="font-size:' + sizeDetails + 'px;color:' + activeSecondaryColor + ';line-height:1.5;font-family:' + font + ';">' + detailsHtml + '</div>' : ''}${socialsHtml ? '<div style="margin-top:10px;font-family:' + font + ';">' + socialsHtml + '</div>' : ''}</td></tr><tr><td style="vertical-align:top;">${disclaimerHtml}</td></tr></table>`
    }

    if (currentTemplate === 'modern') {
      let vd = ''
      if (phone && fieldVisibility.phone) vd += `<div style="margin-bottom:2px;"><strong style="color:${activeAccentColor};">Phone:</strong> ${phone}</div>`
      if (mobile && fieldVisibility.mobile) vd += `<div style="margin-bottom:2px;"><strong style="color:${activeAccentColor};">Cell:</strong> ${mobile}</div>`
      if (email && fieldVisibility.email) vd += `<div style="margin-bottom:2px;"><strong style="color:${activeAccentColor};">Email:</strong> <a href="mailto:${email}" style="color:${activeSecondaryColor};text-decoration:none;">${email}</a></div>`
      if (website && fieldVisibility.website) { const cu = website.startsWith('http') ? website : `https://${website}`; vd += `<div style="margin-bottom:2px;"><strong style="color:${activeAccentColor};">Web:</strong> <a href="${cu}" target="_blank" style="color:${activeSecondaryColor};text-decoration:none;">${website}</a></div>` }
      if (address && fieldVisibility.address) vd += `<div style="margin-bottom:2px;"><strong style="color:${activeAccentColor};">Office:</strong> ${address}</div>`
      return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};color:#333333;line-height:1.4;max-width:600px;text-align:left;background-color:#ffffff;"><tr><td style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0" style="width:100%;"><tr>${displayImage ? imgTd : ''}<td style="vertical-align:middle;"><div style="font-size:${sizeName}px;font-weight:800;color:#1e293b;line-height:1.1;letter-spacing:-0.01em;font-family:${font};">${safeName}</div>${titleBlock}${companyBlock}</td></tr></table><table cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;width:100%;"><tr><td style="font-size:${sizeDetails}px;color:${activeSecondaryColor};font-family:${font};line-height:1.5;">${vd}</td></tr></table>${socialsHtml ? '<table cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;"><tr><td style="font-family:' + font + ';font-size:' + sizeDetails + 'px;">' + socialsHtml + '</td></tr></table>' : ''}</td></tr><tr><td style="vertical-align:top;">${disclaimerHtml}</td></tr></table>`
    }

    if (currentTemplate === 'ribbon') {
      return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${font};color:#333333;line-height:1.4;max-width:600px;text-align:left;background-color:#ffffff;"><tr><td style="vertical-align:top;width:4px;background-color:${activeAccentColor};font-size:1px;line-height:1px;border-radius:2px;" aria-hidden="true">&nbsp;</td><td style="width:16px;font-size:1px;line-height:1px;" aria-hidden="true">&nbsp;</td><td style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0"><tr>${displayImage ? imgTd : ''}<td style="vertical-align:top;"><table cellpadding="0" cellspacing="0" border="0"><tr><td style="vertical-align:top;font-family:${font};"><div style="font-size:${sizeName}px;font-weight:bold;color:#1e293b;line-height:1.2;font-family:${font};">${safeName}</div>${titleBlock}${showComp ? '<div style="font-size:' + sizeSub + 'px;color:' + activeAccentColor + ';margin-top:1px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;font-family:' + font + ';">' + safeCompany + '</div>' : ''}</td></tr>${detailsHtml ? '<tr><td style="padding-top:10px;font-size:' + sizeDetails + 'px;color:' + activeSecondaryColor + ';font-family:' + font + ';line-height:1.5;">' + detailsHtml + '</td></tr>' : ''}${socialsHtml ? '<tr><td style="padding-top:10px;font-family:' + font + ';">' + socialsHtml + '</td></tr>' : ''}</table></td></tr></table></td></tr><tr><td style="vertical-align:top;" colspan="3">${disclaimerHtml}</td></tr></table>`
    }
    return ''
  }, [name, jobTitle, department, company, email, phone, mobile, website, address, imageType, imageSource, customImageUrl, currentTemplate, activeAccentColor, activeSecondaryColor, font, fontSizeScale, avatarShape, imgWidth, toggleDisclaimer, disclaimerText, fieldVisibility, personalFieldVisibility, socialLinks])

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return
    const rendered = buildSignatureMarkup()
    const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow.document
    doc.open()
    doc.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{margin:0;padding:10px;background-color:#ffffff;display:flex;align-items:center;justify-content:flex-start;min-height:100vh;box-sizing:border-box;}</style></head><body>${rendered}</body></html>`)
    doc.close()
  }, [buildSignatureMarkup])

  useEffect(() => { updatePreview() }, [updatePreview])
  useEffect(() => { try { lucide.createIcons() } catch {} })

  function copySignatureToClipboard() {
    const rawHtml = buildSignatureMarkup()
    if (navigator.clipboard && window.ClipboardItem) {
      const blobHtml = new Blob([rawHtml], { type: 'text/html' })
      const blobText = new Blob([rawHtml], { type: 'text/plain' })
      navigator.clipboard.write([new window.ClipboardItem({ 'text/html': blobHtml, 'text/plain': blobText })]).then(() => showToast('Signature copied as Rich Text! Ready to paste.')).catch(() => fallbackCopyRichText(rawHtml))
    } else fallbackCopyRichText(rawHtml)
  }

  function fallbackCopyRichText(htmlString) {
    const tempDiv = document.createElement('div')
    tempDiv.style.position = 'absolute'; tempDiv.style.left = '-9999px'; tempDiv.style.background = 'white'
    tempDiv.innerHTML = htmlString; document.body.appendChild(tempDiv)
    const range = document.createRange(); range.selectNodeContents(tempDiv)
    const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range)
    try { document.execCommand('copy') ? showToast('Signature copied as Rich Text (Fallback)! Ready to paste.') : showToast('Copying failed, please copy the raw HTML code.', 'danger') }
    catch { showToast('Unable to copy. Please copy the raw HTML code.', 'danger') }
    selection.removeAllRanges(); document.body.removeChild(tempDiv)
  }

  function copyHtmlCodeToClipboard() {
    const rawHtml = buildSignatureMarkup()
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(rawHtml).then(() => showToast('Raw HTML source code copied!')).catch(() => fallbackCopyText(rawHtml))
    else fallbackCopyText(rawHtml)
  }

  function fallbackCopyText(text) {
    const ta = document.createElement('textarea')
    ta.value = text; ta.style.position = 'absolute'; ta.style.left = '-9999px'; document.body.appendChild(ta); ta.select()
    try { document.execCommand('copy') ? showToast('Raw HTML source code copied!') : showToast('Copying failed.', 'danger') }
    catch { showToast('Unable to copy text.', 'danger') }
    document.body.removeChild(ta)
  }

  function handleSocialChange(index, field, value) {
    setSocialLinks(prev => {
      const next = [...prev]
      next[index] = { ...next[index], [field]: value }
      if ((field === 'platform') && (value === 'custom' || value === 'website') && !next[index].label) {
        next[index].label = value === 'website' ? 'Website' : 'Custom'
      }
      return next
    })
  }

  function removeSocialLink(index) {
    setSocialLinks(prev => prev.filter((_, i) => i !== index))
  }

  function addSocialLink() {
    setSocialLinks(prev => [...prev, { platform: 'linkedin', value: '', label: '' }])
  }

  function toggleField(field) {
    setFieldVisibility(prev => ({ ...prev, [field]: !prev[field] }))
  }

  function togglePersonalField(field) {
    setPersonalFieldVisibility(prev => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="app-container">
      <Header onGuideClick={() => setGuideModalOpen(true)} />

      <main className="app-main">
        <section className="editor-panel">
          <div className="tab-navigation">
            {['tab-content', 'tab-templates', 'tab-design'].map(tab => (
              <button key={tab} className={`tab-btn${activeTab === tab ? ' active' : ''}`} onClick={() => setActiveTab(tab)} data-tab={tab}>
                <i data-lucide={tab === 'tab-content' ? 'user-cog' : tab === 'tab-templates' ? 'layout' : 'palette'}></i>
                <span>{tab === 'tab-content' ? 'Content' : tab === 'tab-templates' ? 'Templates' : 'Design'}</span>
              </button>
            ))}
          </div>

          <div className="tab-content-container" style={{ display: activeTab === 'tab-content' ? 'block' : 'none' }}>
            <div className="tab-pane active" id="tab-content">
              <EditorPanel
                {...{ name, setName, jobTitle, setJobTitle, department, setDepartment, company, setCompany,
                  email, setEmail, phone, setPhone, mobile, setMobile, website, setWebsite, address, setAddress,
                  imageType, setImageType, imageSource, setImageSource, customImageUrl, setCustomImageUrl,
                  socialLinks, handleSocialChange, removeSocialLink, addSocialLink, fieldVisibility, toggleField,
                  personalFieldVisibility, togglePersonalField, activeTab }} />
            </div>
          </div>

          <div className="tab-content-container" style={{ display: activeTab === 'tab-templates' ? 'block' : 'none' }}>
            <div className="tab-pane active" id="tab-templates">
              <div className="form-section">
                <h3 className="section-title"><i data-lucide="layout"></i> Select Layout Template</h3>
                <p className="section-desc">Choose a pre-designed template.</p>
                <div className="templates-grid">
                  {[
                    { id: 'classic', name: 'Classic Executive', desc: 'Left image with a vertical color divider and neat text blocks. Best for formal corporate use.' },
                    { id: 'minimalist', name: 'Minimalist Clean', desc: 'Single column structure without images, clean layout spacing. Super safe & highly readable.' },
                    { id: 'modern', name: 'Modern Badge', desc: 'Clean double column with accent title banner style. Ideal for tech, startup, or design agencies.' },
                    { id: 'ribbon', name: 'Left Accent Ribbon', desc: 'A thick colored left accent border running the height of the signature. Bold and modern.' },
                  ].map(t => (
                    <div key={t.id} className={`template-card${currentTemplate === t.id ? ' active' : ''}`} onClick={() => setCurrentTemplate(t.id)} data-template={t.id}>
                      <div className="template-card-preview">
                        <div className={`dummy-layout ${t.id}-dummy`}>
                          {t.id === 'classic' ? <><div className="dummy-circle"></div><div className="dummy-line-group"><div className="dummy-line accent-line-w"></div><div className="dummy-line text-line-w"></div><div className="dummy-line info-line-w"></div></div></> : null}
                          {t.id === 'minimalist' ? <div className="dummy-line-group full-width"><div className="dummy-line accent-line-w"></div><div className="dummy-line text-line-w"></div><div className="dummy-divider"></div><div className="dummy-line info-line-w"></div></div> : null}
                          {t.id === 'modern' ? <><div className="dummy-circle"></div><div className="dummy-line-group"><div className="dummy-badge"></div><div className="dummy-line text-line-w"></div><div className="dummy-line info-line-w"></div></div></> : null}
                          {t.id === 'ribbon' ? <><div className="dummy-vertical-ribbon"></div><div className="dummy-circle small"></div><div className="dummy-line-group"><div className="dummy-line text-line-w"></div><div className="dummy-line info-line-w"></div></div></> : null}
                        </div>
                      </div>
                      <div className="template-card-info">
                        <h4>{t.name}</h4>
                        <p>{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="tab-content-container" style={{ display: activeTab === 'tab-design' ? 'block' : 'none' }}>
            <div className="tab-pane active" id="tab-design">
              {/* Theme Colors */}
              <div className="form-section">
                <h3 className="section-title"><i data-lucide="palette"></i> Design Theme Colors</h3>
                <p className="section-desc">Customize colors for your signature layout icons and text elements.</p>
                <div className="color-presets-wrapper">
                  <label>Presets</label>
                  <div className="color-presets">
                    {['#2563eb','#059669','#dc2626','#7c3aed','#0ea5e9','#e11d48','#4b5563'].map(c => (
                      <button key={c} className={`color-preset-btn${activeAccentColor === c ? ' active' : ''}`} style={{ backgroundColor: c }} title={c} onClick={() => setActiveAccentColor(c)}></button>
                    ))}
                  </div>
                </div>
                <div className="form-grid" style={{marginTop:'15px'}}>
                  <div className="form-group color-picker-group">
                    <label>Custom Accent Color</label>
                    <div className="color-input-wrapper">
                      <input type="color" value={activeAccentColor} onChange={e => setActiveAccentColor(e.target.value)} />
                      <input type="text" value={activeAccentColor} placeholder="#2563eb" onChange={e => /^#[0-9A-F]{6}$/i.test(e.target.value) && setActiveAccentColor(e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group color-picker-group">
                    <label>Secondary Text Color</label>
                    <div className="color-input-wrapper">
                      <input type="color" value={activeSecondaryColor} onChange={e => setActiveSecondaryColor(e.target.value)} />
                      <input type="text" value={activeSecondaryColor} placeholder="#4b5563" onChange={e => /^#[0-9A-F]{6}$/i.test(e.target.value) && setActiveSecondaryColor(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="form-section">
                <h3 className="section-title"><i data-lucide="type"></i> Typography & Sizing</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Font Family</label>
                    <select value={font} onChange={e => setFont(e.target.value)}>
                      <option value="Arial, Helvetica, sans-serif">Arial (Standard Web-Safe)</option>
                      <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI / Tahoma</option>
                      <option value="Georgia, serif">Georgia (Editorial)</option>
                      <option value="'Trebuchet MS', Helvetica, sans-serif">Trebuchet MS (Modern Serif)</option>
                      <option value="'Courier New', Courier, monospace">Courier New (Monospace)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Font Size Scale</label>
                    <select value={fontSizeScale} onChange={e => setFontSizeScale(e.target.value)}>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Avatar Picture Shape</label>
                    <select value={avatarShape} onChange={e => setAvatarShape(e.target.value)}>
                      <option value="round">Circular (Round)</option>
                      <option value="rounded">Soft Rounded Corners</option>
                      <option value="square">Sharp Square</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Image Width (px)</label>
                    <input type="number" value={imgWidth} min="60" max="200" step="5" onChange={e => setImgWidth(parseInt(e.target.value) || 100)} />
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="form-section">
                <h3 className="section-title"><i data-lucide="shield-alert"></i> Disclaimer & Footers</h3>
                <div className="form-grid">
                  <div className="form-group full-width toggle-group">
                    <div className="toggle-control">
                      <input type="checkbox" id="toggle-disclaimer" checked={toggleDisclaimer} onChange={e => setToggleDisclaimer(e.target.checked)} />
                      <label htmlFor="toggle-disclaimer">Include Legal Disclaimer</label>
                    </div>
                  </div>
                  {toggleDisclaimer && <div className="form-group full-width">
                    <label>Disclaimer Text</label>
                    <textarea rows="3" value={disclaimerText} onChange={e => setDisclaimerText(e.target.value)}></textarea>
                  </div>}
                </div>
              </div>
            </div>
          </div>

        </section>

        <PreviewPanel
          iframeRef={iframeRef}
          onCopyRich={copySignatureToClipboard}
          onCopyHtml={copyHtmlCodeToClipboard}
          toast={toast} />
      </main>

      <GuideModal open={guideModalOpen} onClose={() => setGuideModalOpen(false)} activeTab={activeGuideTab} onTabChange={setActiveGuideTab} />
    </div>
  )
}
