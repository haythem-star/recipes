import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {
  @Input('recipe_item') recipe : Recipe;
  @Input() index : number;
  

  constructor(private recipeService : RecipeService,
    private router : Router) { }

  ngOnInit(): void {
  }

  // onSelect()
  // {
  //   // this.recipeService.recipeSelected.emit(this.recipe);
  //   const id :number = this.recipeService.getRecipeId(this.recipe);
  //   this.router.navigate(['/recipe',id]);

  // }

}
