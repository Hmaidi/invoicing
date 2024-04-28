import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import { Invoice } from '../../../../models/Invoice.model';

@Component({
  selector: 'app-delete-invoice',
  standalone: true,
  imports: [],
  templateUrl: './delete-invoice.component.html',
  styleUrl: './delete-invoice.component.css'
})
export class DeleteInvoiceComponent {
  items:any
    dialogRefmatDialog!: MatDialogRef<any>;

  constructor(    public dialogRef: MatDialogRef<DeleteInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice }) { }

 // this.itemsFormArray.removeAt(index);
  deleteItem(item:any) {
    this.dialogRef.close(item.invoice);

  }
  close() {
    this.dialogRef.close()
   }
}
