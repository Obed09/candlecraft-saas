import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate: Date;
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  notes?: string;
  logoUrl?: string;
}

export function generateInvoicePDF(invoice: InvoiceData): jsPDF {
  const doc = new jsPDF();
  
  // Colors
  const primaryColor: [number, number, number] = [124, 58, 237]; // Purple
  const grayColor: [number, number, number] = [107, 114, 128];
  
  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, "F");
  
  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(invoice.businessName, 15, 20);
  
  // Invoice title
  doc.setFontSize(16);
  doc.text("INVOICE", 15, 30);
  
  // Invoice details (right side)
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice #: ${invoice.invoiceNumber}`, 150, 20);
  doc.text(`Date: ${invoice.invoiceDate.toLocaleDateString()}`, 150, 26);
  doc.text(`Due: ${invoice.dueDate.toLocaleDateString()}`, 150, 32);
  
  // Business info
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("From:", 15, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(invoice.businessName, 15, 61);
  doc.text(invoice.businessAddress, 15, 66);
  doc.text(invoice.businessEmail, 15, 71);
  doc.text(invoice.businessPhone, 15, 76);
  
  // Customer info
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Bill To:", 15, 90);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(invoice.customerName, 15, 96);
  doc.text(invoice.customerEmail, 15, 101);
  if (invoice.customerAddress) {
    doc.text(invoice.customerAddress, 15, 106);
  }
  
  // Items table
  autoTable(doc, {
    startY: 120,
    head: [["Description", "Quantity", "Unit Price", "Total"]],
    body: invoice.items.map(item => [
      item.description,
      item.quantity.toString(),
      `$${item.unitPrice.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]),
    theme: "grid",
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: "bold"
    },
    bodyStyles: {
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 90 },
      1: { cellWidth: 30, halign: "center" },
      2: { cellWidth: 35, halign: "right" },
      3: { cellWidth: 35, halign: "right" }
    }
  });
  
  // Get Y position after table
  const finalY = (doc as any).lastAutoTable.finalY || 120;
  
  // Totals section
  const totalsX = 140;
  let totalsY = finalY + 15;
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  
  // Subtotal
  doc.text("Subtotal:", totalsX, totalsY);
  doc.text(`$${invoice.subtotal.toFixed(2)}`, 190, totalsY, { align: "right" });
  totalsY += 6;
  
  // Tax
  doc.text(`Tax (${((invoice.tax / invoice.subtotal) * 100).toFixed(1)}%):`, totalsX, totalsY);
  doc.text(`$${invoice.tax.toFixed(2)}`, 190, totalsY, { align: "right" });
  totalsY += 6;
  
  // Shipping
  if (invoice.shipping > 0) {
    doc.text("Shipping:", totalsX, totalsY);
    doc.text(`$${invoice.shipping.toFixed(2)}`, 190, totalsY, { align: "right" });
    totalsY += 6;
  }
  
  // Line above total
  doc.setDrawColor(...grayColor);
  doc.line(totalsX, totalsY, 190, totalsY);
  totalsY += 8;
  
  // Total
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Total:", totalsX, totalsY);
  doc.text(`$${invoice.total.toFixed(2)}`, 190, totalsY, { align: "right" });
  
  // Notes
  if (invoice.notes) {
    totalsY += 15;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Notes:", 15, totalsY);
    doc.setFont("helvetica", "normal");
    const splitNotes = doc.splitTextToSize(invoice.notes, 180);
    doc.text(splitNotes, 15, totalsY + 6);
  }
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(...grayColor);
  doc.setFont("helvetica", "italic");
  doc.text("Thank you for your business!", 105, 280, { align: "center" });
  doc.text(`${invoice.businessName} | ${invoice.businessEmail} | ${invoice.businessPhone}`, 105, 285, { align: "center" });
  
  return doc;
}

export function downloadInvoice(invoice: InvoiceData): void {
  const doc = generateInvoicePDF(invoice);
  doc.save(`Invoice-${invoice.invoiceNumber}.pdf`);
}

export function printInvoice(invoice: InvoiceData): void {
  const doc = generateInvoicePDF(invoice);
  doc.autoPrint();
  window.open(doc.output("bloburl"), "_blank");
}
