import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCustomer } from './manage-customer';

describe('ManageCustomer', () => {
  let component: ManageCustomer;
  let fixture: ComponentFixture<ManageCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageCustomer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
