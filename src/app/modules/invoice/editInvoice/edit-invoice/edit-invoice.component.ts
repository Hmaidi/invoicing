import { Component, Inject, Input, OnInit } from '@angular/core';
import { AddInvoiceComponent } from '../../add-Invoice/add-invoice.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from '../../../../models/Invoice.model';
import { JsonPipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemsComponent } from '../../add-Invoice/items/items/items.component';

@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [AddInvoiceComponent,JsonPipe,ItemsComponent],
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.css'
})
export class EditInvoiceComponent implements  OnInit {
 
  invoiceForm!: FormGroup ;
  invoiceNumber: string | undefined;
  itemForm: any ;
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice }) { }

  ngOnInit() {
 
   this.itemForm=this.data.invoice
    this.itemForm=this.data.invoice
    this.itemForm.patchValue(this.data);
  
   
  }

  createItem(item?: any): FormGroup {
    return this.formBuilder.group({
      itemName: [item ? item.itemName : '', Validators.required],
      quantity: [item ? item.quantity : '', Validators.required],
      price: [item ? item.price : '', Validators.required],
      paymentStatus: [item ? item.paymentStatus : '', Validators.required],
      paymentType: [item ? item.paymentType : '', Validators.required]
    });
  }
}
