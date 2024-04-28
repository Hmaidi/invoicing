import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
 
 
import {HttpClientModule} from "@angular/common/http";
import { InvoiceComponent } from './modules/invoice/invoice.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet  ,InvoiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title = 'managementSchool';
}