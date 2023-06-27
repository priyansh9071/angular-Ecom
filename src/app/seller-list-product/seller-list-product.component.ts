import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-seller-list-product',
  templateUrl: './seller-list-product.component.html',
  styleUrls: ['./seller-list-product.component.css']
})
export class SellerListProductComponent implements OnInit {

  constructor(private productService:ProductService){}
  productList:FormGroup|any = [];

  ngOnInit(): void {
   this.listOfProduct();
  }
  
  deleteProduct(item:number){
    this.productService.deleteProduct(item).subscribe((result)=>{
      this.listOfProduct();
    })
  }

  listOfProduct(){
    this.productService.listProduct().subscribe((result)=>{
      this.productList = result;
    })
  }
}
