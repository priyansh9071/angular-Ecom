import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orderList:undefined|any = [];

  constructor(private productService:ProductService){}

  ngOnInit(): void {
    this.getOrderList();
  }

  cancelOrder(orderId:number|undefined){
        orderId && this.productService.cancleOrder(orderId).subscribe((result)=>{
          this.getOrderList();
    })
  }

  getOrderList(){
    this.productService.orderList().subscribe((result)=>{
      this.orderList = result;
      console.log(result);
      
    })
  }
}
