import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  userSignUpForm: FormGroup | any;
  userLoginForm: FormGroup | any;
  isLogin: boolean = false;
  alertText: boolean = false;
  isLoginError: boolean = false;
  constructor(private userService: UserService, private productService: ProductService) { }
  ngOnInit(): void {
    this.userSignUpForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
    this.userLoginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });

    this.userSignUpForm.get('email').valueChanges.subscribe((val: any) => {
      this.userService.checkUser(val).subscribe((result: any) => {
        if (result.length > 0) {
          this.alertText = true;
        }
        else {
          this.alertText = false;
        }
      })
    })
    this.userService.userAuthReload();
  }


  SubmitSignUp() {
    this.userService.checkUser(this.userSignUpForm.value.email).subscribe((result: any) => {
      if (result.length > 0) {
        this.alertText = true;
      }
      else {
        this.userService.UserSign(this.userSignUpForm.value);
      }
    })

  }


  SubmitLogin() {
    this.userService.UserLogin(this.userLoginForm.value);
    this.userService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.isLoginError = true;
      }
    })
    this.localCartToRemoteCart();
  }

  openLogin() {
    this.isLogin = true;
  }

  openSignUp() {
    this.isLogin = false;
  }

  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList:any[] = JSON.parse(data);
      cartDataList.forEach((product: any, index: number) => {
        let cartData = {
          ...product,
          productId: product.id,
          userId: userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if(result){
              console.log("item stored in DB");
            }
          })
        }, 500);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart')
        }
      })
    }
   

    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  
  }
}



