import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerListProductComponent } from './seller-list-product.component';

describe('SellerListProductComponent', () => {
  let component: SellerListProductComponent;
  let fixture: ComponentFixture<SellerListProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerListProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerListProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
