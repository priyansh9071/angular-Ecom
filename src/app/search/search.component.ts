import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchResult: undefined|any = [];
  constructor(private activateRoute: ActivatedRoute, private productService: ProductService, private router: Router){}

  ngOnInit(): void {
    let query1 = this.activateRoute.snapshot.paramMap.get('query');
    query1 && this.productService.searchProduct(query1).subscribe((result)=>{
      this.searchResult = result;
    })
  }

  clickImage(){
    this.router.navigate(['/product-detail'])
  }

}
