import { Component,   OnDestroy,   OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/share/ingredient.model';
import { Shoping_listService } from '../shoping-list.service';

@Component({
  selector: 'app-shoping-edit',
  templateUrl: './shoping-edit.component.html',
  styleUrls: ['./shoping-edit.component.css']
})
export class ShopingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) editForm : NgForm;
  subscription : Subscription;
  editItemIndex : number;
  EditMode = false;
  editItem : Ingredient;

  

  constructor(private shoping_listService : Shoping_listService) { }

  ngOnInit(): void {
    this.subscription=this.shoping_listService.EditIngredient.subscribe(
      (index : number) => {
        this.EditMode = true;
        this.editItemIndex= index;
        this.editItem= this.shoping_listService.getIngredientById(index);
        this.editForm.setValue({
          name : this.editItem.name,
          amount : this.editItem.amount
        })

      }
    );
  }

  onSubmit(form : NgForm){
    
      const value = form.value;
      const name = value.name;
      const amount = value.amount;
      const newIngredient : Ingredient = new Ingredient(name,amount);
      if(this.EditMode)
      {
        this.shoping_listService.UpdateIngredient(this.editItemIndex,newIngredient);
      }else
      {
        this.shoping_listService.AddIngredient(newIngredient);
      }
      this.editForm.reset();
      this.EditMode = false;

    
    

  }

  onClear()
  {
      this.editForm.reset();
      this.EditMode = false;

  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.onClear();
    this.shoping_listService.deleteIngredient(this.editItemIndex);
  }

}
