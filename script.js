// State & DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Lucide Icons Initialization
    lucide.createIcons();

    // Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    const guideTabButtons = document.querySelectorAll('.guide-tab-btn');
    const guidePanes = document.querySelectorAll('.guide-pane');
    
    const btnGuide = document.getElementById('btn-guide');
    const btnModalClose = document.getElementById('btn-modal-close');
    const guideModal = document.getElementById('guide-modal');
    
    const imageTypeSelect = document.getElementById('select-image-type');
    const imageSourceSelect = document.getElementById('select-image-source');
    const customImageUrlGroup = document.getElementById('custom-image-url-group');
    const customImageUrlInput = document.getElementById('input-image-url');
    
    const colorPresetBtns = document.querySelectorAll('.color-preset-btn');
    const colorPickerAccent = document.getElementById('color-picker-accent');
    const colorPickerSecondary = document.getElementById('color-picker-secondary');
    const colorPickerTextValue = document.getElementById('color-picker-text-value');
    const colorPickerSecondaryTextValue = document.getElementById('color-picker-secondary-text-value');
    
    const fontSelect = document.getElementById('select-font');
    const fontSizeSelect = document.getElementById('select-font-size');
    const avatarShapeSelect = document.getElementById('select-avatar-shape');
    const imageWidthInput = document.getElementById('select-image-width');
    
    const toggleDisclaimer = document.getElementById('toggle-disclaimer');
    const disclaimerTextGroup = document.getElementById('disclaimer-text-group');
    const textareaDisclaimer = document.getElementById('textarea-disclaimer');
    
    const templateCards = document.querySelectorAll('.template-card');
    const btnCopyRich = document.getElementById('btn-copy-rich');
    const btnCopyHtml = document.getElementById('btn-copy-html');
    
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    
    // Inputs to track
    const inputs = [
        'input-name', 'input-job-title', 'input-department', 'input-company',
        'input-email', 'input-phone', 'input-mobile', 'input-website', 'input-address'
    ];

    let currentTemplate = 'classic';
    let activeAccentColor = '#2563eb';
    let activeSecondaryColor = '#4b5563';

    // Field visibility state (all visible by default)
    let fieldVisibility = { phone: true, mobile: true, email: true, website: true, address: true };
    let personalFieldVisibility = { department: true, company: true };

    // Dynamic Social Links State
    let socialLinks = [
        { platform: 'linkedin', value: 'linkedin.com/in/alexander-wright', label: '' },
        { platform: 'twitter', value: 'twitter.com/alexwright', label: '' },
        { platform: 'github', value: 'github.com/alexwright', label: '' }
    ];

    const socialLinksContainer = document.getElementById('social-links-container');
    const btnAddSocial = document.getElementById('btn-add-social');

    // 1. Tab Navigation logic
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Modal logic
    btnGuide.addEventListener('click', () => {
        guideModal.style.display = 'flex';
    });

    btnModalClose.addEventListener('click', () => {
        guideModal.style.display = 'none';
    });

    // Close modal on background click
    guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) {
            guideModal.style.display = 'none';
        }
    });

    // Guide Modal Tabs
    guideTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            guideTabButtons.forEach(b => b.classList.remove('active'));
            guidePanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetGuide = btn.getAttribute('data-guide');
            document.getElementById(targetGuide).classList.add('active');
        });
    });

    // 2. Image source settings
    imageTypeSelect.addEventListener('change', () => {
        updatePreview();
    });

    imageSourceSelect.addEventListener('change', () => {
        if (imageSourceSelect.value === 'custom') {
            customImageUrlGroup.style.display = 'block';
        } else {
            customImageUrlGroup.style.display = 'none';
        }
        updatePreview();
    });

    customImageUrlInput.addEventListener('input', updatePreview);

    // 3. Design Color Presets & Pickers
    colorPresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorPresetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const color = btn.getAttribute('data-color');
            activeAccentColor = color;
            colorPickerAccent.value = color;
            colorPickerTextValue.value = color.toUpperCase();
            updatePreview();
        });
    });

    colorPickerAccent.addEventListener('input', (e) => {
        // Deactivate presets
        colorPresetBtns.forEach(b => b.classList.remove('active'));
        
        activeAccentColor = e.target.value;
        colorPickerTextValue.value = activeAccentColor.toUpperCase();
        updatePreview();
    });

    colorPickerTextValue.addEventListener('input', (e) => {
        const val = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            colorPresetBtns.forEach(b => b.classList.remove('active'));
            activeAccentColor = val;
            colorPickerAccent.value = val;
            updatePreview();
        }
    });

    colorPickerSecondary.addEventListener('input', (e) => {
        activeSecondaryColor = e.target.value;
        colorPickerSecondaryTextValue.value = activeSecondaryColor.toUpperCase();
        updatePreview();
    });

    colorPickerSecondaryTextValue.addEventListener('input', (e) => {
        const val = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(val)) {
            activeSecondaryColor = val;
            colorPickerSecondary.value = val;
            updatePreview();
        }
    });

    // Font family, sizes, image shape & border
    fontSelect.addEventListener('change', updatePreview);
    fontSizeSelect.addEventListener('change', updatePreview);
    avatarShapeSelect.addEventListener('change', updatePreview);
    imageWidthInput.addEventListener('input', updatePreview);

    // Disclaimer Toggle
    toggleDisclaimer.addEventListener('change', () => {
        if (toggleDisclaimer.checked) {
            disclaimerTextGroup.style.display = 'block';
        } else {
            disclaimerTextGroup.style.display = 'none';
        }
        updatePreview();
    });
    textareaDisclaimer.addEventListener('input', updatePreview);

    // 4. Template Selection cards
    templateCards.forEach(card => {
        card.addEventListener('click', () => {
            templateCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            currentTemplate = card.getAttribute('data-template');
            updatePreview();
        });
    });

    // 5. Field Visibility Toggles
    document.querySelectorAll('.field-toggle input').forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const el = e.target.closest('.field-toggle');
            const field = el.getAttribute('data-field');
            const personal = el.getAttribute('data-personal');
            if (field) {
                fieldVisibility[field] = e.target.checked;
            }
            if (personal) {
                personalFieldVisibility[personal] = e.target.checked;
            }
            updatePreview();
        });
    });

    // 6. Input Field Change Handlers
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', updatePreview);
        }
    });

    // Helper functions to get current state
    function getInputValue(id) {
        const el = document.getElementById(id);
        return el ? el.value.trim() : '';
    }

    // Convert avatar shapes to border-radii compatible with email clients
    function getBorderRadius(shape) {
        if (shape === 'round') return '50%';
        if (shape === 'rounded') return '8px';
        return '0px';
    }

    // Determine the proper image URL
    function getSelectedImageUrl() {
        const type = imageTypeSelect.value;
        if (type === 'none') return '';
        
        const source = imageSourceSelect.value;
        if (source === 'custom') {
            return customImageUrlInput.value.trim() || 'https://via.placeholder.com/150';
        }
        
        // Preset local images (avatar.png / logo.png) with cache-busting for development
        const ts = Date.now();
        return type === 'avatar' ? `avatar.png?t=${ts}` : `logo.png?t=${ts}`;
    }

    function getImageAlt() {
        const type = imageTypeSelect.value;
        const name = getInputValue('input-name') || 'Contact';
        return type === 'avatar' ? `${name} photo` : 'Company logo';
    }

    function getImageContainerStyle(imgWidth) {
        return `vertical-align: top; width: ${imgWidth}px; max-width: 100%;`;
    }

    function getResponsiveImageStyle(imgWidth, borderRadius) {
        return `border-radius: ${borderRadius}; display: block; width: ${imgWidth}px; max-width: 100%; height: ${imgWidth}px; object-fit: cover; object-position: center; border: 0; outline: none; text-decoration: none;`;
    }

    // Generate strict table-based HTML with inline styling
    function buildSignatureMarkup() {
        const name = getInputValue('input-name') || 'Alexander Wright';
        const jobTitle = getInputValue('input-job-title') || 'Principal Software Architect';
        const department = getInputValue('input-department') || 'Engineering & Innovation';
        const company = getInputValue('input-company') || 'Pen Technology Group';
        
        const email = getInputValue('input-email');
        const phone = getInputValue('input-phone');
        const mobile = getInputValue('input-mobile');
        const website = getInputValue('input-website');
        const address = getInputValue('input-address');
        
        // Dynamic social links are processed directly from the state array

        const font = fontSelect.value;
        const sizeScale = fontSizeSelect.value;
        const avatarShape = avatarShapeSelect.value;
        const imgWidth = parseInt(imageWidthInput.value) || 100;
        const displayImage = imageTypeSelect.value !== 'none';
        const imgUrl = getSelectedImageUrl();
        const borderRadius = getBorderRadius(avatarShape);

        // Adjust font sizes based on scale
        let sizeName = 15;
        let sizeSub = 13;
        let sizeDetails = 12;
        let sizeDisclaimer = 10;

        if (sizeScale === 'small') {
            sizeName = 13; sizeSub = 11; sizeDetails = 11; sizeDisclaimer = 9;
        } else if (sizeScale === 'large') {
            sizeName = 18; sizeSub = 14; sizeDetails = 13; sizeDisclaimer = 11;
        }

        // Build contact detail items (respecting field visibility)
        let detailsList = [];
        if (phone && fieldVisibility.phone) {
            detailsList.push(`<span style="color: ${activeAccentColor}; font-weight: bold;">T:</span> <span style="color: ${activeSecondaryColor};">${phone}</span>`);
        }
        if (mobile && fieldVisibility.mobile) {
            detailsList.push(`<span style="color: ${activeAccentColor}; font-weight: bold;">M:</span> <span style="color: ${activeSecondaryColor};">${mobile}</span>`);
        }
        if (email && fieldVisibility.email) {
            detailsList.push(`<span style="color: ${activeAccentColor}; font-weight: bold;">E:</span> <a href="mailto:${email}" style="color: ${activeSecondaryColor}; text-decoration: none;">${email}</a>`);
        }
        if (website && fieldVisibility.website) {
            const cleanUrl = website.startsWith('http') ? website : `https://${website}`;
            detailsList.push(`<span style="color: ${activeAccentColor}; font-weight: bold;">W:</span> <a href="${cleanUrl}" target="_blank" style="color: ${activeSecondaryColor}; text-decoration: none;">${website}</a>`);
        }
        if (address && fieldVisibility.address) {
            detailsList.push(`<span style="color: ${activeAccentColor}; font-weight: bold;">A:</span> <span style="color: ${activeSecondaryColor};">${address}</span>`);
        }

        // Build social links dynamically
        let socialIcons = [];
        const baseIconStyle = 'display: inline-block; margin-right: 10px; font-size: 11px; text-decoration: none; font-weight: bold;';
        
        socialLinks.forEach(link => {
            if (link.value && link.value.trim()) {
                const val = link.value.trim();
                const url = val.startsWith('http') ? val : `https://${val}`;
                let label = '';
                
                if (link.platform === 'custom' || link.platform === 'website') {
                    label = (link.label && link.label.trim()) || (link.platform === 'website' ? 'Website' : 'Link');
                } else {
                    // Capitalize platform name
                    label = link.platform.charAt(0).toUpperCase() + link.platform.slice(1);
                }
                
                socialIcons.push(`<a href="${url}" target="_blank" style="${baseIconStyle} color: ${activeAccentColor};">${label}</a>`);
            }
        });

        const socialsHtml = socialIcons.length > 0 ? socialIcons.join('<span style="color: #e2e8f0; margin-right: 10px;">|</span>') : '';

        // Secondary blocks (respecting personal field visibility)
        const showDept = department && personalFieldVisibility.department;
        const showCompany = company && personalFieldVisibility.company;
        const deptSeparator = (jobTitle && showDept) ? ' | ' : '';
        const companyBlock = showCompany ? `<div style="font-size: ${sizeSub}px; color: #555555; margin-top: 1px; font-weight: 500; font-family: ${font};">${company}</div>` : '';
        const titleBlock = (jobTitle || showDept) ? `<div style="font-size: ${sizeSub}px; color: ${activeAccentColor}; margin-top: 2px; font-weight: 600; font-family: ${font};">${jobTitle}${showDept ? deptSeparator + department : ''}</div>` : '';
        
        let detailsHtml = '';
        if (detailsList.length > 0) {
            detailsHtml = detailsList.join(' <span style="color: #cbd5e1; margin: 0 4px;">&bull;</span> ');
        }

        // Disclaimer block
        let disclaimerHtml = '';
        if (toggleDisclaimer.checked && textareaDisclaimer.value.trim()) {
            disclaimerHtml = `
            <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 18px; width: 100%; border-top: 1px solid #e2e8f0; padding-top: 8px;">
                <tr>
                    <td style="font-size: ${sizeDisclaimer}px; line-height: 1.4; color: #94a3b8; font-style: italic; font-family: ${font}; text-align: justify;">
                        ${textareaDisclaimer.value.trim()}
                    </td>
                </tr>
            </table>`;
        }

        // Return appropriate template layout
        if (currentTemplate === 'classic') {
            return `
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${font}; color: #333333; line-height: 1.4; max-width: 600px; text-align: left; background-color: #ffffff;">
                <tr>
                    <td style="vertical-align: top;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                ${displayImage ? `
                                <td style="padding-right: 18px; ${getImageContainerStyle(imgWidth)}">
                                    <img src="${imgUrl}" width="${imgWidth}" alt="${getImageAlt()}" style="${getResponsiveImageStyle(imgWidth, borderRadius)}" />
                                </td>
                                <td style="width: 2px; border-left: 2px solid ${activeAccentColor}; font-size: 1px; line-height: 1px; padding: 0;" aria-hidden="true">&nbsp;</td>
                                ` : ''}
                                <td style="vertical-align: top; padding-left: ${displayImage ? '18px' : '0px'};">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="vertical-align: top; font-family: ${font};">
                                                <div style="font-size: ${sizeName}px; font-weight: bold; color: #1e293b; line-height: 1.2; font-family: ${font};">${name}</div>
                                                ${titleBlock}
                                                ${companyBlock}
                                            </td>
                                        </tr>
                                        ${detailsHtml ? `
                                        <tr>
                                            <td style="padding-top: 10px; font-size: ${sizeDetails}px; color: ${activeSecondaryColor}; font-family: ${font}; line-height: 1.5;">
                                                ${detailsHtml}
                                            </td>
                                        </tr>
                                        ` : ''}
                                        ${socialsHtml ? `
                                        <tr>
                                            <td style="padding-top: 10px; font-family: ${font};">
                                                ${socialsHtml}
                                            </td>
                                        </tr>
                                        ` : ''}
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top;">
                        ${disclaimerHtml}
                    </td>
                </tr>
            </table>`;
        }

        if (currentTemplate === 'minimalist') {
            return `
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${font}; color: #333333; line-height: 1.4; max-width: 600px; text-align: left; background-color: #ffffff;">
                <tr>
                    <td style="vertical-align: top; font-family: ${font};">
                        <div style="font-size: ${sizeName}px; font-weight: bold; color: #1e293b; line-height: 1.2; font-family: ${font};">${name}</div>
                        ${titleBlock}
                        ${companyBlock}
                        
                        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin: 10px 0;">
                            <tr>
                                <td style="border-top: 1px solid #e2e8f0; font-size: 1px; line-height: 1px; height: 1px;">&nbsp;</td>
                            </tr>
                        </table>
                        
                        ${detailsHtml ? `
                        <div style="font-size: ${sizeDetails}px; color: ${activeSecondaryColor}; line-height: 1.5; font-family: ${font};">
                            ${detailsHtml}
                        </div>
                        ` : ''}
                        
                        ${socialsHtml ? `
                        <div style="margin-top: 10px; font-family: ${font};">
                            ${socialsHtml}
                        </div>
                        ` : ''}
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top;">
                        ${disclaimerHtml}
                    </td>
                </tr>
            </table>`;
        }

        if (currentTemplate === 'modern') {
            // Re-format details for vertical listing in modern card style
            let verticalDetails = '';
            if (phone && fieldVisibility.phone) verticalDetails += `<div style="margin-bottom: 2px;"><strong style="color: ${activeAccentColor};">Phone:</strong> ${phone}</div>`;
            if (mobile && fieldVisibility.mobile) verticalDetails += `<div style="margin-bottom: 2px;"><strong style="color: ${activeAccentColor};">Cell:</strong> ${mobile}</div>`;
            if (email && fieldVisibility.email) verticalDetails += `<div style="margin-bottom: 2px;"><strong style="color: ${activeAccentColor};">Email:</strong> <a href="mailto:${email}" style="color: ${activeSecondaryColor}; text-decoration: none;">${email}</a></div>`;
            if (website && fieldVisibility.website) {
                const cleanUrl = website.startsWith('http') ? website : `https://${website}`;
                verticalDetails += `<div style="margin-bottom: 2px;"><strong style="color: ${activeAccentColor};">Web:</strong> <a href="${cleanUrl}" target="_blank" style="color: ${activeSecondaryColor}; text-decoration: none;">${website}</a></div>`;
            }
            if (address && fieldVisibility.address) verticalDetails += `<div style="margin-bottom: 2px;"><strong style="color: ${activeAccentColor};">Office:</strong> ${address}</div>`;

            return `
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${font}; color: #333333; line-height: 1.4; max-width: 600px; text-align: left; background-color: #ffffff;">
                <tr>
                    <td style="vertical-align: top;">
                        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                            <tr>
                                ${displayImage ? `
                                <td style="padding-right: 18px; ${getImageContainerStyle(imgWidth)}">
                                    <img src="${imgUrl}" width="${imgWidth}" alt="${getImageAlt()}" style="${getResponsiveImageStyle(imgWidth, borderRadius)}" />
                                </td>
                                ` : ''}
                                <td style="vertical-align: middle;">
                                    <div style="font-size: ${sizeName}px; font-weight: 800; color: #1e293b; line-height: 1.1; letter-spacing: -0.01em; font-family: ${font};">${name}</div>
                                    ${titleBlock}
                                    ${companyBlock}
                                </td>
                            </tr>
                        </table>
                        
                        <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px; width: 100%;">
                            <tr>
                                <td style="font-size: ${sizeDetails}px; color: ${activeSecondaryColor}; font-family: ${font}; line-height: 1.5;">
                                    ${verticalDetails}
                                </td>
                            </tr>
                        </table>
                        
                        ${socialsHtml ? `
                        <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px;">
                            <tr>
                                <td style="font-family: ${font}; font-size: ${sizeDetails}px;">
                                    ${socialsHtml}
                                </td>
                            </tr>
                        </table>
                        ` : ''}
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top;">
                        ${disclaimerHtml}
                    </td>
                </tr>
            </table>`;
        }

        if (currentTemplate === 'ribbon') {
            return `
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${font}; color: #333333; line-height: 1.4; max-width: 600px; text-align: left; background-color: #ffffff;">
                <tr>
                    <td style="vertical-align: top; width: 4px; background-color: ${activeAccentColor}; font-size: 1px; line-height: 1px; border-radius: 2px;" aria-hidden="true">&nbsp;</td>
                    <td style="width: 16px; font-size: 1px; line-height: 1px;" aria-hidden="true">&nbsp;</td>
                    <td style="vertical-align: top;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                ${displayImage ? `
                                <td style="padding-right: 18px; ${getImageContainerStyle(imgWidth)}">
                                    <img src="${imgUrl}" width="${imgWidth}" alt="${getImageAlt()}" style="${getResponsiveImageStyle(imgWidth, borderRadius)}" />
                                </td>
                                ` : ''}
                                <td style="vertical-align: top;">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="vertical-align: top; font-family: ${font};">
                                                <div style="font-size: ${sizeName}px; font-weight: bold; color: #1e293b; line-height: 1.2; font-family: ${font};">${name}</div>
                                                ${titleBlock}
                                                ${showCompany ? `<div style="font-size: ${sizeSub}px; color: ${activeAccentColor}; margin-top: 1px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-family: ${font};">${company}</div>` : ''}
                                            </td>
                                        </tr>
                                        ${detailsHtml ? `
                                        <tr>
                                            <td style="padding-top: 10px; font-size: ${sizeDetails}px; color: ${activeSecondaryColor}; font-family: ${font}; line-height: 1.5;">
                                                ${detailsHtml}
                                            </td>
                                        </tr>
                                        ` : ''}
                                        ${socialsHtml ? `
                                        <tr>
                                            <td style="padding-top: 10px; font-family: ${font};">
                                                ${socialsHtml}
                                            </td>
                                        </tr>
                                        ` : ''}
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top;" colspan="3">
                        ${disclaimerHtml}
                    </td>
                </tr>
            </table>`;
        }

        return '';
    }

    // Update sandboxed iframe content
    function updatePreview() {
        const iframe = document.getElementById('signature-preview-iframe');
        if (!iframe) return;

        const rendered = buildSignatureMarkup();
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        
        // Write the HTML with white background and basic alignment
        doc.open();
        doc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body {
                        margin: 0;
                        padding: 10px;
                        background-color: #ffffff;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        min-height: 100vh;
                        box-sizing: border-box;
                    }
                </style>
            </head>
            <body>
                ${rendered}
            </body>
            </html>
        `);
        doc.close();
    }

    // 6. Copy Rich Text Logic
    function copySignatureToClipboard() {
        const rawHtml = buildSignatureMarkup();

        // Standard modern copy using ClipboardItem
        if (navigator.clipboard && window.ClipboardItem) {
            const blobHtml = new Blob([rawHtml], { type: 'text/html' });
            const blobText = new Blob([rawHtml], { type: 'text/plain' });
            
            const data = [new window.ClipboardItem({
                'text/html': blobHtml,
                'text/plain': blobText
            })];

            navigator.clipboard.write(data)
                .then(() => showToast('Signature copied as Rich Text! Ready to paste.'))
                .catch(err => {
                    console.error('ClipboardItem failed, using fallback copy:', err);
                    fallbackCopyRichText(rawHtml);
                });
        } else {
            fallbackCopyRichText(rawHtml);
        }
    }

    // Fallback Rich Text Copy
    function fallbackCopyRichText(htmlString) {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.background = 'white';
        tempDiv.innerHTML = htmlString;
        document.body.appendChild(tempDiv);

        // Select the contents of the temp element
        const range = document.createRange();
        range.selectNodeContents(tempDiv);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showToast('Signature copied as Rich Text (Fallback)! Ready to paste.');
            } else {
                showToast('Copying failed, please copy the raw HTML code.', 'danger');
            }
        } catch (err) {
            console.error('Fallback execCommand failed:', err);
            showToast('Unable to copy. Please copy the raw HTML code.', 'danger');
        }

        // Clean up
        selection.removeAllRanges();
        document.body.removeChild(tempDiv);
    }

    // 7. Copy Raw HTML Code Logic
    function copyHtmlCodeToClipboard() {
        const rawHtml = buildSignatureMarkup();
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(rawHtml)
                .then(() => showToast('Raw HTML source code copied!'))
                .catch(err => {
                    console.error('Failed to copy text:', err);
                    fallbackCopyText(rawHtml);
                });
        } else {
            fallbackCopyText(rawHtml);
        }
    }

    // Fallback Plain Text Copy
    function fallbackCopyText(textString) {
        const textarea = document.createElement('textarea');
        textarea.value = textString;
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showToast('Raw HTML source code copied!');
            } else {
                showToast('Copying failed.', 'danger');
            }
        } catch (err) {
            showToast('Unable to copy text.', 'danger');
        }

        document.body.removeChild(textarea);
    }

    // Toast Notification System
    function showToast(message, type = 'success') {
        toastMsg.textContent = message;
        
        // Setup class list
        toast.className = 'toast show';
        if (type === 'danger') {
            toast.style.borderColor = 'var(--danger)';
            // Find icon
            toast.querySelector('.toast-icon').style.color = 'var(--danger)';
            toast.querySelector('.toast-icon').setAttribute('data-lucide', 'x-circle');
        } else {
            toast.style.borderColor = 'var(--success)';
            toast.querySelector('.toast-icon').style.color = 'var(--success)';
            toast.querySelector('.toast-icon').setAttribute('data-lucide', 'check-circle');
        }
        
        lucide.createIcons();

        // Fade out toast after 3.5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    // Helper function to get social platform icon placeholders
    function getPlatformPlaceholder(platform) {
        switch (platform) {
            case 'linkedin': return 'linkedin.com/in/username';
            case 'twitter': return 'twitter.com/username';
            case 'github': return 'github.com/username';
            case 'facebook': return 'facebook.com/username';
            case 'instagram': return 'instagram.com/username';
            case 'youtube': return 'youtube.com/c/channelname';
            case 'website': return 'www.company.com';
            default: return 'https://example.com/link';
        }
    }

    // Render Dynamic Social Editor Rows
    function renderSocialLinksEditor() {
        if (!socialLinksContainer) return;
        socialLinksContainer.innerHTML = '';
        
        socialLinks.forEach((link, index) => {
            const row = document.createElement('div');
            row.className = 'social-link-row';
            
            // Dropdown for platform
            const select = document.createElement('select');
            select.style.width = '100px';
            select.style.padding = '8px';
            select.innerHTML = `
                <option value="linkedin" ${link.platform === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                <option value="twitter" ${link.platform === 'twitter' ? 'selected' : ''}>Twitter/X</option>
                <option value="github" ${link.platform === 'github' ? 'selected' : ''}>GitHub</option>
                <option value="facebook" ${link.platform === 'facebook' ? 'selected' : ''}>Facebook</option>
                <option value="instagram" ${link.platform === 'instagram' ? 'selected' : ''}>Instagram</option>
                <option value="youtube" ${link.platform === 'youtube' ? 'selected' : ''}>YouTube</option>
                <option value="website" ${link.platform === 'website' ? 'selected' : ''}>Website</option>
                <option value="custom" ${link.platform === 'custom' ? 'selected' : ''}>Custom</option>
            `;
            select.addEventListener('change', (e) => {
                link.platform = e.target.value;
                if ((link.platform === 'custom' || link.platform === 'website') && !link.label) {
                    link.label = link.platform === 'website' ? 'Website' : 'Custom';
                }
                renderSocialLinksEditor();
                updatePreview();
            });

            // Input Fields Column
            const inputsCol = document.createElement('div');
            inputsCol.className = 'social-link-inputs';

            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.value = link.value;
            urlInput.placeholder = getPlatformPlaceholder(link.platform);
            urlInput.addEventListener('input', (e) => {
                link.value = e.target.value;
                updatePreview();
            });
            inputsCol.appendChild(urlInput);

            // Add Label Input for custom/website links
            if (link.platform === 'custom' || link.platform === 'website') {
                const labelInput = document.createElement('input');
                labelInput.type = 'text';
                labelInput.value = link.label;
                labelInput.placeholder = 'Link Label (e.g. Portfolio)';
                labelInput.addEventListener('input', (e) => {
                    link.label = e.target.value;
                    updatePreview();
                });
                inputsCol.appendChild(labelInput);
            }

            // Remove Button
            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn-remove-social';
            removeBtn.innerHTML = `<i data-lucide="trash-2"></i>`;
            removeBtn.addEventListener('click', () => {
                socialLinks.splice(index, 1);
                renderSocialLinksEditor();
                updatePreview();
            });

            row.appendChild(select);
            row.appendChild(inputsCol);
            row.appendChild(removeBtn);
            socialLinksContainer.appendChild(row);
        });

        // Initialize newly appended trash icons
        lucide.createIcons();
    }

    // Add new dynamic row action
    if (btnAddSocial) {
        btnAddSocial.addEventListener('click', () => {
            socialLinks.push({ platform: 'linkedin', value: '', label: '' });
            renderSocialLinksEditor();
        });
    }

    // Attach Copy Actions
    btnCopyRich.addEventListener('click', copySignatureToClipboard);
    btnCopyHtml.addEventListener('click', copyHtmlCodeToClipboard);

    // Initial render and load
    renderSocialLinksEditor();
    updatePreview();
});
