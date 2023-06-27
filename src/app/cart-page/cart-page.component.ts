import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { priceSummery } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartData: undefined | any = [];
  priceSumery: priceSummery = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadPriceDetails();
  }

  loadPriceDetails(){
    this.productService.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      this.cartData.forEach((item: any) => {
        price = price + (+item.price * + item?.quantity)
      });
      this.priceSumery.price = price;
      this.priceSumery.tax = price / 10;
      this.priceSumery.delivery = 100;
      this.priceSumery.discount = (this.priceSumery.price + this.priceSumery.tax + this.priceSumery.delivery) / 10;
      this.priceSumery.total = (this.priceSumery.price) + (this.priceSumery.tax) + (this.priceSumery.delivery) - (this.priceSumery.discount);
      if(!this.cartData.length){
        this.router.navigate(['/'])
      }
    })
  }

  onCheckOut() {
    this.router.navigate(['check-out'])
  }

  removeToCart(cartId: number | undefined) {
    cartId && this.productService.removeCart(cartId).subscribe((result) => {
      if (result) {
       this.loadPriceDetails();
      }
    })
  }
}
