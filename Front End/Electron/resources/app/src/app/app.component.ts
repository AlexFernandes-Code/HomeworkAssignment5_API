import { Component } from '@angular/core';
import { GlobalService } from './shared/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'hw2';

constructor(public service : GlobalService, private toastr : ToastrService) {

}


onSubmit(){
  this.service.Logout(this.service.User.GUID).then(value =>
    {
      if (this.service.User == null)     {
        this.toastr.warning("You are now logged out!") ;
      }
      else {
        this.toastr.error("Logout failed")
      }

    })
}

}

