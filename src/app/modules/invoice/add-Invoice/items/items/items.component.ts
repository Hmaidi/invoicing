import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentStatus, PaymentType } from '../../../../../models/Invoice.model';
import { MatDialogRef } from '@angular/material/dialog';

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
  dialogRefmatDialog!: MatDialogRef<any>;

  constructor(private formBuilder: FormBuilder,public dialogRef: MatDialogRef<ItemsComponent>) {
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
 
  
    if (this.itemData) {
      this.populateForm();
    }
    else{
      
        this.initForm();
       
    }
  }

  initForm() {
   
    this.invoiceForm = this.formBuilder.group({
      itemRows: this.formBuilder?.array([this.createItemFormGroup()]),
      paymentType: new FormControl('Credit Card')  ,
      PaymentStatus: new FormControl('Pending')  

    });
      
    this.paymentStatusOptions = Object.values(PaymentStatus);
    this.paymentTypeOptions = Object.values(PaymentType);
   }
   get itemsFormArray() {
    return this.invoiceForm.get('itemRows') as FormArray;
  }

  populateForm() {
    this.invoiceForm = this.formBuilder.group({
      itemRows: this.formBuilder?.array( []),
      paymentType: new FormControl('Credit Card')  ,
      PaymentStatus: new FormControl('Pending')  

    });
      
    this.paymentStatusOptions = Object.values(PaymentStatus);
    this.paymentTypeOptions = Object.values(PaymentType);
    this.itemData.items.forEach((item: string, index: number) => {
      this.itemsFormArray.push(
        this.formBuilder.group({
          id:this.itemData.id,
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
      this.dialogRef.close(this.invoiceForm.value.itemRows);

     } else {
       console.error("form invalid");
       
    }
  }
}