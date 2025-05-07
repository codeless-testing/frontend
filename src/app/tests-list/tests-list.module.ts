import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestsListComponent } from './tests-list.component';
import { RouterModule, Routes } from "@angular/router";
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

const routes: Routes = [
  {
    path: '',
    component: TestsListComponent
  }
]

@NgModule({
  declarations: [
    TestsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxBootstrapIconsModule.pick(allIcons),
  ]
})
export class TestsListModule { }
