import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InputText } from "primeng/inputtext";
import { ButtonDirective } from "primeng/button";
import { CustomerRegistrationRequest } from '../../models/customer-registration-request';
import { FormsModule } from '@angular/forms';  
import { NgIf, CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-customer',
  standalone: true,
  imports: [InputText, ButtonDirective, FormsModule, CommonModule, NgIf],
  templateUrl: './manage-customer.html',
  styleUrls: ['./manage-customer.scss']
})
export class ManageCustomer implements OnInit{

  @Input()
  customerRR: CustomerRegistrationRequest ={}

  @Output()
  submit: EventEmitter<CustomerRegistrationRequest> = new EventEmitter<CustomerRegistrationRequest>

  @Input()
  showPasswordGender: 'create' | 'update' = 'create'
  
  @Output()
  cancel:EventEmitter<void> = new EventEmitter<void>()
  
  
  title:string = 'New Customer'

  isCustomerValid(): boolean {
    return this.hasLength(this.customerRR.name) &&
      this.hasLength(this.customerRR.email) &&
      this.customerRR.age !== undefined && this.customerRR.age>0 &&
      (
        this.showPasswordGender === 'update' ||
        this.hasLength(this.customerRR.password) &&
        this.hasLength(this.customerRR.gender)
      )
      
  }

  private hasLength (input: string | undefined): boolean{ 
    return input !== null && input !== undefined && input.length > 0
  }

  onSubmit() {
    this.submit.emit(this.customerRR)
  }

  ngOnInit(): void {
    if(this.showPasswordGender === 'update'){
      this.title = 'Update Customer'
    }
  }

  onCancel() {
    this.cancel.emit()
  }


}
