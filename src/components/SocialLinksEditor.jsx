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

const platformPlaceholders = {
  linkedin: 'linkedin.com/in/username',
  twitter: 'x.com/username',
  github: 'github.com/username',
  facebook: 'facebook.com/username',
  instagram: 'instagram.com/username',
  youtube: 'youtube.com/c/channelname',
  website: 'https://your-website.com',
  custom: 'https://your-link.com/...',
}

export default function SocialLinksEditor({ links, onChange, onRemove, onAdd }) {
  return (
    <div className="social-links-editor">
      {links.map(link => (
        <div className="social-link-row" key={link.id}>
          <div className="social-link-platform">
            <select value={link.platform} onChange={e => onChange(link.id, 'platform', e.target.value)}>
              {platformOptions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="social-link-input">
            <input type="text" value={link.value} placeholder={platformPlaceholders[link.platform] || 'https://...'} onChange={e => onChange(link.id, 'value', e.target.value)} />
          </div>
          {link.platform === 'custom' || link.platform === 'website' ? (
            <div className="social-link-label">
              <input type="text" value={link.label} placeholder={link.platform === 'website' ? 'Website' : 'Custom'} onChange={e => onChange(link.id, 'label', e.target.value)} />
            </div>
          ) : null}
          <div className="social-link-actions">
            <button className="btn-icon btn-remove" title="Remove" aria-label="Remove social link" onClick={() => onRemove(link.id)}>
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
