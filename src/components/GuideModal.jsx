const guides = [
  {
    id: 'guide-gmail',
    name: 'Gmail',
    icon: 'mail',
    steps: [
      { title: 'Step 1: Copy Your Signature', desc: 'Click the "Copy Rich Format" button in the preview panel above to copy your signature to your clipboard. (Or "Copy HTML" in step 6.)' },
      { title: 'Step 2: Open Gmail Settings', desc: 'Click the gear icon in the top right corner of Gmail and select "See all settings".' },
      { title: 'Step 3: Navigate to Signature', desc: 'Go to the "General" tab and scroll down to the "Signature" section.' },
      { title: 'Step 4: Create New Signature', desc: 'Click "Create new" and give it a name like "Work Signature".' },
      { title: 'Step 5: Paste the Signature', desc: 'In the signature editor field, paste the copied content (Ctrl+V / Cmd+V). The formatted signature will appear.' },
      { title: 'Step 6: Save Changes', desc: 'Scroll down to the bottom and click "Save Changes". Now when composing a new email, select your signature from the dropdown.' },
      { title: 'If Formatting Breaks', desc: 'Alternatively, paste the raw HTML code in Gmail\'s "Insert HTML" feature (via "Insert" > "HTML" in some versions) or use browser extensions like "Signature Hider" or "GT".' },
    ],
  },
  {
    id: 'guide-outlook',
    name: 'Outlook (Web)',
    icon: 'mail',
    steps: [
      { title: 'Step 1: Copy Your Signature', desc: 'Click the "Copy Rich Format" button above.' },
      { title: 'Step 2: Open Outlook Settings', desc: 'Click the gear icon and select "View all Outlook settings" at the bottom.' },
      { title: 'Step 3: Navigate to Email Signature', desc: 'Select "Mail" > "Compose and reply".' },
      { title: 'Step 4: Create New Signature', desc: 'Under "Email signature", type a name for your signature.' },
      { title: 'Step 5: Paste Your Signature', desc: 'Click in the editor and paste (Ctrl+V / Cmd+V).' },
      { title: 'Step 6: Save Settings', desc: 'Click "Save" at the top. Make sure to select your new signature for "New messages" and "Replies/forwards".' },
    ],
  },
  {
    id: 'guide-outlook-desktop',
    name: 'Outlook (Desktop)',
    icon: 'mail',
    steps: [
      { title: 'Step 1: Copy Your Signature', desc: 'Click the "Copy Rich Format" button above.' },
      { title: 'Step 2: Open Outlook Options', desc: 'Go to "File" > "Options" > "Mail" > "Signatures..."' },
      { title: 'Step 3: Paste Your Signature', desc: 'In the signature editor, paste (Ctrl+V) your copied signature.' },
      { title: 'Step 4: Assign Defaults', desc: 'Choose which account to use this signature with, and select it for "New messages" and "Replies/forwards".' },
      { title: 'Step 5: Apply & Close', desc: 'Click "OK" to apply and close the dialog.' },
    ],
  },
  {
    id: 'guide-apple',
    name: 'Apple Mail',
    icon: 'mail',
    steps: [
      { title: 'Step 1: Copy Raw HTML', desc: 'Click "Copy HTML" above to copy the raw source code.' },
      { title: 'Step 2: Open Mail Preferences', desc: 'Open Apple Mail, go to "Mail" > "Preferences" > "Signatures".' },
      { title: 'Step 3: Add New Signature', desc: 'Select your email account, click "+" to create a new signature, and name it.' },
      { title: 'Step 4: Paste HTML into Editor', desc: 'Unfortunately, Apple Mail does not support direct HTML paste in signatures. Use a tool like "Signature Paste" app (free) or manually set it via the "edit as HTML" plugin.' },
      { title: 'Alternative Method', desc: 'Use an app like "MailSignature" for Mac or "Signature" for iOS to manage HTML signatures easily.' },
    ],
  },
  {
    id: 'guide-yahoo',
    name: 'Yahoo Mail',
    icon: 'mail',
    steps: [
      { title: 'Step 1: Copy Your Signature', desc: 'Click the "Copy Rich Format" button above.' },
      { title: 'Step 2: Open Yahoo Settings', desc: 'Click the gear icon and select "More Settings".' },
      { title: 'Step 3: Navigate to Signature', desc: 'Go to "Writing email" > "Signature".' },
      { title: 'Step 4: Paste Your Signature', desc: 'Paste the copied content into the signature field.' },
      { title: 'Step 5: Save Settings', desc: 'Click "Save" and exit settings.' },
    ],
  },
  {
    id: 'guide-general',
    name: 'General Tips',
    icon: 'info',
    steps: [
      { title: 'Use Inline Styles', desc: 'Our generator uses inline styles so it works across all clients.' },
      { title: 'Keep it Simple', desc: 'Avoid complex layouts. Table-based designs render most consistently.' },
      { title: 'Test Before Sending', desc: 'Always send a test email to yourself first to verify rendering.' },
      { title: 'Image Hosting', desc: 'For images to display, they must be hosted online. Our avatar/logo use relative URLs - upload them to your server or use an image hosting service.' },
      { title: 'Copy as HTML Only', desc: 'If rich paste fails, use "Copy HTML" and paste the source code directly using your email client\'s "Insert HTML" feature.' },
      { title: 'Width Limitations', desc: 'Keep your signature under 600px wide for best compatibility across mobile and desktop.' },
    ],
  },
]

export default function GuideModal({ open, onClose, activeTab, onTabChange }) {
  if (!open) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container guide-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2><i data-lucide="book-open"></i> Installation Guide</h2>
          <button className="modal-close" onClick={onClose}><i data-lucide="x"></i></button>
        </div>
        <div className="modal-body">
          <div className="guide-tabs">
            {guides.map(g => (
              <button key={g.id}
                className={`guide-tab${activeTab === g.id ? ' active' : ''}`}
                onClick={() => onTabChange(g.id)}>
                <i data-lucide={g.icon}></i>
                <span>{g.name}</span>
              </button>
            ))}
          </div>
          <div className="guide-content">
            {guides.filter(g => g.id === activeTab).map(g => (
              <div key={g.id}>
                <h3>{g.name} Instructions</h3>
                <div className="guide-steps">
                  {g.steps.map((step, i) => (
                    <div className="guide-step" key={i}>
                      <div className="step-number">{i + 1}</div>
                      <div className="step-content">
                        <h4>{step.title}</h4>
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
