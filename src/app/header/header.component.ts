import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | any = '';
  cartItem: number = 0;
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
          this.menutype = 'seller';
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menutype = 'user';
          this.productService.getCartList(userData.id);
              
        }
        else {
          this.menutype = 'default'
        }
      }
    });
    let localcartData: any = localStorage.getItem('localCart');
    console.log(localcartData);
    if(localcartData)
    this.cartItem = JSON.parse(localcartData).length;
    this.productService.cartData.subscribe((items) => {
      this.cartItem = items.length;
    });
   

  }

  logOutSeller() {
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }

  logOutUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
    this.productService.cartData.emit([]);
  }


  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((result) => {
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.router.navigate(["search" + "/" + val])
  }

  reDirectToProductDetail(id: number) {
    this.router.navigate(['/product-detail/' + id])
  }
}
