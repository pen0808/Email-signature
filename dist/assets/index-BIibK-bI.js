(function(){const S=document.createElement("link").relList;if(S&&S.supports&&S.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))P(s);new MutationObserver(s=>{for(const u of s)if(u.type==="childList")for(const b of u.addedNodes)b.tagName==="LINK"&&b.rel==="modulepreload"&&P(b)}).observe(document,{childList:!0,subtree:!0});function z(s){const u={};return s.integrity&&(u.integrity=s.integrity),s.referrerPolicy&&(u.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?u.credentials="include":s.crossOrigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function P(s){if(s.ep)return;s.ep=!0;const u=z(s);fetch(s.href,u)}})();document.addEventListener("DOMContentLoaded",()=>{lucide.createIcons();const D=document.querySelectorAll(".tab-btn"),S=document.querySelectorAll(".tab-pane"),z=document.querySelectorAll(".guide-tab-btn"),P=document.querySelectorAll(".guide-pane"),s=document.getElementById("btn-guide"),u=document.getElementById("btn-modal-close"),b=document.getElementById("guide-modal"),H=document.getElementById("select-image-type"),j=document.getElementById("select-image-source"),le=document.getElementById("custom-image-url-group"),ae=document.getElementById("input-image-url"),M=document.querySelectorAll(".color-preset-btn"),N=document.getElementById("color-picker-accent"),ie=document.getElementById("color-picker-secondary"),O=document.getElementById("color-picker-text-value"),re=document.getElementById("color-picker-secondary-text-value"),ce=document.getElementById("select-font"),se=document.getElementById("select-font-size"),de=document.getElementById("select-avatar-shape"),pe=document.getElementById("select-image-width"),F=document.getElementById("toggle-disclaimer"),ue=document.getElementById("disclaimer-text-group"),G=document.getElementById("textarea-disclaimer"),me=document.querySelectorAll(".template-card"),$e=document.getElementById("btn-copy-rich"),xe=document.getElementById("btn-copy-html"),v=document.getElementById("toast-notification"),we=document.getElementById("toast-message"),Ee=["input-name","input-job-title","input-department","input-company","input-email","input-phone","input-mobile","input-website","input-address"];let B="classic",i="#2563eb",p="#4b5563",m={phone:!0,mobile:!0,email:!0,website:!0,address:!0},V={department:!0,company:!0},R=[{platform:"linkedin",value:"linkedin.com/in/alexander-wright",label:""},{platform:"twitter",value:"twitter.com/alexwright",label:""},{platform:"github",value:"github.com/alexwright",label:""}];const _=document.getElementById("social-links-container"),ge=document.getElementById("btn-add-social");D.forEach(e=>{e.addEventListener("click",()=>{D.forEach(o=>o.classList.remove("active")),S.forEach(o=>o.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-tab");document.getElementById(t).classList.add("active")})}),s.addEventListener("click",()=>{b.style.display="flex"}),u.addEventListener("click",()=>{b.style.display="none"}),b.addEventListener("click",e=>{e.target===b&&(b.style.display="none")}),z.forEach(e=>{e.addEventListener("click",()=>{z.forEach(o=>o.classList.remove("active")),P.forEach(o=>o.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-guide");document.getElementById(t).classList.add("active")})}),H.addEventListener("change",()=>{l()}),j.addEventListener("change",()=>{j.value==="custom"?le.style.display="block":le.style.display="none",l()}),ae.addEventListener("input",l),M.forEach(e=>{e.addEventListener("click",()=>{M.forEach(o=>o.classList.remove("active")),e.classList.add("active");const t=e.getAttribute("data-color");i=t,N.value=t,O.value=t.toUpperCase(),l()})}),N.addEventListener("input",e=>{M.forEach(t=>t.classList.remove("active")),i=e.target.value,O.value=i.toUpperCase(),l()}),O.addEventListener("input",e=>{const t=e.target.value;/^#[0-9A-F]{6}$/i.test(t)&&(M.forEach(o=>o.classList.remove("active")),i=t,N.value=t,l())}),ie.addEventListener("input",e=>{p=e.target.value,re.value=p.toUpperCase(),l()}),re.addEventListener("input",e=>{const t=e.target.value;/^#[0-9A-F]{6}$/i.test(t)&&(p=t,ie.value=t,l())}),ce.addEventListener("change",l),se.addEventListener("change",l),de.addEventListener("change",l),pe.addEventListener("input",l),F.addEventListener("change",()=>{F.checked?ue.style.display="block":ue.style.display="none",l()}),G.addEventListener("input",l),me.forEach(e=>{e.addEventListener("click",()=>{me.forEach(t=>t.classList.remove("active")),e.classList.add("active"),B=e.getAttribute("data-template"),l()})}),document.querySelectorAll(".field-toggle input").forEach(e=>{e.addEventListener("change",t=>{const o=t.target.closest(".field-toggle"),d=o.getAttribute("data-field"),r=o.getAttribute("data-personal");d&&(m[d]=t.target.checked),r&&(V[r]=t.target.checked),l()})}),Ee.forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("input",l)});function g(e){const t=document.getElementById(e);return t?t.value.trim():""}function Le(e){return e==="round"?"50%":e==="rounded"?"8px":"0px"}function Ie(){const e=H.value;return e==="none"?"":j.value==="custom"?ae.value.trim()||"https://via.placeholder.com/150":e==="avatar"?"avatar.png":"logo.png"}function Y(){const e=H.value,t=g("input-name")||"Contact";return e==="avatar"?`${t} photo`:"Company logo"}function K(e){return`vertical-align: top; width: ${e}px; max-width: 100%;`}function X(e,t){return`border-radius: ${t}; display: block; width: ${e}px; max-width: 100%; height: ${e}px; object-fit: cover; object-position: center; border: 0; outline: none; text-decoration: none;`}function J(){const e=g("input-name")||"Alexander Wright",t=g("input-job-title")||"Principal Software Architect",o=g("input-department")||"Engineering & Innovation",d=g("input-company")||"Pen Technology Group",r=g("input-email"),f=g("input-phone"),y=g("input-mobile"),a=g("input-website"),I=g("input-address"),n=ce.value,be=se.value,ke=de.value,h=parseInt(pe.value)||100,U=H.value!=="none",Q=Ie(),Z=Le(ke);let C=15,k=13,w=12,ee=10;be==="small"?(C=13,k=11,w=11,ee=9):be==="large"&&(C=18,k=14,w=13,ee=11);let E=[];if(f&&m.phone&&E.push(`<span style="color: ${i}; font-weight: bold;">T:</span> <span style="color: ${p};">${f}</span>`),y&&m.mobile&&E.push(`<span style="color: ${i}; font-weight: bold;">M:</span> <span style="color: ${p};">${y}</span>`),r&&m.email&&E.push(`<span style="color: ${i}; font-weight: bold;">E:</span> <a href="mailto:${r}" style="color: ${p}; text-decoration: none;">${r}</a>`),a&&m.website){const c=a.startsWith("http")?a:`https://${a}`;E.push(`<span style="color: ${i}; font-weight: bold;">W:</span> <a href="${c}" target="_blank" style="color: ${p}; text-decoration: none;">${a}</a>`)}I&&m.address&&E.push(`<span style="color: ${i}; font-weight: bold;">A:</span> <span style="color: ${p};">${I}</span>`);let te=[];const Te="display: inline-block; margin-right: 10px; font-size: 11px; text-decoration: none; font-weight: bold;";R.forEach(c=>{if(c.value&&c.value.trim()){const A=c.value.trim(),ze=A.startsWith("http")?A:`https://${A}`;let ne="";c.platform==="custom"||c.platform==="website"?ne=c.label&&c.label.trim()||(c.platform==="website"?"Website":"Link"):ne=c.platform.charAt(0).toUpperCase()+c.platform.slice(1),te.push(`<a href="${ze}" target="_blank" style="${Te} color: ${i};">${ne}</a>`)}});const x=te.length>0?te.join('<span style="color: #e2e8f0; margin-right: 10px;">|</span>'):"",he=V.department,ve=V.company,Ae=he?" | ":"",oe=ve?`<div style="font-size: ${k}px; color: #555555; margin-top: 1px; font-weight: 500; font-family: ${n};">${d}</div>`:"",W=`<div style="font-size: ${k}px; color: ${i}; margin-top: 2px; font-weight: 600; font-family: ${n};">${t}${he?Ae+o:""}</div>`;let L="";E.length>0&&(L=E.join(' <span style="color: #cbd5e1; margin: 0 4px;">&bull;</span> '));let T="";if(F.checked&&G.value.trim()&&(T=`
            <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 18px; width: 100%; border-top: 1px solid #e2e8f0; padding-top: 8px;">
                <tr>
                    <td style="font-size: ${ee}px; line-height: 1.4; color: #94a3b8; font-style: italic; font-family: ${n}; text-align: justify;">
                        ${G.value.trim()}
                    </td>
                </tr>
            </table>`),B==="classic")return`
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${n}; color: #333333; line-height: 1.4; max-width: 600px; text-align: left; background-color: #ffffff;">
                <tr>
                    <td style="vertical-align: top;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                ${U?`
                                <td style="padding-right: 18px; ${K(h)}">
                                    <img src="${Q}" width="${h}" alt="${Y()}" style="${X(h,Z)}" />
                                </td>
                                <td style="width: 2px; border-left: 2px solid ${i}; font-size: 1px; line-height: 1px; padding: 0;" aria-hidden="true">&nbsp;</td>
                                `:""}
                                <td style="vertical-align: top; padding-left: ${U?"18px":"0px"};">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="vertical-align: top; font-family: ${n};">
                                                <div style="font-size: ${C}px; font-weight: bold; color: #1e293b; line-height: 1.2; font-family: ${n};">${e}</div>
                                                ${W}
                                                ${oe}
                                            </td>
                                        </tr>
                                        ${L?`
                                        <tr>
                                            <td style="padding-top: 10px; font-size: ${w}px; color: ${p}; font-family: ${n}; line-height: 1.5;">
                                                ${L}
                                            </td>
                                        </tr>
                                        `:""}
                                        ${x?`
                                        <tr>
                                            <td style="padding-top: 10px; font-family: ${n};">
                                                ${x}
                                            </td>
                                        </tr>
                                        `:""}
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top;">
                        ${T}
                    </td>
                </tr>
            </table>`;if(B==="minimalist")return`
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${n}; color: #333333; line-height: 1.4; max-width: 600px; text-align: left; background-color: #ffffff;">
                <tr>
                    <td style="vertical-align: top; font-family: ${n};">
                        <div style="font-size: ${C}px; font-weight: bold; color: #1e293b; line-height: 1.2; font-family: ${n};">${e}</div>
                        ${W}
                        ${oe}
                        
                        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin: 10px 0;">
                            <tr>
                                <td style="border-top: 1px solid #e2e8f0; font-size: 1px; line-height: 1px; height: 1px;">&nbsp;</td>
                            </tr>
                        </table>
                        
                        ${L?`
                        <div style="font-size: ${w}px; color: ${p}; line-height: 1.5; font-family: ${n};">
                            ${L}
                        </div>
                        `:""}
                        
                        ${x?`
                        <div style="margin-top: 10px; font-family: ${n};">
                            ${x}
                        </div>
                        `:""}
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top;">
                        ${T}
                    </td>
                </tr>
            </table>`;if(B==="modern"){let c="";if(f&&m.phone&&(c+=`<div style="margin-bottom: 2px;"><strong style="color: ${i};">Phone:</strong> ${f}</div>`),y&&m.mobile&&(c+=`<div style="margin-bottom: 2px;"><strong style="color: ${i};">Cell:</strong> ${y}</div>`),r&&m.email&&(c+=`<div style="margin-bottom: 2px;"><strong style="color: ${i};">Email:</strong> <a href="mailto:${r}" style="color: ${p}; text-decoration: none;">${r}</a></div>`),a&&m.website){const A=a.startsWith("http")?a:`https://${a}`;c+=`<div style="margin-bottom: 2px;"><strong style="color: ${i};">Web:</strong> <a href="${A}" target="_blank" style="color: ${p}; text-decoration: none;">${a}</a></div>`}return I&&m.address&&(c+=`<div style="margin-bottom: 2px;"><strong style="color: ${i};">Office:</strong> ${I}</div>`),`
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${n}; color: #333333; line-height: 1.4; max-width: 600px; text-align: left; background-color: #ffffff;">
                <tr>
                    <td style="vertical-align: top;">
                        <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                            <tr>
                                ${U?`
                                <td style="padding-right: 18px; ${K(h)}">
                                    <img src="${Q}" width="${h}" alt="${Y()}" style="${X(h,Z)}" />
                                </td>
                                `:""}
                                <td style="vertical-align: middle;">
                                    <div style="font-size: ${C}px; font-weight: 800; color: #1e293b; line-height: 1.1; letter-spacing: -0.01em; font-family: ${n};">${e}</div>
                                    ${W}
                                    ${oe}
                                </td>
                            </tr>
                        </table>
                        
                        <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px; width: 100%;">
                            <tr>
                                <td style="font-size: ${w}px; color: ${p}; font-family: ${n}; line-height: 1.5;">
                                    ${c}
                                </td>
                            </tr>
                        </table>
                        
                        ${x?`
                        <table cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px;">
                            <tr>
                                <td style="font-family: ${n}; font-size: ${w}px;">
                                    ${x}
                                </td>
                            </tr>
                        </table>
                        `:""}
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top;">
                        ${T}
                    </td>
                </tr>
            </table>`}return B==="ribbon"?`
            <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${n}; color: #333333; line-height: 1.4; max-width: 600px; text-align: left; background-color: #ffffff;">
                <tr>
                    <td style="vertical-align: top; width: 4px; background-color: ${i}; font-size: 1px; line-height: 1px; border-radius: 2px;" aria-hidden="true">&nbsp;</td>
                    <td style="width: 16px; font-size: 1px; line-height: 1px;" aria-hidden="true">&nbsp;</td>
                    <td style="vertical-align: top;">
                        <table cellpadding="0" cellspacing="0" border="0">
                            <tr>
                                ${U?`
                                <td style="padding-right: 18px; ${K(h)}">
                                    <img src="${Q}" width="${h}" alt="${Y()}" style="${X(h,Z)}" />
                                </td>
                                `:""}
                                <td style="vertical-align: top;">
                                    <table cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                            <td style="vertical-align: top; font-family: ${n};">
                                                <div style="font-size: ${C}px; font-weight: bold; color: #1e293b; line-height: 1.2; font-family: ${n};">${e}</div>
                                                ${W}
                                                ${ve?`<div style="font-size: ${k}px; color: ${i}; margin-top: 1px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; font-family: ${n};">${d}</div>`:""}
                                            </td>
                                        </tr>
                                        ${L?`
                                        <tr>
                                            <td style="padding-top: 10px; font-size: ${w}px; color: ${p}; font-family: ${n}; line-height: 1.5;">
                                                ${L}
                                            </td>
                                        </tr>
                                        `:""}
                                        ${x?`
                                        <tr>
                                            <td style="padding-top: 10px; font-family: ${n};">
                                                ${x}
                                            </td>
                                        </tr>
                                        `:""}
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="vertical-align: top;" colspan="3">
                        ${T}
                    </td>
                </tr>
            </table>`:""}function l(){const e=document.getElementById("signature-preview-iframe");if(!e)return;const t=J(),o=e.contentDocument||e.contentWindow.document;o.open(),o.write(`
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
                ${t}
            </body>
            </html>
        `),o.close()}function Ce(){const e=J();if(navigator.clipboard&&window.ClipboardItem){const t=new Blob([e],{type:"text/html"}),o=new Blob([e],{type:"text/plain"}),d=[new window.ClipboardItem({"text/html":t,"text/plain":o})];navigator.clipboard.write(d).then(()=>$("Signature copied as Rich Text! Ready to paste.")).catch(r=>{console.error("ClipboardItem failed, using fallback copy:",r),fe(e)})}else fe(e)}function fe(e){const t=document.createElement("div");t.style.position="absolute",t.style.left="-9999px",t.style.background="white",t.innerHTML=e,document.body.appendChild(t);const o=document.createRange();o.selectNodeContents(t);const d=window.getSelection();d.removeAllRanges(),d.addRange(o);try{document.execCommand("copy")?$("Signature copied as Rich Text (Fallback)! Ready to paste."):$("Copying failed, please copy the raw HTML code.","danger")}catch(r){console.error("Fallback execCommand failed:",r),$("Unable to copy. Please copy the raw HTML code.","danger")}d.removeAllRanges(),document.body.removeChild(t)}function Se(){const e=J();navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(e).then(()=>$("Raw HTML source code copied!")).catch(t=>{console.error("Failed to copy text:",t),ye(e)}):ye(e)}function ye(e){const t=document.createElement("textarea");t.value=e,t.style.position="absolute",t.style.left="-9999px",document.body.appendChild(t),t.select();try{document.execCommand("copy")?$("Raw HTML source code copied!"):$("Copying failed.","danger")}catch{$("Unable to copy text.","danger")}document.body.removeChild(t)}function $(e,t="success"){we.textContent=e,v.className="toast show",t==="danger"?(v.style.borderColor="var(--danger)",v.querySelector(".toast-icon").style.color="var(--danger)",v.querySelector(".toast-icon").setAttribute("data-lucide","x-circle")):(v.style.borderColor="var(--success)",v.querySelector(".toast-icon").style.color="var(--success)",v.querySelector(".toast-icon").setAttribute("data-lucide","check-circle")),lucide.createIcons(),setTimeout(()=>{v.classList.remove("show")},3500)}function Be(e){switch(e){case"linkedin":return"linkedin.com/in/username";case"twitter":return"twitter.com/username";case"github":return"github.com/username";case"facebook":return"facebook.com/username";case"instagram":return"instagram.com/username";case"youtube":return"youtube.com/c/channelname";case"website":return"www.company.com";default:return"https://example.com/link"}}function q(){_&&(_.innerHTML="",R.forEach((e,t)=>{const o=document.createElement("div");o.className="social-link-row";const d=document.createElement("select");d.style.width="100px",d.style.padding="8px",d.innerHTML=`
                <option value="linkedin" ${e.platform==="linkedin"?"selected":""}>LinkedIn</option>
                <option value="twitter" ${e.platform==="twitter"?"selected":""}>Twitter/X</option>
                <option value="github" ${e.platform==="github"?"selected":""}>GitHub</option>
                <option value="facebook" ${e.platform==="facebook"?"selected":""}>Facebook</option>
                <option value="instagram" ${e.platform==="instagram"?"selected":""}>Instagram</option>
                <option value="youtube" ${e.platform==="youtube"?"selected":""}>YouTube</option>
                <option value="website" ${e.platform==="website"?"selected":""}>Website</option>
                <option value="custom" ${e.platform==="custom"?"selected":""}>Custom</option>
            `,d.addEventListener("change",a=>{e.platform=a.target.value,(e.platform==="custom"||e.platform==="website")&&!e.label&&(e.label=e.platform==="website"?"Website":"Custom"),q(),l()});const r=document.createElement("div");r.className="social-link-inputs";const f=document.createElement("input");if(f.type="text",f.value=e.value,f.placeholder=Be(e.platform),f.addEventListener("input",a=>{e.value=a.target.value,l()}),r.appendChild(f),e.platform==="custom"||e.platform==="website"){const a=document.createElement("input");a.type="text",a.value=e.label,a.placeholder="Link Label (e.g. Portfolio)",a.addEventListener("input",I=>{e.label=I.target.value,l()}),r.appendChild(a)}const y=document.createElement("button");y.type="button",y.className="btn-remove-social",y.innerHTML='<i data-lucide="trash-2"></i>',y.addEventListener("click",()=>{R.splice(t,1),q(),l()}),o.appendChild(d),o.appendChild(r),o.appendChild(y),_.appendChild(o)}),lucide.createIcons())}ge&&ge.addEventListener("click",()=>{R.push({platform:"linkedin",value:"",label:""}),q()}),$e.addEventListener("click",Ce),xe.addEventListener("click",Se),q(),l()});
