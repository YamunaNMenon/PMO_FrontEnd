import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PmoUserComponent } from './components/pmo-user/pmo-user.component';
import { ListFilter } from './list-filter.pipe';
import { PmoProjectComponent } from './components/pmo-project/pmo-project.component';
import { PmoAddtaskComponent } from './components/pmo-task/pmo-addtask/pmo-addtask.component';
import { PmoViewtaskComponent } from './components/pmo-task/pmo-viewtask/pmo-viewtask.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PmoUserComponent,
    ListFilter,
    PmoProjectComponent,
    PmoAddtaskComponent,
    PmoViewtaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
