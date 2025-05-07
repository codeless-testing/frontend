import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestBuilderComponent } from "./test-builder.component";
import { RouterModule, Routes } from "@angular/router";
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { CreateTestCaseComponent } from './create-test-case/create-test-case.component';
import { MatDialogModule } from '@angular/material/dialog';





const routes: Routes = [
  {
    path: ':id',
    component: TestBuilderComponent
  }
]

@NgModule({
  declarations: [
    TestBuilderComponent,
    CreateTestCaseComponent
  ],
  exports: [
    TestBuilderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatStepperModule,
    MatIconModule,
    NgxBootstrapIconsModule.pick(allIcons),
    MatDialogModule
  ],
})
export class TestBuilderModule { }
