import { Component, OnInit } from '@angular/core';
import { MenuBar } from "../menu-bar/menu-bar";
import { HeaderBar } from "../header-bar/header-bar";
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { ManageCustomer } from "../manage-customer/manage-customer";
import { Customers } from '../../services/customers/customers';
import { CustomerDTO } from '../../models/customer-dto';
import { NgFor } from '@angular/common';
import { CustomerCard } from "../customer-card/customer-card";
import { CustomerRegistrationRequest } from '../../models/customer-registration-request';
import { ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MenuBar, HeaderBar, ButtonModule, DrawerModule, ManageCustomer, NgFor, CustomerCard, ToastModule, ConfirmDialogModule, CommonModule],
  templateUrl: './customer.html',
  styleUrls: ['./customer.scss']
})
export class Customer implements OnInit{


  constructor(
    private customerService: Customers,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){}

  visible:boolean = false

  customers: Array<CustomerDTO> = []
  customer:CustomerRegistrationRequest ={}

  operation: 'create' | 'update' = 'create'

  ngOnInit(): void {
    this.findAllCustomers()
  }

  private findAllCustomers() {
    this.customerService.findAll()
      .subscribe({
        next: (data) => {
          this.customers = data
          console.log(data);
          this.visible = false
          this.customer = {}
        }
      })
  }

  save(customer: CustomerRegistrationRequest) {
    if(customer){
      if(this.operation === 'create'){
        this.customerService.registerCustomer(customer)
        .subscribe({
          next: () => {
            this.findAllCustomers()
            this.visible = false
            this.customer = {}
            this.messageService.add({
              severity: 'success',
              summary: 'Customer saved',
              detail: `Customer ${customer.name}, saved successfully!`
            })
          }
        })
      }else if(this.operation === 'update'){
        this.customerService.updateCustomer(customer.id ,customer)
          .subscribe({
            next: () => {
              this.findAllCustomers()
              this.visible = false
              this.customer = {}
              this.messageService.add({
              severity: 'success',
              summary: 'Customer updated',
              detail: `Customer ${customer.name}, updated successfully!`
            })
          }
        })
      }
    }
  
  }
  deleteCustomer(customerDTO: CustomerDTO) {
    this.confirmationService.confirm({
      header: 'Delete Customer',
      message: `Are you sure you want to delete ${customerDTO.name}? You can\'t undo this later!`,
      accept: () => {
        this.customerService.deleteCustomer(customerDTO.id)
          .subscribe({
            next: () => {
              this.findAllCustomers()
              this.messageService.add({
                severity: 'success',
                summary: 'Customer deleted',
                detail: `Customer ${customerDTO.name}, saved deleted!`
              })
            }
          })
        
      }
    })
  }

  updateCustomer(customerDTO:CustomerDTO){
    this.visible = true
    this.customer = customerDTO
    this.operation = 'update'

  }

  createCustomer() {
    this.visible = true
    this.customer = {}
    this.operation = 'create'
  } 

  cancel() {
    this.visible = false
    this.customer = {}
    this.operation = 'create'
  }
    

}
