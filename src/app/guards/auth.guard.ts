import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService
  ){}
  canActivate(){
    if(this.auth.isLoggedIn()){
      return true;
    }
    else {
      this.toast.warning({detail:'Error', summary:'Please Login'});
      this.router.navigate(['login']);
      return false;
    }
  }

}
