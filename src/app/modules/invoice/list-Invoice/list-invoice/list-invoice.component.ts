import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Invoice } from '../../../../models/Invoice.model';
import { AddInvoiceComponent } from '../../add-Invoice/add-invoice.component';
import { MatDialog } from '@angular/material/dialog';
import { EditInvoiceComponent } from '../../editInvoice/edit-invoice/edit-invoice.component';
import { DeleteInvoiceComponent } from '../../delete-Invoice/delete-invoice/delete-invoice.component';
import { FormsModule } from '@angular/forms';
@Component({ 
  selector: 'app-list-invoice',
  standalone: true,
  imports: [NgFor,CurrencyPipe,FormsModule,NgIf],
  templateUrl: './list-invoice.component.html',
  styleUrl: './list-invoice.component.css'
})
export class ListInvoiceComponent {

  ref: DynamicDialogRef | undefined;
  @Input() invoices: Invoice[] | undefined;
  isAdmin=signal<boolean>(true)
  selectedOption: string ='admin';

  options: string[] = ['admin', 'user' ];  

  constructor( public dialogService: DialogService,public dialog: MatDialog) {
  }
  ngOnInit(): void {
 
  }
  addInvoice( ){
    const dialogRef = this.dialog.open(AddInvoiceComponent, {
    
    });

    dialogRef.afterClosed().subscribe(result => {
      this.CreateUpdate(result)
    });
 
  }
 
  editInvoice(invoice:Invoice){
    const dialogRef = this.dialog.open(EditInvoiceComponent,{
      data: { invoice}
    });
 
    dialogRef.afterClosed().subscribe(result => {
      this.CreateUpdate(result)
    });
  }
  deleteInvoice(invoice:Invoice){
    const dialogRef = this.dialog.open(DeleteInvoiceComponent, {
 
      data: { invoice}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.invoices=this.invoices?.filter(i=>i.id!==result.id)
    });
  }

  onSelectChange() {
     if(this.selectedOption =='admin'){
      this.isAdmin.set(true)
     }
     else{
      this.isAdmin.set(false)
     }
    }

    CreateUpdate(result:any){
      const transformedData: any = {
        id: result[0].id ? result[0].id : Date.now(), 
        items: [],
        quantities: [],
        prices: [],
        paymentStatus: '',
        paymentType: ''
      };
      result.forEach((item:any) => {
        transformedData.items.push(item.itemName);
        transformedData.quantities.push(item.quantity);
        transformedData.prices.push(item.price);
        transformedData.paymentStatus = item.paymentStatus;
        transformedData.paymentType = item.paymentType;
      });

  
  const existingItemIndex = this.invoices?.findIndex((invoice: any) => invoice.id === transformedData.id);

  if (existingItemIndex !== -1 && existingItemIndex && this.invoices)  {
     
    this.invoices[existingItemIndex] = transformedData;
  } else {
    
    this.invoices?.push(transformedData);
  }
  
    }
}
