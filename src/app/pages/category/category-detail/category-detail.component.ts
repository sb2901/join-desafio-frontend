
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from '../../../interface/category';
import { CategoryService } from '../../../services/category/category.service';
import { CATEGORY } from '../../../const/ServerConstants';

import {ChangeDetectionStrategy} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatSelectModule, CommonModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class CategoryDetailComponent {

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  categoryService = inject(CategoryService);

  public categoryForm: any; 

  private categoryId:number=0;

  private category : Category ={
                  id:undefined,
                  name: "",
                  description: undefined
  };

  constructor(){ }

  ngOnInit() {
  

    // Propriedades do form
    this.loadForm();
    //id do produto
    this.loadCategoryId();
    //dados do produto
    this.loadValues();

  }

  loadValues(){
    if(this.isNewRecord()){
  
      this.category = {
        id:undefined,
        name: "",
        description: undefined
      };
      this.categoryForm.patchValue(this.category);
      
    }else{
      this.categoryService.get(this.categoryId)
      .subscribe(
        {
            next: (list:any) => {
              console.log(list);
              this.categoryForm.patchValue(list);
              this.category = list;
            },
            error: (erro:any) => {
                    alert("Erro ao obter a lista de product");
                    console.log(erro)
            }
        });
     }
   }

  /**
   * Salva o registro
   */
  onSubmit(){
    if(this.categoryForm.valid){
      console.log(this.categoryForm.value);

      if(this.isNewRecord()){
        this.saveAction();
      }else {
        this.updateAction();
      }
    }
  }

  saveAction(){
    this.categoryService.add(this.categoryForm.value)
    .subscribe(this.getSubscriptionSave());
  }

  updateAction(){
    this.categoryService.update(this.categoryForm.value)
    .subscribe(this.getSubscriptionSave());
  }

   /**
   * 
   * @returns Controla se novo registro ou existente
   */
  isNewRecord(){
    return !this.categoryId || this.categoryId<=0;
  }

  /**
   * 
   */
  loadCategoryId() {
    this.categoryId = parseInt(this.activeRoute.snapshot.params['id'], 10);
  }


   /**
  * Deleta o registro
  */
  onDelete() {
    if(!this.isNewRecord()){
      this.categoryService.delete(this.categoryId)
      .subscribe(
        {
            next: () => {
              this.router.navigate([CATEGORY]);
            },
            error: (erro:any) => {
                    alert("Erro");
                    console.log(erro)
            }
        });
    }
  } 

  /**
   * 
   * @returns Ação após inserir/salvar
   */
  getSubscriptionSave() {
    return  {
      next: (e:any) => {
        this.router.navigate([CATEGORY]);
      },
      error: (erro:any) => {
        console.log(erro)
      }
    };
  }

    /**
   * Carrega as propriedades do form
   */
  loadForm(){
      let fb = new FormBuilder();
      this.categoryForm = fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      id: [''],
      }) ;
  }


}
