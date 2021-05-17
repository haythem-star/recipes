import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../share/ingredient.model'
import { Shoping_listService } from './shoping-list.service'

@Component({
  selector: 'app-shoping-list',
  templateUrl: './shoping-list.component.html',
  styleUrls: ['./shoping-list.component.css']
})
export class ShopingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[];
  Idchanges : Subscription;

  constructor(private shoping_listService : Shoping_listService) { }

  ngOnInit(): void {
    this.ingredients=this.shoping_listService.getIngredients();
    this.Idchanges=this.shoping_listService.ingredientsChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients= ingredients;
      }
    );
  }

  ngOnDestroy(){
    this.Idchanges.unsubscribe();
  }

  onEditIngredient(index : number)
  {
    this.shoping_listService.EditIngredient.next(index);
  }

}
