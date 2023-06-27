import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  searchProductData: undefined | any = [];
  productQuantity: number = 1;
  removeCart: boolean = false;
  removeCartData:any;
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    let searchProductId = this.activatedRoute.snapshot.paramMap.get('productId');
    searchProductId && this.productService.getProduct(searchProductId).subscribe((result) => {
      this.searchProductData = result;

      let cartData = localStorage.getItem('localCart');
      if (searchProductId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: any) => searchProductId == item.id.toString());
        if(items.length){
          this.removeCart = true;
        }
        else{
          this.removeCart = false;
        }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((result)=>{
          let items = Object.values(result).filter((item:any)=>searchProductId?.toString() === item.productId?.toString());
          if(items.length){
            this.removeCartData = items[0];
            this.removeCart=true;
          }
      })
      }
    })
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.searchProductData) {
      this.searchProductData.quantity = this.productQuantity
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.searchProductData);
        this.removeCart = true;
      }
      else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData = {
          ...this.searchProductData,
          productId:this.searchProductData.id,
          userId
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.productService.getCartList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeFromCart(searchProductId: number) {
    if (!localStorage.getItem('user')){
      this.productService.removeFromCart(searchProductId);
      
    }
    else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      this.productService.removeCart(this.removeCartData.id).subscribe((result)=>{
        if(result){
          this.productService.getCartList(userId);
        }
      })
    }
    this.removeCart = false;
  }
}
