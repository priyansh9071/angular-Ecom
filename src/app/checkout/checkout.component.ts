import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalPrice:number|undefined;
  totalProduct:number | undefined = 0;
  submitOrderMessage:boolean = false;
  cartData:undefined |any = [];
  constructor(private productService:ProductService, private router: Router){}

  addOrderForm=new FormGroup({
      fname: new FormControl(''),
      lname: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      additionalInfo: new FormControl('')
  })

  ngOnInit(): void {
    this.productService.currentCart().subscribe((result:any)=>{
      let price = 0;
      this.cartData = result;
      result.forEach((item:any)=>{
        price = price +  (+item.price* + item?.quantity )
      });
      this.totalPrice = (price + (price/10) + 100)-(price/10);
      this.productService.currentCart().subscribe((item:any)=>{
        this.totalProduct = item?.length;
      })
    })
  }


  SubmitOrder(){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if(this.totalPrice){
      let orderData = {
        ...this.addOrderForm.value,
        totalPrice: this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item:any) => {
        setTimeout(() => {
          this.productService.deleteCartItems(item.id)
        }, 700);
       
      });

      this.productService.orderNow(orderData).subscribe((result)=>{
        this.submitOrderMessage = true;
        setTimeout(() => {
          this.router.navigate(['my-orders'])
        }, 4000);
      })
    }
  }

}
