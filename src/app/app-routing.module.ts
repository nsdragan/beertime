import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreweriesComponent } from './breweries/breweries.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'breweries' },
  { path: 'breweries', component: BreweriesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
