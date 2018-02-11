import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BreweriesComponent } from './breweries/breweries.component';
import { BeersComponent } from './beers/beers.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'breweries' },
  { path: 'breweries', component: BreweriesComponent },
  { path: 'beers', component: BeersComponent },
  { path: 'beers/:search', component: BeersComponent },
  { path: 'beerdetails', component: BeerDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
