import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Shoping_listService } from 'src/app/shoping-list/shoping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {

  // @Input() recipe : Recipe;
  recipe : Recipe;
  id : number;

  constructor(private shopingListService : Shoping_listService,
    private recipeService :RecipeService, 
    private route : ActivatedRoute,
    private router :Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{
        this.id=+params['id'];
        this.recipe=this.recipeService.getRecipeById(this.id);
        
      }
    );
  }

  addToShopingList(){
    // for (let ingredient of this.recipe.ingredients)
    // {
    //   this.shopingListService.AddIngredient(ingredient.name,ingredient.amount);
    // }
    this.shopingListService.Addingredients(this.recipe.ingredients);

  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo : this.route});
  }

  onDelete()
  {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo : this.route});
  }

}
