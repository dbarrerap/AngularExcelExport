import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ExampleTableComponent } from './components/example-table/example-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
