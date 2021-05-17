import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../share/ingredient.model'

export class Shoping_listService{
    ingredientsChanged = new Subject<Ingredient[]>();
    EditIngredient = new Subject<number>();
    private ingredients : Ingredient[]= [
        new Ingredient('Appel',5),
        new Ingredient('Tomatoes',10)
    
      ];
      getIngredientById(index : number) : Ingredient
      {
          return this.ingredients[index]

      }
      getIngredients(){
          return this.ingredients.slice();
      }

      AddIngredient (newIngredient : Ingredient){
          this.ingredients.push(newIngredient);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      Addingredients(ingredients : Ingredient[])
      {
          this.ingredients.push(...ingredients);
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      UpdateIngredient(index : number,newIngredient : Ingredient)
      {
          this.ingredients[index]= newIngredient;
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      deleteIngredient(index : number){
          this.ingredients.splice(index,1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }


}