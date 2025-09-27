import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ButtonDirective } from "primeng/button";
import { CustomerDTO } from '../../models/customer-dto';


@Component({
  selector: 'app-customer-card',
  standalone: true,
  imports: [CardModule, BadgeModule, OverlayBadgeModule, ButtonDirective],
  templateUrl: './customer-card.html',
  styleUrls: ['./customer-card.scss']
})
export class CustomerCard {

  @Input()
  customerFromBackend: CustomerDTO = {}

  @Input()
  customerIndex:number = 0

  @Output()
  delete: EventEmitter<CustomerDTO> = new EventEmitter<CustomerDTO>

  @Output()
  update: EventEmitter<CustomerDTO> = new EventEmitter<CustomerDTO>

  get customerImage(): string {
    const imageGender = this.customerFromBackend.gender === 'MALE' ? 'men' : 'women'
    return `https://randomuser.me/api/portraits/${imageGender}/${this.customerIndex}.jpg`
  }

  onDelete(){
    this.delete.emit(this.customerFromBackend)
  }

  onUpdate(){
    this.update.emit(this.customerFromBackend)
  }

}
