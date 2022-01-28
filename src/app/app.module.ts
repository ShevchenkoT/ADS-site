import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { PostFilterPipe } from './shared/post-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EditPageComponent,
    DetailPageComponent,
    PostsPageComponent,
    CreatePageComponent,
    PostFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
