const platformOptions = [
  { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
  { value: 'twitter', label: 'Twitter / X', icon: 'twitter' },
  { value: 'github', label: 'GitHub', icon: 'github' },
  { value: 'facebook', label: 'Facebook', icon: 'facebook' },
  { value: 'instagram', label: 'Instagram', icon: 'instagram' },
  { value: 'youtube', label: 'YouTube', icon: 'youtube' },
  { value: 'website', label: 'Website', icon: 'globe' },
  { value: 'custom', label: 'Custom Link', icon: 'link' },
]

export default function SocialLinksEditor({ links, onChange, onRemove, onAdd }) {
  return (
    <div className="social-links-editor">
      {links.map((link, index) => (
        <div className="social-link-row" key={index}>
          <div className="social-link-platform">
            <select value={link.platform} onChange={e => onChange(index, 'platform', e.target.value)}>
              {platformOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="social-link-input">
            <input type="text" value={link.value} placeholder={
              link.platform === 'custom' ? 'https://your-link.com/...' : link.platform === 'website' ? 'https://your-website.com' : platformOptions.find(p => p.value === link.platform)?.label?.toLowerCase() + '.com/username'
            } onChange={e => onChange(index, 'value', e.target.value)} />
          </div>
          {link.platform === 'custom' || link.platform === 'website' ? (
            <div className="social-link-label">
              <input type="text" value={link.label} placeholder={link.platform === 'website' ? 'Website' : 'Custom'} onChange={e => onChange(index, 'label', e.target.value)} />
            </div>
          ) : null}
          <div className="social-link-actions">
            <button className="btn-icon btn-remove" title="Remove" onClick={() => onRemove(index)}>
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      ))}
      <button className="btn-add-link" onClick={onAdd}>
        <i data-lucide="plus-circle"></i> Add Link
      </button>
    </div>
  )
}
