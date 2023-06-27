import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<any | []>();
  constructor(private httpClient: HttpClient) { }

  addProduct(data: any) {
    return this.httpClient.post("http://localhost:3000/products", data)
  }

  listProduct() {
    return this.httpClient.get("http://localhost:3000/products")
  }

  deleteProduct(id: any) {
    return this.httpClient.delete("http://localhost:3000/products" + "/" + id)
  }

  getProduct(id: string) {
    return this.httpClient.get("http://localhost:3000/products" + "/" + id);
  }

  editProduct(id: any, data: any) {
    return this.httpClient.put("http://localhost:3000/products" + "/" + id, data);
  }

  popularProduct() {
    return this.httpClient.get("http://localhost:3000/products?_limit=3");
  }

  trendyProduct() {
    return this.httpClient.get("http://localhost:3000/products");
  }

  searchProduct(query: string) {
    return this.httpClient.get(`http://localhost:3000/products?q=${query}`);
  }

  localAddToCart(data: any) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data])
    }
    else {
      cartData = JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }

  }

  removeFromCart(productid: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: any[] = JSON.parse(cartData);
      items = items.filter((item: any) => productid !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: any) {
    return this.httpClient.post("http://localhost:3000/cart", cartData)
  }

  getCartList(userId: number) {
    return this.httpClient.get("http://localhost:3000/cart?userId=" + userId,
      { observe: 'response' }).subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }

  removeCart(cartId: number) {
    return this.httpClient.delete("http://localhost:3000/cart/" + cartId)
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.httpClient.get("http://localhost:3000/cart?userId="+userData.id)
  }

  orderNow(data:any){
    return this.httpClient.post("http://localhost:3000/orders",data)
  }

  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.httpClient.get("http://localhost:3000/orders?userId="+userData.id)
  }

  deleteCartItems(cartId:number){
    return this.httpClient.delete("http://localhost:3000/cart/" +cartId, {observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([])
      }
    })
  }

  cancleOrder(orderId:number){
    return this.httpClient.delete("http://localhost:3000/orders/"+orderId)
  }
}
