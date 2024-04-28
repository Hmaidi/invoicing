import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsComponent } from './items/items/items.component';
import { NgFor } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../../../models/Invoice.model';
 

@Component({
  selector: 'app-add-invoice',
  standalone: true,
 
  imports: [FormsModule,  ReactiveFormsModule,ItemsComponent,NgFor],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent   implements OnInit{
 
  
  constructor(private formBuilder: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: { invoice: Invoice }) {
    this.formBuilder.group({
      itemName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      paymentType: ['', Validators.required]
    });
   }
 
  ngOnInit() {
   
   
  }

 
}
