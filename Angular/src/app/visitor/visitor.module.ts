import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitorPageComponent } from './visitor-page/visitor-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatModule } from '../sharedModule/mat/mat.module';

const routes: Routes = [
  {
    path: '', component: VisitorPageComponent, pathMatch:'full'

  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatModule,
    RouterModule.forChild(routes)
  ]
})
export class VisitorModule { }
