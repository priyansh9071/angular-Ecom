import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecom-project';
  // currentpath:boolean=false
  // constructor(private router: Router) {
    
  //   this.router.events.subscribe((_routerEvent:any)=>{
      
  //     if(_routerEvent instanceof NavigationEnd){
  //       console.log(this.router.url);
  //       if(this.router.url=="/"||this.router.url=="/seller-list-product"){
  //         this.currentpath=true;
  //       }
  //       else{
  //         this.currentpath=false;
  //       }
  //     }
  //   })
  // }
}
