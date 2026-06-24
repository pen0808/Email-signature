export default function PreviewPanel({ iframeRef, onCopyRich, onCopyHtml, toast }) {
  return (
    <section className="preview-panel">
      <div className="preview-toolbar">
        <div className="toolbar-info">
          <i data-lucide="eye"></i>
          <span>Real-Time Preview</span>
        </div>
        <div className="toolbar-actions">
          <button className="btn-primary" onClick={onCopyRich}>
            <i data-lucide="copy"></i> Copy Rich Format
          </button>
          <button className="btn-secondary" onClick={onCopyHtml}>
            <i data-lucide="code"></i> Copy HTML
          </button>
        </div>
      </div>

      <div className="iframe-wrapper">
        <iframe ref={iframeRef} title="Signature Preview" className="preview-iframe" />
      </div>

      {toast.show && (
        <div className={`toast-notification ${toast.type === 'danger' ? 'toast-error' : ''}`}>
          <i data-lucide={toast.type === 'danger' ? 'alert-circle' : 'check-circle'}></i>
          <span>{toast.message}</span>
        </div>
      )}
    </section>
  )
}
