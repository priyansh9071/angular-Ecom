import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {


  editProductMsg: boolean = false;
  editProductData: FormGroup|any;


  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    this.productService.getProduct(this.activatedRoute.snapshot.params['id']).subscribe((data:any) => {
      console.log(data);
      this.editProductData = new FormGroup({
        name: new FormControl(data?.name),
        price: new FormControl(data?.price),
        color: new FormControl(data?.color),
        category: new FormControl(data?.category),
        description: new FormControl(data?.description),
        url: new FormControl(data?.url)
      })
    })
  }


  editedData(){
    this.productService.editProduct(this.activatedRoute.snapshot.params['id'],this.editProductData.value).subscribe((result)=>{
      this.editProductMsg = true;
      setTimeout(() => {
        this.router.navigate(['/seller-list-product'])
      }, 1500);
    })
  }
}





