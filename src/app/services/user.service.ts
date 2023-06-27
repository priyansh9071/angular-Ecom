import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoginError = new EventEmitter<boolean>(false);
  constructor(private httpClient: HttpClient, private router:Router) { }

    UserSign(data:any){
      return this.httpClient.post("http://localhost:3000/Users",data,{observe:'response'}).subscribe((result)=>{
        console.log(result);
        if(result){
          localStorage.setItem('user',JSON.stringify(result.body));
          this.router.navigate(['/'])
        }
      })
    }

    checkUser(email:string){
      return this.httpClient.get("http://localhost:3000/Users",{params: new HttpParams().set('email',email)});
    }

    userAuthReload(){
      if(localStorage.getItem('user')){
        this.router.navigate(['/'])
      }
    }

    UserLogin(data:any){
      return this.httpClient.get(`http://localhost:3000/Users?email=${data.email}&&password=${data.password}`,{observe:'response'}).subscribe((result:any)=>{
        if(result && result.body && result.body.length){
          localStorage.setItem('user',JSON.stringify(result.body[0]));
          this.router.navigate(['/'])
        }
        else{
          this.isLoginError.emit(true);
        }
      });
    }
}
