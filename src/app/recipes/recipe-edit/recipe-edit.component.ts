import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { from } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id :number;
  editMode = false;
  recipeForm : FormGroup;

  constructor(private route : ActivatedRoute,
    private recipeService : RecipeService,
    private router :Router,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) =>{
        this.id=+params['id'];
        this.editMode=params['id'] != null;
        this.formInit();
      }
    );
  }

  get controls()
  {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit(){
    const newrecipe : Recipe = new Recipe(
     this.recipeForm.value['name'],
     this.recipeForm.value['description'],
     this.recipeForm.value['imgPath'],
     this.recipeForm.value['ingredients']
    );
    console.log(this.recipeForm.value)
    if (this.editMode){
      this.recipeService.updaterecipes(this.id,newrecipe);
    }else
    {
      this.recipeService.addRecipe(newrecipe);
    }
    this.onCancel();
  }
  AddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup ({
        'name' : new FormControl (null,Validators.required),
        'amount' : new FormControl (null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel()
  {
    this.router.navigate(['../'],{relativeTo: this.route});

  }

  onDeleteIngredient(index : number)
  {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  formInit(){
    let recipename = '';
    let ImgPath ='';
    let Description ='';
    let recipeIngredients = new FormArray([]);

    if(this.editMode)
    {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipename=recipe.name;
      ImgPath=recipe.imagePath;
      Description=recipe.description;
      if (recipe['ingredients'])
      {
        for (let ingredient of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name,Validators.required),
              'amount' : new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name' : new FormControl(recipename,Validators.required),
      'imgPath' : new FormControl(ImgPath,Validators.required),
      'description' : new FormControl(Description,Validators.required),
      'ingredients': recipeIngredients
    });
  }

}
