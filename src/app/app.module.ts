import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule} from './app-routing.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { ShopingListComponent } from './shoping-list/shoping-list.component';
import { ShopingEditComponent } from './shoping-list/shoping-edit/shoping-edit.component';
import { DropdownDirective } from './share/dropdown.directive.directive';
import { Shoping_listService } from './shoping-list/shoping-list.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipes/recipe.service';
import {ShortenPipe} from './header/shorten.pipe';
import { FilterPipe } from './filter.pipe';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './share/loading-spinner/loading-spinner.component';
import { AuthInterceptor} from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    ShopingListComponent,
    ShopingEditComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    ShortenPipe,
    FilterPipe,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule
  ],
  providers: [Shoping_listService,RecipeService,{provide : HTTP_INTERCEPTORS,useClass : AuthInterceptor,multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
