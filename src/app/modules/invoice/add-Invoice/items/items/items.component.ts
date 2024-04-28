import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentStatus, PaymentType } from '../../../../../models/Invoice.model';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor,NgIf,JsonPipe],
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  invoiceForm!: FormGroup;
 
  @Input() itemData: any;
  paymentStatusOptions: string[] | undefined;
  paymentTypeOptions: string[] | undefined;
  constructor(private formBuilder: FormBuilder) {
    
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
      // Handle form submission logic
    } else {
      // Handle invalid form
    }
  }
}