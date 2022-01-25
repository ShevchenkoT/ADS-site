import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePageComponent } from './create-page/create-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PostsPageComponent } from './posts-page/posts-page.component';

const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: PostsPageComponent },
      { path: 'create', component: CreatePageComponent },
      { path: 'detail/:id', component: DetailPageComponent },
      { path: 'edit/:id', component: EditPageComponent },
      // { path: 'wish-list', component: WishListComponent },
    ]
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
