import { Patient } from '../data';

export class PDFGenerator {
  private static createPDFContent(html: string): string {
    // Create a printable HTML template
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Geriatrics Report</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    
    .header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    
    .header h1 {
      color: #2563eb;
      margin: 0;
      font-size: 24px;
    }
    
    .header .subtitle {
      color: #666;
      font-size: 14px;
      margin-top: 5px;
    }
    
    .section {
      margin-bottom: 25px;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 18px;
      font-weight: bold;
      color: #1e40af;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #e5e7eb;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    
    th {
      background-color: #f3f4f6;
      padding: 8px;
      text-align: left;
      font-weight: 600;
      border: 1px solid #e5e7eb;
    }
    
    td {
      padding: 8px;
      border: 1px solid #e5e7eb;
    }
    
    .alert {
      background-color: #fef2f2;
      border-left: 4px solid #ef4444;
      padding: 10px;
      margin: 10px 0;
    }
    
    .warning {
      background-color: #fffbeb;
      border-left: 4px solid #f59e0b;
      padding: 10px;
      margin: 10px 0;
    }
    
    .info {
      background-color: #eff6ff;
      border-left: 4px solid #3b82f6;
      padding: 10px;
      margin: 10px 0;
    }
    
    .footer {
      margin-top: 30px;
      padding-top: 10px;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    
    .page-break {
      page-break-after: always;
    }
    
    .chart-placeholder {
      background-color: #f9fafb;
      border: 1px dashed #d1d5db;
      padding: 20px;
      text-align: center;
      color: #6b7280;
      margin: 10px 0;
    }
    
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  ${html}
</body>
</html>`;
  }

  static generatePatientReport(patient: Patient, includeHistory: boolean = true): void {
    const reportDate = new Date().toLocaleString();
    
    let html = `
      <div class="header">
        <h1>Patient Clinical Report</h1>
        <div class="subtitle">Generated: ${reportDate}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Patient Information</div>
        <table>
          <tr>
            <th>Name</th><td>${patient.name}</td>
            <th>Age</th><td>${patient.age}</td>
          </tr>
          <tr>
            <th>Ward</th><td>${patient.ward}</td>
            <th>Bed</th><td>${patient.bed}</td>
          </tr>
          <tr>
            <th>Last Updated</th><td colspan="3">${new Date(patient.lastUpdated).toLocaleString()}</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">Active Diagnoses</div>
        <ul>
          ${patient.diagnoses.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
      
      <div class="section">
        <div class="section-title">Current Medications</div>
        <table>
          <tr>
            <th>Medication</th>
            <th>Notes</th>
          </tr>
          ${patient.medications.map(med => `
            <tr>
              <td>${med}</td>
              <td>-</td>
            </tr>
          `).join('')}
        </table>
      </div>
    `;

    if (includeHistory && patient.mmse && patient.mmse.length > 0) {
      html += `
        <div class="section">
          <div class="section-title">MMSE History</div>
          <table>
            <tr>
              <th>Date</th>
              <th>Score</th>
              <th>Interpretation</th>
            </tr>
            ${patient.mmse.map(m => `
              <tr>
                <td>${new Date(m.date).toLocaleDateString()}</td>
                <td>${m.score}/30</td>
                <td>${m.score >= 24 ? 'Normal' : m.score >= 19 ? 'Mild impairment' : 'Moderate to severe impairment'}</td>
              </tr>
            `).join('')}
          </table>
        </div>
      `;
    }

    html += `
      <div class="footer">
        <p>Geriatrics Platform Pro - Shaare Zedek Medical Center</p>
        <p>This report is confidential and intended for medical professionals only</p>
      </div>
    `;

    this.printPDF(this.createPDFContent(html), `patient-report-${patient.id}`);
  }

  static generateRosterReport(patients: Patient[]): void {
    const reportDate = new Date().toLocaleString();
    
    const html = `
      <div class="header">
        <h1>Ward Roster Report</h1>
        <div class="subtitle">Generated: ${reportDate} | Total Patients: ${patients.length}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Patient Summary</div>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Ward</th>
            <th>Bed</th>
            <th>Primary Diagnosis</th>
            <th>MMSE</th>
            <th>Medications</th>
          </tr>
          ${patients.map(p => `
            <tr>
              <td>${p.name}</td>
              <td>${p.age}</td>
              <td>${p.ward}</td>
              <td>${p.bed}</td>
              <td>${p.diagnoses[0] || '-'}</td>
              <td>${p.mmse && p.mmse.length > 0 ? p.mmse[p.mmse.length - 1].score : '-'}</td>
              <td>${p.medications.length}</td>
            </tr>
          `).join('')}
        </table>
      </div>
      
      <div class="footer">
        <p>Geriatrics Platform Pro - Shaare Zedek Medical Center</p>
        <p>This report is confidential and intended for medical professionals only</p>
      </div>
    `;

    this.printPDF(this.createPDFContent(html), 'roster-report');
  }

  static generateMMSEReport(patient: Patient, score: number, details?: any): void {
    const reportDate = new Date().toLocaleString();
    
    const html = `
      <div class="header">
        <h1>Mini-Mental State Examination (MMSE)</h1>
        <div class="subtitle">Generated: ${reportDate}</div>
      </div>
      
      <div class="section">
        <div class="section-title">Patient Information</div>
        <table>
          <tr>
            <th>Name</th><td>${patient.name}</td>
            <th>Age</th><td>${patient.age}</td>
          </tr>
          <tr>
            <th>Date of Assessment</th><td>${new Date().toLocaleDateString()}</td>
            <th>Examiner</th><td>Clinical Staff</td>
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">Assessment Results</div>
        <div class="${score < 19 ? 'alert' : score < 24 ? 'warning' : 'info'}">
          <strong>Total Score: ${score}/30</strong><br>
          <strong>Interpretation:</strong> ${
            score >= 24 ? 'No cognitive impairment' :
            score >= 19 ? 'Mild cognitive impairment' :
            'Moderate to severe cognitive impairment'
          }
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Clinical Recommendations</div>
        <ul>
          ${score < 24 ? '<li>Consider further neuropsychological evaluation</li>' : ''}
          ${score < 19 ? '<li>Evaluate for reversible causes of cognitive impairment</li>' : ''}
          ${score < 19 ? '<li>Assess functional status and safety concerns</li>' : ''}
          <li>Re-evaluate in ${score < 19 ? '3' : '6-12'} months</li>
          <li>Review current medications for cognitive side effects</li>
        </ul>
      </div>
      
      <div class="section">
        <div class="section-title">Historical Scores</div>
        ${patient.mmse && patient.mmse.length > 0 ? `
          <table>
            <tr>
              <th>Date</th>
              <th>Score</th>
              <th>Change</th>
            </tr>
            ${patient.mmse.map((m, i) => `
              <tr>
                <td>${new Date(m.date).toLocaleDateString()}</td>
                <td>${m.score}/30</td>
                <td>${i > 0 ? (m.score - patient.mmse[i-1].score > 0 ? '+' : '') + (m.score - patient.mmse[i-1].score) : '-'}</td>
              </tr>
            `).join('')}
          </table>
        ` : '<p>No historical data available</p>'}
      </div>
      
      <div class="footer">
        <p>Geriatrics Platform Pro - Shaare Zedek Medical Center</p>
        <p>This report is confidential and intended for medical professionals only</p>
      </div>
    `;

    this.printPDF(this.createPDFContent(html), `mmse-report-${patient.id}`);
  }

  static generateCustomReport(title: string, content: string, filename: string): void {
    const reportDate = new Date().toLocaleString();
    
    const html = `
      <div class="header">
        <h1>${title}</h1>
        <div class="subtitle">Generated: ${reportDate}</div>
      </div>
      
      ${content}
      
      <div class="footer">
        <p>Geriatrics Platform Pro - Shaare Zedek Medical Center</p>
        <p>This report is confidential and intended for medical professionals only</p>
      </div>
    `;

    this.printPDF(this.createPDFContent(html), filename);
  }

  private static printPDF(content: string, filename: string): void {
    // Create a hidden iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    // Write content to iframe
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(content);
      doc.close();

      // Wait for content to load then print
      iframe.onload = () => {
        setTimeout(() => {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
          
          // Remove iframe after printing
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 100);
        }, 100);
      };
    }
  }

  // Alternative method using blob for download
  static downloadPDF(content: string, filename: string): void {
    const blob = new Blob([this.createPDFContent(content)], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }
}