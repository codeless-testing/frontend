import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Route, RouterModule } from "@angular/router";
import { LayoutComponent } from './core/layout/layout.component';

import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';

const router: Route[] = [
  {
    path: '',
    loadChildren: () => import('./tests-list/tests-list.module').then(mod => mod.TestsListModule),
  },
  {
    path: 'test-builder',
    loadChildren: () => import('./test-builder/test-builder.module').then(mod => mod.TestBuilderModule),
  }
]


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(router),
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
