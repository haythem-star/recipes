import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../share/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
    recipeChanged = new Subject<Recipe[]>();
    recipeSelected = new EventEmitter<Recipe>();
    // private Recipes: Recipe[] =[
    //     new Recipe('Classic Smashed Cheeseburger',
    //     'We ve got the secret to cooking a burger that s crispy on the outside, yet juicy on the inside',
    //     'https://media1.s-nbcnews.com/j/newscms/2019_21/2870431/190524-classic-american-cheeseburger-ew-207p_d9270c5c545b30ea094084c7f2342eb4.fit-2000w.jpg',
    //     [
    //         new Ingredient('Meat' , 1),
    //         new Ingredient ('french Fries',20)
    //     ]),
    //     new Recipe('Gaelic Flip',
    //     'From “King Cocktail” Dale DeGroff comes this bright mix of blended Irish whiskey',
    //     'https://www.liquor.com/thmb/MOsbQG2uw-jB5Dn82w_nYXk6iho=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/mai-tai-720x720-primary-e09e24f1cacd4b3896f5aa32ba51dcdd.jpg',
    //     [
    //         new Ingredient ('ice' ,5),
    //         new Ingredient ('milk', 1),
    //         new Ingredient('Lemon',2)
    //     ])
    //   ];

    private Recipes : Recipe[] = [];

    getRecipe ()
    {
        return this.Recipes.slice();
    } 

    setRecipes(recipes : Recipe[])
    {
        this.Recipes= recipes;
        this.recipeChanged.next(this.Recipes.slice());

    }
    
    getRecipeById(id : number){
        return this.Recipes[id];
    }

    getRecipeId(recipe : Recipe)
    {
        return this.Recipes.indexOf(recipe);
        // console.log('index of this recipe is : '+this.Recipes.indexOf(recipe));
    }
    addRecipe(recipe : Recipe){
        this.Recipes.push(recipe);
        this.recipeChanged.next(this.Recipes.slice());
    }

    updaterecipes(index : number,newRecipe : Recipe){
        this.Recipes[index]=newRecipe;
        this.recipeChanged.next(this.Recipes.slice());
    }

    deleteRecipe(index :number)
    {
        this.Recipes.splice(index);
        this.recipeChanged.next(this.Recipes.slice());
    }
}