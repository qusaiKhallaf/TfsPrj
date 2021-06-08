
 import { BrowserModule } from '@angular/platform-browser';
 import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './shareComponent/test/test.component';
import { BackendServiceService } from './Services/backend-service.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ChartsModule} from 'ng2-charts';
import { BarchartComponent } from './barchart/barchart/barchart.component';
import { AnimationComponent } from './animations/animation/animation.component';
import { MatModule } from './sharedModule/mat/mat.module';


import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './shareComponent/admin/admin.component';
import { VisitorComponent } from './shareComponent/visitor/visitor.component';
import { VisitorDetailsComponent } from './shareComponent/visitor-details/visitor-details.component';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    BarchartComponent,
    AnimationComponent,
    AdminComponent,
    VisitorComponent,
    VisitorDetailsComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ChartsModule,
    MatModule,
    // MatTreeModule,
    // MatIconModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
   
  ],
  providers: [
    BackendServiceService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
