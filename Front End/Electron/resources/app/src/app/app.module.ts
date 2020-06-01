import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import{ BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ToastrModule} from 'ngx-toastr'
import {AppRoutingModule} from './app-routing.module';
import {AddCustomerComponent} from './customers/add/addCustomer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AppComponent} from './app.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CustomerComponent} from './customers/customer.component';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import {GlobalService} from './shared/global.service';
import {AddProductComponent} from './products/add/AddProduct.component';
import {AddOrderComponent} from '../app/orders/add/AddOrder.component';
import {ProductComponent} from '../app/products/product.component';
import {OrderComponent} from '../app/orders/order.component';
import {EditOrderComponent} from './orders/edit/EditOrder.component';
import {EditProductComponent} from './products/edit/EditProduct.component';
import {EditCustomerComponent} from './customers/edit/EditCustomer.component';
import { MatNativeDateModule } from '@angular/material/core';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddComponent } from './suppliers/add/add.component';
import { EditComponent } from './suppliers/edit/edit.component';





@NgModule({
  declarations: [
    AppComponent,
    AddCustomerComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CustomerComponent,
    EditCustomerComponent,
    AddProductComponent,
    AddOrderComponent,
    OrderComponent,
    ProductComponent,
    EditOrderComponent,
    EditProductComponent,
    SuppliersComponent,
    AddComponent,
    EditComponent,

  ],
  imports: [
    AppRoutingModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,


  ],
  providers: [ GlobalService],
  bootstrap: [AppComponent]
})


export class AppModule {JwtHelperService}

