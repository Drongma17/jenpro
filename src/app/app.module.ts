import { RegisterComponent } from './dashboard/admindashboard/register/register.component';
import { UserdashboardComponent } from './dashboard/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './dashboard/admindashboard/admindashboard.component';
import { UpdateEventComponent } from './component/events/update-event/update-event.component';
import { CreateEventComponent } from './component/events/create-event/create-event.component';
import { ListEventComponent } from './component/events/list-event/list-event.component';
import { LoginComponent } from './auth/login/login.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { NavigationsComponent } from './common/navigations/navigations.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntrepreneursComponent } from './component/entrepreneurs/entrepreneurs.component';
import { AddComponent } from './component/entrepreneurs/add/add.component';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ListComponent } from './component/entrepreneurs/list/list.component';
import { UpdateComponent } from './component/entrepreneurs/update/update.component';
import { EntrepreneurPipe } from './shared/pipe/entrepreneur.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EventsComponent } from './component/events/events.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { CreateGalleryComponent } from './component/gallery/create-gallery/create-gallery.component';
import { ListGalleryComponent } from './component/gallery/list-gallery/list-gallery.component';
import { UpdateGalleryComponent } from './component/gallery/update-gallery/update-gallery.component';
import { GuestComponent } from './component/guest/guest.component';
import { AddGuestComponent } from './component/guest/add-guest/add-guest.component';
import { UpdateGuestComponent } from './component/guest/update-guest/update-guest.component';
import { ListGuestComponent } from './component/guest/list-guest/list-guest.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';
import { AgmCoreModule } from '@agm/core';
import { DetailsComponent } from './component/entrepreneurs/details/details.component';
import { DetailGuestComponent } from './component/guest/detail-guest/detail-guest.component';
import { DetailGalleryComponent } from './component/gallery/detail-gallery/detail-gallery.component';
import { HomeComponent } from './common/home/home.component';
import { AnnounceComponent } from './common/announce/announce.component';
import { AddAnnounceComponent } from './common/announce/add-announce/add-announce.component';
import { UpdateAnnounceComponent } from './common/announce/update-announce/update-announce.component';
import { ListAnnounceComponent } from './common/announce/list-announce/list-announce.component';
import { DetailEventComponent } from './component/events/detail-event/detail-event.component';
import { UpdateuserComponent } from './dashboard/admindashboard/updateuser/updateuser.component';
import { ListuserComponent } from './dashboard/admindashboard/listuser/listuser.component';
import { FinanceComponent } from './component/finance/finance.component';
import { CreateFinanceComponent } from './component/finance/create-finance/create-finance.component';
import { ListFinanceComponent } from './component/finance/list-finance/list-finance.component';
import { UpdateFinanceComponent } from './component/finance/update-finance/update-finance.component';
import { AddCategoryComponent } from './component/entrepreneurs/category/add-category/add-category.component';
import { ListCategoryComponent } from './component/entrepreneurs/category/list-category/list-category.component';
import { UpdateCategoryComponent } from './component/entrepreneurs/category/update-category/update-category.component';
import { EventsPipe } from './shared/pipe/events.pipe';
import { CategoryPipe } from './shared/pipe/category.pipe';
import { SingleComponent } from './component/entrepreneurs/single/single.component';
import { CreateInvestmentComponent } from './component1/investment/create-investment/create-investment.component';
import { ListInvestmentComponent } from './component1/investment/list-investment/list-investment.component';
import { UpdateInvestmentComponent } from './component1/investment/update-investment/update-investment.component';
import { DetailInvestmentComponent } from './component1/investment/detail-investment/detail-investment.component';
import { CreateinvestmentFinanceComponent } from './component1/investment/finance/createinvestment-finance/createinvestment-finance.component';
import { ListinvestmentFinanceComponent } from './component1/investment/finance/listinvestment-finance/listinvestment-finance.component';
import { UpdateinvestmentFinanceComponent } from './component1/investment/finance/updateinvestment-finance/updateinvestment-finance.component';
import { InvestmentPipe } from './shared/pipe/investment.pipe';
import { CreateEhubComponent } from './component1/ehub/create-ehub/create-ehub.component';
import { ListEhubComponent } from './component1/ehub/list-ehub/list-ehub.component';
import { UpdateEhubComponent } from './component1/ehub/update-ehub/update-ehub.component';
import { CreateSteComponent } from './component1/ste/create-ste/create-ste.component';
import { ListSteComponent } from './component1/ste/list-ste/list-ste.component';
import { UpdateSteComponent } from './component1/ste/update-ste/update-ste.component';
import { CreateBusinessacComponent } from './component1/businessac/create-businessac/create-businessac.component';
import { ListBusinessacComponent } from './component1/businessac/list-businessac/list-businessac.component';
import { UpdateBusinessacComponent } from './component1/businessac/update-businessac/update-businessac.component';
import { CreateEfinanceComponent } from './component1/ehub/ehubfinance/create-efinance/create-efinance.component';
import { ListEfinanceComponent } from './component1/ehub/ehubfinance/list-efinance/list-efinance.component';
import { UpdateEfinanceComponent } from './component1/ehub/ehubfinance/update-efinance/update-efinance.component';
import { EhubPipe } from './shared/pipe/ehub.pipe';
import { CreateStefinanceComponent } from './component1/ste/stefinance/create-stefinance/create-stefinance.component';
import { ListStefinanceComponent } from './component1/ste/stefinance/list-stefinance/list-stefinance.component';
import { UpdateStefinanceComponent } from './component1/ste/stefinance/update-stefinance/update-stefinance.component';
import { StePipe } from './shared/pipe/ste.pipe';
import { SteDetailComponent } from './component1/ste/ste-detail/ste-detail.component';
import { DetailEhubComponent } from './component1/ehub/detail-ehub/detail-ehub.component';
import { DetailBusinessacComponent } from './component1/businessac/detail-businessac/detail-businessac.component';
import { CreateBafinanceComponent } from './component1/businessac/bafinance/create-bafinance/create-bafinance.component';
import { ListBafinanceComponent } from './component1/businessac/bafinance/list-bafinance/list-bafinance.component';
import { BusinessacPipe } from './shared/pipe/businessac.pipe';
import { CreateEhubcategoryComponent } from './component1/ehub/ehubcategory/create-ehubcategory/create-ehubcategory.component';
import { ListEhubcategoryComponent } from './component1/ehub/ehubcategory/list-ehubcategory/list-ehubcategory.component';
import { UpdateEhubcategoryComponent } from './component1/ehub/ehubcategory/update-ehubcategory/update-ehubcategory.component';
import { CreateInvestmentcategoryComponent } from './component1/investment/investmentcategory/create-investmentcategory/create-investmentcategory.component';
import { ListInvestmentcategoryComponent } from './component1/investment/investmentcategory/list-investmentcategory/list-investmentcategory.component';
import { UpdateInvestmentcategoryComponent } from './component1/investment/investmentcategory/update-investmentcategory/update-investmentcategory.component';
import { CreateBacategoryComponent } from './component1/businessac/bacategory/create-bacategory/create-bacategory.component';
import { ListBacategoryComponent } from './component1/businessac/bacategory/list-bacategory/list-bacategory.component';
import { UpdateBacategoryComponent } from './component1/businessac/bacategory/update-bacategory/update-bacategory.component';
import { CreateStecategoryComponent } from './component1/ste/stecategory/create-stecategory/create-stecategory.component';
import { ListStecategoryComponent } from './component1/ste/stecategory/list-stecategory/list-stecategory.component';
import { UpdateStecategoryComponent } from './component1/ste/stecategory/update-stecategory/update-stecategory.component';
import { BadetailComponent } from './component1/businessac/badetail/badetail.component';
import { BasingleComponent } from './component1/businessac/basingle/basingle.component';
import { AllEhubComponent } from './component1/ehub/all-ehub/all-ehub.component';
import { SingleEhubComponent } from './component1/ehub/single-ehub/single-ehub.component';
import { AllInvestmentComponent } from './component1/investment/all-investment/all-investment.component';
import { SingleInvestmentComponent } from './component1/investment/single-investment/single-investment.component';
import { AllSteComponent } from './component1/ste/all-ste/all-ste.component';
import { SingleSteComponent } from './component1/ste/single-ste/single-ste.component';
import { UpdateBafinanceComponent } from './component1/businessac/bafinance/update-bafinance/update-bafinance.component';
import { CreateAllocateComponent } from './component/entrepreneurs/allocate/create-allocate/create-allocate.component';
import { ListAllocateComponent } from './component/entrepreneurs/allocate/list-allocate/list-allocate.component';
import { UpdateAllocateComponent } from './component/entrepreneurs/allocate/update-allocate/update-allocate.component';
import { CreateEhuballocateComponent } from './component1/ehub/allocate/create-ehuballocate/create-ehuballocate.component';
import { ListEhuballocateComponent } from './component1/ehub/allocate/list-ehuballocate/list-ehuballocate.component';
import { UpdateEhuballocateComponent } from './component1/ehub/allocate/update-ehuballocate/update-ehuballocate.component';
import { CreateInvestmentallocateComponent } from './component1/investment/allocate/create-investmentallocate/create-investmentallocate.component';
import { ListInvestmentallocateComponent } from './component1/investment/allocate/list-investmentallocate/list-investmentallocate.component';
import { UpdateInvestmentallocateComponent } from './component1/investment/allocate/update-investmentallocate/update-investmentallocate.component';
import { CreateSteallocateComponent } from './component1/ste/allocate/create-steallocate/create-steallocate.component';
import { ListSteallocateComponent } from './component1/ste/allocate/list-steallocate/list-steallocate.component';
import { UpdateSteallocateComponent } from './component1/ste/allocate/update-steallocate/update-steallocate.component';
import { CreateBaallocateComponent } from './component1/businessac/allocate/create-baallocate/create-baallocate.component';
import { ListBaallocateComponent } from './component1/businessac/allocate/list-baallocate/list-baallocate.component';
import { UpdateBaallocateComponent } from './component1/businessac/allocate/update-baallocate/update-baallocate.component';
import { ScrollingModule} from '@angular/cdk/scrolling';
import { MatCardModule} from '@angular/material';
import { ListHomeComponent } from './common/home/list-home/list-home.component';
import { DetailHomeComponent } from './common/home/detail-home/detail-home.component';
import { CreateCustomerComponent } from './snowbank/customers/create-customer/create-customer.component';
import { ListCustomerComponent } from './snowbank/customers/list-customer/list-customer.component';
import { UpdateCustomerComponent } from './snowbank/customers/update-customer/update-customer.component';
import { CreateLendmoneyComponent } from './snowbank/lendmoney/create-lendmoney/create-lendmoney.component';
import { ListLendmoneyComponent } from './snowbank/lendmoney/list-lendmoney/list-lendmoney.component';
import { UpdateLendmoneyComponent } from './snowbank/lendmoney/update-lendmoney/update-lendmoney.component';
import { SnowbankPipe } from './snowbank/pipe/snowbank.pipe';
import { CreateReturnmoneyComponent } from './snowbank/returnmoney/create-returnmoney/create-returnmoney.component';
import { ListReturnmoneyComponent } from './snowbank/returnmoney/list-returnmoney/list-returnmoney.component';
import { UpdateReturnmoneyComponent } from './snowbank/returnmoney/update-returnmoney/update-returnmoney.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { CreateSubcategoryComponent } from './component/entrepreneurs/subcategory/create-subcategory/create-subcategory.component';
import { ListSubcategoryComponent } from './component/entrepreneurs/subcategory/list-subcategory/list-subcategory.component';
import { UpdateSubcategoryComponent } from './component/entrepreneurs/subcategory/update-subcategory/update-subcategory.component';
import { DetailCustomerComponent } from './snowbank/customers/detail-customer/detail-customer.component';
import { CreateSbcategoryComponent } from './snowbank/category/create-sbcategory/create-sbcategory.component';
import { ListSbcategoryComponent } from './snowbank/category/list-sbcategory/list-sbcategory.component';
import { UpdateSbcategoryComponent } from './snowbank/category/update-sbcategory/update-sbcategory.component';
import { AllsnowbankComponent } from './snowbank/allsnowbank/allsnowbank.component';
import { SinglesnowbankComponent } from './snowbank/singlesnowbank/singlesnowbank.component';
import { CreaeApplicationComponent } from './component/application/creae-application/creae-application.component';
import { ListApplicationComponent } from './component/application/list-application/list-application.component';
import { DetailApplicationComponent } from './component/application/detail-application/detail-application.component';

@NgModule({
  declarations: [
    AppComponent,
    EntrepreneursComponent,
    AddComponent,
    ListComponent,
    UpdateComponent,
    NavigationsComponent,
    NotfoundComponent,
    EntrepreneurPipe,
    LoginComponent,
    EventsComponent,
    CreateEventComponent,
    UpdateEventComponent,
    ListEventComponent,
    GalleryComponent,
    CreateGalleryComponent,
    ListGalleryComponent,
    UpdateGalleryComponent,
    GuestComponent,
    AddGuestComponent,
    UpdateGuestComponent,
    ListGuestComponent,
   RegisterComponent,
   DetailsComponent,
   DetailGuestComponent,
   DetailGalleryComponent,
   HomeComponent,
   AnnounceComponent,
   AddAnnounceComponent,
   UpdateAnnounceComponent,
   ListAnnounceComponent,
   AdmindashboardComponent,
   UserdashboardComponent,
   DetailEventComponent,
   UpdateuserComponent,
   ListuserComponent,
   FinanceComponent,
   CreateFinanceComponent,
   ListFinanceComponent,
   UpdateFinanceComponent,
   AddCategoryComponent,
   ListCategoryComponent,
   UpdateCategoryComponent,
   EventsPipe,
   CategoryPipe,
   SingleComponent,
   CreateInvestmentComponent,
   ListInvestmentComponent,
   UpdateInvestmentComponent,
   DetailInvestmentComponent,
   CreateinvestmentFinanceComponent,
   ListinvestmentFinanceComponent,
   UpdateinvestmentFinanceComponent,
   InvestmentPipe,
   CreateEhubComponent,
   ListEhubComponent,
   UpdateEhubComponent,
   CreateSteComponent,
   ListSteComponent,
   UpdateSteComponent,
   CreateBusinessacComponent,
   ListBusinessacComponent,
   UpdateBusinessacComponent,
   CreateEfinanceComponent,
   ListEfinanceComponent,
   UpdateEfinanceComponent,
   EhubPipe,
   CreateStefinanceComponent,
   ListStefinanceComponent,
   UpdateStefinanceComponent,
   StePipe,
   SteDetailComponent,
   DetailEhubComponent,
   DetailBusinessacComponent,
   CreateBafinanceComponent,
   ListBafinanceComponent,
   BusinessacPipe,
   CreateEhubcategoryComponent,
   ListEhubcategoryComponent,
   UpdateEhubcategoryComponent,
   CreateInvestmentcategoryComponent,
   ListInvestmentcategoryComponent,
   UpdateInvestmentcategoryComponent,
   CreateBacategoryComponent,
   ListBacategoryComponent,
   UpdateBacategoryComponent,
   CreateStecategoryComponent,
   ListStecategoryComponent,
   UpdateStecategoryComponent,
   BadetailComponent,
   BasingleComponent,
   AllEhubComponent,
   SingleEhubComponent,
   AllInvestmentComponent,
   SingleInvestmentComponent,
   AllSteComponent,
   SingleSteComponent,
   UpdateBafinanceComponent,
   CreateAllocateComponent,
   ListAllocateComponent,
   UpdateAllocateComponent,
   CreateEhuballocateComponent,
   ListEhuballocateComponent,
   UpdateEhuballocateComponent,
   CreateInvestmentallocateComponent,
   ListInvestmentallocateComponent,
   UpdateInvestmentallocateComponent,
   CreateSteallocateComponent,
   ListSteallocateComponent,
   UpdateSteallocateComponent,
   CreateBaallocateComponent,
   ListBaallocateComponent,
   UpdateBaallocateComponent,
   ListHomeComponent,
   DetailHomeComponent,
   CreateCustomerComponent,
   ListCustomerComponent,
   UpdateCustomerComponent,
   CreateLendmoneyComponent,
   ListLendmoneyComponent,
   UpdateLendmoneyComponent,
   SnowbankPipe,
   CreateReturnmoneyComponent,
   ListReturnmoneyComponent,
   UpdateReturnmoneyComponent,
   CreateSubcategoryComponent,
   ListSubcategoryComponent,
   UpdateSubcategoryComponent,
   DetailCustomerComponent,
   CreateSbcategoryComponent,
   ListSbcategoryComponent,
   UpdateSbcategoryComponent,
   AllsnowbankComponent,
   SinglesnowbankComponent,
   CreaeApplicationComponent,
   ListApplicationComponent,
   DetailApplicationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    DataTablesModule,
    ScrollingModule,
    MatCardModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
