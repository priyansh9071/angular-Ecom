import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private httpClient: HttpClient, private router:Router) { }

  userSignUp(data:any){
    return this.httpClient.post("http://localhost:3000/seller",data,{observe:'response'}).subscribe((result)=>{
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['/seller-home'])
    });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }


  checkUser(email:string){
    return this.httpClient.get("http://localhost:3000/seller",{params: new HttpParams().set('email',email)})
  }


  userLogin(data:any){
      return this.httpClient.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
        console.log(result);
        if(result && result.body && result.body.length){
          localStorage.setItem('seller',JSON.stringify(result.body))
          this.router.navigate(['/seller-list-product'])
        }
        else{
            this.isLoginError.emit(true);
        }
      })
  }

  
}
