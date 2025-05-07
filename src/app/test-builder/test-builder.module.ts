import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestBuilderComponent} from "./test-builder.component";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '',
    component: TestBuilderComponent
  }
]

@NgModule({
  declarations: [
    TestBuilderComponent
  ],
  exports: [
    TestBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class TestBuilderModule { }
