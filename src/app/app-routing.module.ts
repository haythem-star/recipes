import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import {RecipesComponent} from './recipes/recipes.component';
import {ShopingListComponent} from './shoping-list/shoping-list.component';
import {RecipesResolveService} from './recipes/recipes-resolve.service';
import { AuthComponent } from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {path : '' , redirectTo : '/recipe', pathMatch : 'full'},
    {path: 'recipe' , component: RecipesComponent, canActivate : [AuthGuard], 
    children:[
        {path : '', component : RecipeStartComponent},
        {path : 'new', component : RecipeEditComponent},
        {path : ':id', component : RecipesDetailComponent, resolve : [RecipesResolveService]},
        {path : ':id/edit', component : RecipeEditComponent, resolve : [RecipesResolveService]}
    ] },
    {path : 'shopingList' ,component: ShopingListComponent},
    {path : 'auth', component : AuthComponent}


];
@NgModule({
    imports : [RouterModule.forRoot(routes)],

    exports : [RouterModule]
})
export class RoutingModule {

}