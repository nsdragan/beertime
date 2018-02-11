import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule, MatSnackBarModule, MatTableModule, MatSidenavModule, MatListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BreweriesComponent } from './breweries/breweries.component';
import { BreweryService } from './services/brewery.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BeersComponent } from './beers/beers.component';


@NgModule({
  declarations: [
    AppComponent,
    BreweriesComponent,
    SidenavComponent,
    BeersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatTableModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatListModule
  ],
  providers: [    
    BreweryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
