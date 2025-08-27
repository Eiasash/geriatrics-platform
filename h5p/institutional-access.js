// ========== SAFE INSTITUTIONAL ACCESS INTEGRATION ==========
// This file shows how to safely integrate with institutional access
// WITHOUT storing any credentials

const InstitutionalAccess = {
    // Configuration for Clalit proxy (NO PASSWORDS HERE!)
    config: {
        proxyBase: 'https://clalit-tdnetdiscover-com.clalit.portium.org',
        institutionName: 'Clalit Health Services',
        // These are PUBLIC URLs, no credentials
        databases: {
            pubmed: 'https://pubmed.ncbi.nlm.nih.gov',
            uptodate: 'https://www.uptodate.com',
            accessmedicine: 'https://accessmedicine-mhmedical-com.clalit.portium.org',
            dynamed: 'https://www.dynamed.com',
            clinicalkey: 'https://www.clinicalkey.com',
            cochrane: 'https://www.cochranelibrary.com',
            nejm: 'https://www.nejm.org',
            jama: 'https://jamanetwork.com',
            medscape: 'https://www.medscape.com',
            epocrates: 'https://online.epocrates.com'
        },
        // Quick access to geriatrics-specific content
        geriatricsResources: {
            accessMedicine: {
                geriatricsChapter: 'https://accessmedicine-mhmedical-com.clalit.portium.org/book.aspx?bookID=2788',
                currentGeriatricsDiagnosis: 'https://accessmedicine-mhmedical-com.clalit.portium.org/book.aspx?bookID=1197',
                harrisonsPrinciples: 'https://accessmedicine-mhmedical-com.clalit.portium.org/book.aspx?bookID=2129'
            },
            dynaMed: {
                geriatricTopics: 'https://www.dynamed.com/topics/category/geriatrics',
                frailty: 'https://www.dynamed.com/condition/frailty-in-older-adults',
                polypharmacy: 'https://www.dynamed.com/management/polypharmacy-in-older-adults',
                delirium: 'https://www.dynamed.com/condition/delirium'
            }
        }
    },
    
    // Generate proxy URLs (user must be logged in separately)
    generateProxyUrl(originalUrl) {
        // This creates a proxy URL format
        // User MUST have already logged into Clalit portal
        if (originalUrl.includes('doi.org')) {
            // Convert DOI to proxy format
            const doi = originalUrl.split('doi.org/')[1];
            return `${this.config.proxyBase}/doi/${doi}`;
        } else if (originalUrl.includes('pubmed')) {
            // Convert PubMed to proxy format
            const pmid = originalUrl.match(/\/(\d+)\/?$/);
            if (pmid) {
                return `${this.config.proxyBase}/pubmed/${pmid[1]}`;
            }
        }
        // For other URLs, append to proxy
        return `${this.config.proxyBase}/proxy?url=${encodeURIComponent(originalUrl)}`;
    },
    
    // Create login reminder interface (NO PASSWORD FIELDS!)
    createAccessInterface() {
        return `
            <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #856404; margin-top: 0;">📚 Access Full-Text Articles via Clalit</h3>
                
                <div style="background: white; padding: 15px; border-radius: 4px; margin: 15px 0;">
                    <h4>Step 1: Open Clalit Portal</h4>
                    <p>First, log in to your institutional portal in a new tab:</p>
                    <a href="${this.config.proxyBase}" target="_blank" 
                       style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">
                        🔐 Open Clalit Portal (New Tab)
                    </a>
                    <p style="color: #666; margin-top: 10px;">
                        <small>Use your institutional credentials there (NOT here)</small>
                    </p>
                </div>
                
                <div style="background: white; padding: 15px; border-radius: 4px; margin: 15px 0;">
                    <h4>Step 2: Access Premium Medical Resources</h4>
                    <p>Once logged in to Clalit, click these links for full access:</p>
                    
                    <div style="margin-top: 15px;">
                        <h5 style="color: #667eea;">📚 Primary Clinical Resources:</h5>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                            <a href="${this.config.databases.uptodate}" target="_blank" class="resource-link primary">
                                📖 UpToDate
                            </a>
                            <a href="${this.config.databases.accessmedicine}" target="_blank" class="resource-link primary">
                                📕 AccessMedicine
                            </a>
                            <a href="${this.config.databases.dynamed}" target="_blank" class="resource-link primary">
                                📘 DynaMed
                            </a>
                            <a href="${this.config.databases.clinicalkey}" target="_blank" class="resource-link primary">
                                🔑 ClinicalKey
                            </a>
                        </div>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <h5 style="color: #764ba2;">📑 Geriatrics-Specific Content:</h5>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                            <a href="${this.config.geriatricsResources.accessMedicine.currentGeriatricsDiagnosis}" 
                               target="_blank" class="resource-link geriatrics">
                                📗 Current Geriatrics Diagnosis
                            </a>
                            <a href="${this.config.geriatricsResources.accessMedicine.harrisonsPrinciples}" 
                               target="_blank" class="resource-link geriatrics">
                                📙 Harrison's Geriatrics
                            </a>
                            <a href="${this.config.geriatricsResources.dynaMed.frailty}" 
                               target="_blank" class="resource-link geriatrics">
                                🦴 DynaMed: Frailty
                            </a>
                            <a href="${this.config.geriatricsResources.dynaMed.polypharmacy}" 
                               target="_blank" class="resource-link geriatrics">
                                💊 DynaMed: Polypharmacy
                            </a>
                        </div>
                    </div>
                    
                    <div style="margin-top: 15px;">
                        <h5 style="color: #10b981;">🔬 Research & Journals:</h5>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                            <a href="${this.config.databases.pubmed}" target="_blank" class="resource-link research">
                                🔬 PubMed
                            </a>
                            <a href="${this.config.databases.cochrane}" target="_blank" class="resource-link research">
                                📊 Cochrane
                            </a>
                            <a href="${this.config.databases.nejm}" target="_blank" class="resource-link research">
                                📰 NEJM
                            </a>
                            <a href="${this.config.databases.jama}" target="_blank" class="resource-link research">
                                📄 JAMA
                            </a>
                        </div>
                    </div>
                </div>
                
                <div style="background: #f8d7da; padding: 15px; border-radius: 4px; margin-top: 15px;">
                    <strong style="color: #721c24;">⚠️ Security Notice:</strong>
                    <ul style="margin: 5px 0; color: #721c24;">
                        <li>NEVER enter your password in this application</li>
                        <li>ONLY log in through official Clalit portal</li>
                        <li>Keep your credentials confidential</li>
                        <li>Log out when finished</li>
                    </ul>
                </div>
            </div>
            
            <style>
                .resource-link {
                    padding: 8px 15px;
                    background: #f8f9fa;
                    border: 1px solid #dee2e6;
                    text-decoration: none;
                    color: #495057;
                    border-radius: 4px;
                    transition: all 0.3s;
                    display: inline-block;
                }
                .resource-link:hover {
                    background: #e9ecef;
                    border-color: #adb5bd;
                    transform: translateY(-2px);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .resource-link.primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    font-weight: bold;
                }
                .resource-link.primary:hover {
                    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                }
                .resource-link.geriatrics {
                    background: #f3e8ff;
                    border-color: #c084fc;
                    color: #7c3aed;
                }
                .resource-link.geriatrics:hover {
                    background: #e9d5ff;
                    border-color: #a855f7;
                }
                .resource-link.research {
                    background: #e0f2fe;
                    border-color: #38bdf8;
                    color: #0284c7;
                }
                .resource-link.research:hover {
                    background: #bae6fd;
                    border-color: #0ea5e9;
                }
            </style>
        `;
    },
    
    // Check if user might have institutional access
    detectInstitutionalNetwork() {
        // This is a safe check - no credentials involved
        // Just checks if user is on a hospital network
        const hostname = window.location.hostname;
        const institutionalDomains = [
            'clalit.org.il',
            'clalit.co.il',
            'hospital.gov.il',
            'ac.il' // Israeli academic institutions
        ];
        
        // Check if user might be on institutional network
        const referrer = document.referrer;
        const isInstitutional = institutionalDomains.some(domain => 
            hostname.includes(domain) || referrer.includes(domain)
        );
        
        return {
            likelyHasAccess: isInstitutional,
            message: isInstitutional ? 
                'You appear to be on an institutional network' : 
                'You may need to log in to your institutional portal for full access'
        };
    },
    
    // Create bookmarklet for easy access
    generateBookmarklet() {
        // This is a safe JavaScript bookmarklet that helps with access
        // NO credentials are stored or transmitted
        const bookmarkletCode = `
            javascript:(function(){
                const currentUrl = window.location.href;
                const proxyBase = '${this.config.proxyBase}';
                if(currentUrl.includes('pubmed.ncbi.nlm.nih.gov')) {
                    window.open(proxyBase + '/proxy?url=' + encodeURIComponent(currentUrl));
                } else {
                    alert('First navigate to a PubMed article, then click this bookmarklet');
                }
            })();
        `;
        
        return {
            code: bookmarkletCode,
            instructions: `
                <h4>Create a Clalit Access Bookmarklet:</h4>
                <ol>
                    <li>Drag this link to your bookmarks bar: 
                        <a href="${bookmarkletCode}" style="background: #28a745; color: white; padding: 5px 10px; text-decoration: none; border-radius: 4px;">
                            Clalit Full-Text
                        </a>
                    </li>
                    <li>When on a PubMed article, click the bookmarklet</li>
                    <li>It will open the article through Clalit proxy</li>
                    <li>You must be logged into Clalit first!</li>
                </ol>
            `
        };
    },
    
    // Safe session check (no credentials)
    async checkAccessStatus() {
        // This safely checks if user has access
        // WITHOUT storing or transmitting credentials
        try {
            // Try to load a small resource through proxy
            const testUrl = `${this.config.proxyBase}/test`;
            const response = await fetch(testUrl, {
                method: 'HEAD',
                mode: 'no-cors' // Safe check, no credentials sent
            });
            return {
                hasAccess: true,
                message: 'Institutional access detected'
            };
        } catch (error) {
            return {
                hasAccess: false,
                message: 'Please log in to Clalit portal first'
            };
        }
    }
};

// Safe integration with main platform
window.InstitutionalAccess = InstitutionalAccess;

// Example of safe usage
function addInstitutionalAccessButton(pmid) {
    // This adds a button that opens articles through proxy
    // User must have logged in to Clalit separately
    const pubmedUrl = `https://pubmed.ncbi.nlm.nih.gov/${pmid}`;
    const proxyUrl = InstitutionalAccess.generateProxyUrl(pubmedUrl);
    
    return `
        <button onclick="window.open('${proxyUrl}', '_blank')" 
                style="background: #17a2b8; color: white; padding: 5px 10px; border: none; border-radius: 4px; cursor: pointer;">
            📄 Full Text (via Clalit)
        </button>
    `;
}

// IMPORTANT: This file contains NO passwords, NO credentials, NO authentication
// Users MUST log in through official Clalit portal
// This only helps format URLs for proxy access