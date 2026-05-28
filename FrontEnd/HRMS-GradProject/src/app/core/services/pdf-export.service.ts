import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {

  constructor() { }

  
  generateTableReport(
    reportTitle: string, 
    headers: string[], 
    data: any[][], 
    filename: string,
    additionalInfo?: { label: string, value: string }[]
  ) {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 14;
    
    
    doc.setFillColor(67, 97, 238); 
    doc.rect(0, 0, pageW, 42, 'F');
    
    
    doc.setFillColor(90, 120, 255);
    doc.rect(0, 38, pageW, 4, 'F');

    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text('Kawadir HRMS', margin, 16);

    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(200, 210, 255);
    doc.text(reportTitle, margin, 25);

    
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const timeStr = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    doc.setFontSize(9);
    doc.setTextColor(180, 195, 255);
    doc.text(`Generated: ${todayStr}  ·  ${timeStr}`, margin, 32);

    let curY = 52;

    
    if (additionalInfo && additionalInfo.length > 0) {
      
      const itemsPerRow = Math.min(additionalInfo.length, 4);
      const boxW = (pageW - margin * 2 - (itemsPerRow - 1) * 4) / itemsPerRow;
      
      let currentRow = 0;
      
      additionalInfo.forEach((info, i) => {
        if (i > 0 && i % itemsPerRow === 0) {
          currentRow++;
          curY += 20;
        }
        
        const col = i % itemsPerRow;
        const x = margin + col * (boxW + 4);
        
        
        doc.setFillColor(248, 249, 252);
        doc.roundedRect(x, curY, boxW, 16, 2, 2, 'F');
        
        doc.setDrawColor(225, 228, 240);
        doc.roundedRect(x, curY, boxW, 16, 2, 2, 'S');

        
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 50);
        doc.text(info.value, x + 4, curY + 6);
        
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(120, 125, 145);
        doc.text(info.label, x + 4, curY + 12);
      });
      curY += 24;
    }

    
    autoTable(doc, {
      startY: curY,
      head: [headers],
      body: data,
      margin: { left: margin, right: margin, bottom: 20 },
      theme: 'grid',
      tableWidth: pageW - margin * 2,
      headStyles: {
        fillColor: [50, 62, 140],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        cellPadding: 4,
      },
      bodyStyles: { 
        textColor: [50, 55, 70], 
        fontSize: 9, 
        cellPadding: 3.5 
      },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      didParseCell: (data: any) => {
        
        if (data.section === 'body') {
          const rawText = String(data.cell.raw).toLowerCase();
          
          if (rawText === 'approved' || rawText === 'paid' || rawText === 'active') {
            data.cell.styles.textColor = [6, 150, 80]; 
            data.cell.styles.fontStyle = 'bold';
          } 
          else if (rawText === 'pending' || rawText === 'unpaid') {
            data.cell.styles.textColor = [200, 120, 0]; 
            data.cell.styles.fontStyle = 'bold';
          } 
          else if (rawText === 'rejected' || rawText === 'inactive') {
            data.cell.styles.textColor = [180, 30, 50]; 
            data.cell.styles.fontStyle = 'bold';
          }
        }
      }
    });

    
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let pg = 1; pg <= totalPages; pg++) {
      doc.setPage(pg);
      
      
      doc.setDrawColor(210, 215, 230);
      doc.setLineWidth(0.4);
      doc.line(margin, pageH - 12, pageW - margin, pageH - 12);
      
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(150, 155, 170);
      doc.text('Confidential — Kawadir HRMS Internal Report', margin, pageH - 7);
      doc.text(`Page ${pg} of ${totalPages}`, pageW - margin, pageH - 7, { align: 'right' });
    }

    doc.save(`${filename}_${todayStr}.pdf`);
  }
}
