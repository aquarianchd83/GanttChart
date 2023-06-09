import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GaintChart } from 'src/helper/GaintChart';
import { GaintChartComponent } from './components/gaint-chart/gaint-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    GaintChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
