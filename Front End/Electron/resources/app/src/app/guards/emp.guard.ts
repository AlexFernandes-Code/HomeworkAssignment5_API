import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../shared/global.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EmpGuard implements CanActivate {

  constructor (public service : GlobalService,  private toastr : ToastrService){

  }

  canActivate() {
    this.service.isLoggedIn(this.service.User?.GUID);
    if (this.service.LoggedIn == true)
    {
    if (this.service.User?.TypeID == 1 || this.service.User?.TypeID == 2)
      return true;
      else{
        this.toastr.toastrConfig.positionClass = 'toast-top-center';
        this.toastr.toastrConfig.timeOut = 1000;
        this.toastr.error("Unauthorized access. Please login.")
        return false;
    }
  }
  else{
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
    this.toastr.toastrConfig.timeOut = 1000;
    this.toastr.error("Please re-login.")
    return false;
  }
  }

}
