import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularProduct:undefined|any = [];
  trendyProduct:undefined|any = [];
  constructor(private productService:ProductService,private router:Router){  }

  ngOnInit(): void {
    this.productService.popularProduct().subscribe((result)=>{
      this.popularProduct = result;
      // console.log(this.popularProduct);
    });

    this.productService.trendyProduct().subscribe((result2)=>{
      this.trendyProduct = result2;
    })
  }


}
