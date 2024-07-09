import { Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../interface/product';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PRODUCT } from '../../../const/ServerConstants';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  productService = inject(ProductService);

  public productForm: any; 

  private productId:number=0;

  private product : Product ={
                  id:undefined,
                  name: "",
                  category: undefined
  };

  constructor(){ }

  ngOnInit() {

    // Propriedades do form
    this.loadForm();
    //id do produto
    this.loadProductId();
    //dados do produto
    this.loadValues();

  }

  loadValues(){
    if(this.isNewRecord()){
  
      this.product = {
        id:undefined,
        name: "",
        category: undefined
      };
      this.productForm.patchValue(this.product);
      
    }else{
      this.productService.get(this.productId)
      .subscribe(
        {
            next: (list:any) => {
              console.log(list);
              this.productForm.patchValue(list);
              this.product = list;
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
    if(this.productForm.valid){
      console.log(this.productForm.value);

      if(this.isNewRecord()){
        this.saveAction();
      }else {
        this.updateAction();
      }
    }
  }

  saveAction(){
    this.productService.add(this.productForm.value)
    .subscribe(this.getSubscriptionSave());
  }

  updateAction(){
    this.productService.update(this.productForm.value)
    .subscribe(this.getSubscriptionSave());
  }

   /**
   * 
   * @returns Controla se novo registro ou existente
   */
  isNewRecord(){
    return !this.productId || this.productId<=0;
  }

  /**
   * 
   */
  loadProductId() {
    this.productId = parseInt(this.activeRoute.snapshot.params['id'], 10);
  }


   /**
  * Deleta o registro
  */
  onDelete() {
    if(!this.isNewRecord()){
      this.productService.delete(this.productId)
      .subscribe(
        {
            next: () => {
              this.router.navigate([PRODUCT]);
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
        this.router.navigate([PRODUCT]);
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
      this.productForm = fb.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      id: [''],
      category: new FormControl('', []),
      }) ;
  }


}
