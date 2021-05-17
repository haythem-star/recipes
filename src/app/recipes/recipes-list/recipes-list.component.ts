import { Component,  OnDestroy,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit , OnDestroy{
  subscription : Subscription;

  Recipes: Recipe[] ;

  constructor(private recipeService : RecipeService,
    private router :Router,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.Recipes=this.recipeService.getRecipe();
    this.subscription=this.recipeService.recipeChanged.subscribe(
      (recipes : Recipe[]) =>{
        this.Recipes=recipes;
      }
    );
  }

  onNewRecipe()
  {
    this.router.navigate(['new'],{relativeTo : this.route});

  }
  ngOnDestroy(){
    this.subscription.unsubscribe();

  }

}
