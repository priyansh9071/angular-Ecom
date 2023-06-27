import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {
  constructor(private productServie: ProductService,private router:Router) {
    console.log(this.router.url);
   }
  addProductMsg:boolean=false;
  addProductForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    color: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    url: new FormControl('')
  })

  addProduct() {
    this.productServie.addProduct(this.addProductForm.value).subscribe((result) => {
      console.log(result);
      if(result){
        this.addProductMsg = true;

      }
      this.addProductForm.reset();
    })

  }

}
