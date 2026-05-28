import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {

  constructor() { }

  
  exportTableToExcel(headers: string[], data: any[][], filename: string) {
    if (!data || data.length === 0) {
      Swal.fire('No Data', 'There is no data to export.', 'info');
      return;
    }

    
    const csvData = data.map((row) => {
      return row
        .map((value) => {
          if (value === null || value === undefined) return '""';
          
          const strValue = String(value).replace(/"/g, '""');
          return `"${strValue}"`;
        })
        .join(',');
    });

    
    const csvContent = '\uFEFFsep=,\r\n' + [headers.join(','), ...csvData].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    
    
    const todayStr = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `${filename}_Kawadir_${todayStr}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: 'success',
      title: 'Exported Successfully',
      text: 'Data has been exported to Excel (CSV).',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}
