import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemsComponent } from './items/items/items.component';
import { NgFor } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice, PaymentStatus, PaymentType } from '../../../models/Invoice.model';
 

@Component({
  selector: 'app-add-invoice',
  standalone: true,
 
  imports: [FormsModule,  ReactiveFormsModule,ItemsComponent,NgFor],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent   implements OnInit{
 
  invoiceForm!: FormGroup;
  @Input() itemData: any;
  paymentStatusOptions: string[] | undefined;
  paymentTypeOptions: string[] | undefined;
  constructor(private formBuilder: FormBuilder) {
    this.formBuilder.group({
      itemName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      paymentType: ['', Validators.required]
    });
    this.paymentStatusOptions = Object.values(PaymentStatus);
    this.paymentTypeOptions = Object.values(PaymentType);
  }

  ngOnInit(): void {
    this.initForm();
    if (this.itemData) {
      this.populateForm();
    }
  }

  initForm() {
        
    this.paymentStatusOptions = Object.values(PaymentStatus);
    this.paymentTypeOptions = Object.values(PaymentType);
    this.invoiceForm = this.formBuilder.group({
      itemsFormArray: this.formBuilder?.array([this.createItemFormGroup()])
    });
 
   }
   get itemsFormArray() {
    return this.invoiceForm.get('itemsFormArray') as FormArray;
  }

  populateForm() {
    this.itemData.items.forEach((item: string, index: number) => {
      this.itemsFormArray.push(
        this.formBuilder.group({
          itemName: [item, Validators.required],
          quantity: [this.itemData.quantities[index], Validators.required],
          price: [this.itemData.prices[index], Validators.required],
          paymentStatus: [this.itemData.paymentStatus, Validators.required],
          paymentType: [this.itemData.paymentType, Validators.required]
        })
      );
    });
   
  }
 
  addItem() {
    this.itemsFormArray.push(this.createItemFormGroup());
  }

  removeItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  createItemFormGroup(): FormGroup {
    return this.formBuilder.group({
      itemName: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      paymentStatus: [  this.paymentStatusOptions, Validators.required],
      paymentType: [this.paymentTypeOptions, Validators.required]
    });
  }

  submitForm() {
    if (this.invoiceForm.valid) {
      console.log('Form submitted:', this.invoiceForm.value);
     } else {
       console.error("form invalid");
       
    }
  }

 
}
