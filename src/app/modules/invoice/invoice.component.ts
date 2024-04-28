 
import { Component,   OnInit } from '@angular/core';
 
import { Invoice } from '../../models/Invoice.model';
import { ListInvoiceComponent } from './list-Invoice/list-invoice/list-invoice.component';
import { InvoiceService } from '../../services/invoice.service';
 
 

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [ListInvoiceComponent],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {
  invoiceData: Invoice[] = [];
  constructor( private invoiceService:InvoiceService) {
  }

  ngOnInit(): void {
    this.invoiceService.getInvoice().subscribe((invoices:Invoice[]) => {
      this.invoiceData = invoices;
      console.log(this.invoiceData)
    });
  }
 

  
}
