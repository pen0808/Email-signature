import SocialLinksEditor from './SocialLinksEditor'

export default function EditorPanel({
  name, setName, jobTitle, setJobTitle, department, setDepartment, company, setCompany,
  email, setEmail, phone, setPhone, mobile, setMobile, website, setWebsite, address, setAddress,
  imageType, setImageType, imageSource, setImageSource, customImageUrl, setCustomImageUrl,
  socialLinks, handleSocialChange, removeSocialLink, addSocialLink, fieldVisibility, toggleField,
  personalFieldVisibility, togglePersonalField,
}) {
  const visibilityFields = [
    { key: 'phone', label: 'Phone Number', icon: 'phone' },
    { key: 'mobile', label: 'Mobile Number', icon: 'smartphone' },
    { key: 'email', label: 'Email Address', icon: 'mail' },
    { key: 'website', label: 'Website URL', icon: 'globe' },
    { key: 'address', label: 'Office Address', icon: 'map-pin' },
  ]

  const personalVisFields = [
    { key: 'department', label: 'Department/Team' },
    { key: 'company', label: 'Company Name' },
  ]

  return (
    <>
      {/* Personal Info */}
      <div className="form-section">
        <h3 className="section-title"><i data-lucide="user"></i> Personal Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name <span className="required">*</span></label>
            <input type="text" value={name} placeholder="Alexander Wright" onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Job Title <span className="required">*</span></label>
            <input type="text" value={jobTitle} placeholder="Principal Software Architect" onChange={e => setJobTitle(e.target.value)} />
          </div>
        </div>
        <div className="form-grid">
          {personalVisFields.map(f => (
            <div className="form-group" key={f.key}>
              <label>{f.label}</label>
              <div className="input-toggle-group">
                <input type="text" value={f.key === 'department' ? department : company}
                  placeholder={f.key === 'department' ? 'Engineering & Innovation' : 'Pen Technology Group'}
                  onChange={e => f.key === 'department' ? setDepartment(e.target.value) : setCompany(e.target.value)} />
                <div className="toggle-field-wrapper">
                  <input type="checkbox" id={`toggle-${f.key}`} className="toggle-checkbox"
                    checked={personalFieldVisibility[f.key]}
                    onChange={() => togglePersonalField(f.key)} />
                  <label htmlFor={`toggle-${f.key}`} className="toggle-switch-btn"></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Details */}
      <div className="form-section">
        <h3 className="section-title"><i data-lucide="contact"></i> Contact Details</h3>
        {visibilityFields.map(f => (
          <div className="form-group full-width" key={f.key}>
            <label><i data-lucide={f.icon}></i> {f.label}</label>
            <div className="input-toggle-group">
              <input type="text" value={
                f.key === 'phone' ? phone : f.key === 'mobile' ? mobile : f.key === 'email' ? email : f.key === 'website' ? website : address
              }
                placeholder={
                  f.key === 'phone' ? '+1 (555) 019-2834' : f.key === 'mobile' ? '+1 (555) 019-5829' : f.key === 'email' ? 'a.wright@pengroup.com' : f.key === 'website' ? 'www.pengroup.com' : '100 Pine St, Suite 2400, San Francisco, CA'
                }
                onChange={e => {
                  const v = e.target.value
                  f.key === 'phone' ? setPhone(v) : f.key === 'mobile' ? setMobile(v) : f.key === 'email' ? setEmail(v) : f.key === 'website' ? setWebsite(v) : setAddress(v)
                }} />
              <div className="toggle-field-wrapper">
                <input type="checkbox" id={`toggle-${f.key}`} className="toggle-checkbox"
                  checked={fieldVisibility[f.key]}
                  onChange={() => toggleField(f.key)} />
                <label htmlFor={`toggle-${f.key}`} className="toggle-switch-btn"></label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Settings */}
      <div className="form-section">
        <h3 className="section-title"><i data-lucide="image"></i> Signature Image</h3>
        <p className="section-desc">Choose an image to display in your signature.</p>
        <div className="form-grid">
          <div className="form-group">
            <label>Display Image</label>
            <select value={imageType} onChange={e => setImageType(e.target.value)}>
              <option value="avatar">Profile Photo (Avatar)</option>
              <option value="logo">Company Logo</option>
              <option value="none">No Image</option>
            </select>
          </div>
          {imageType !== 'none' && (
            <div className="form-group">
              <label>Image Source</label>
              <select value={imageSource} onChange={e => setImageSource(e.target.value)}>
                <option value="preset">Preset Image</option>
                <option value="custom">Custom URL</option>
              </select>
            </div>
          )}
          {imageType !== 'none' && imageSource === 'custom' && (
            <div className="form-group full-width">
              <label>Image URL</label>
              <input type="text" value={customImageUrl} placeholder="https://example.com/photo.jpg" onChange={e => setCustomImageUrl(e.target.value)} />
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="form-section">
        <h3 className="section-title"><i data-lucide="share-2"></i> Social Links <span className="badge-optional">Optional</span></h3>
        <p className="section-desc">Add links to your professional profiles.</p>
        <SocialLinksEditor links={socialLinks} onChange={handleSocialChange} onRemove={removeSocialLink} onAdd={addSocialLink} />
      </div>
    </>
  )
}
