import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Router, RouterModule } from '@angular/router';
import { Product } from '../../interface/product';
import { MatTableModule } from '@angular/material/table';
import { PRODUCT } from '../../const/ServerConstants';
import { Category } from '../../interface/category';
import { CategoryService } from '../../services/category/category.service';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule, MatIcon, RouterModule, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  router = inject(Router);

  //Table configurations
  displayedColumns: string[] = ['name', 'category'];
  productDataSource:Product[] =[];

  categories: Category[]=[];

  constructor(){}

  ngOnInit(){
    

    //Carrega as categorias existentes
   this.loadCategories();

    this.productService.getAll()
    .subscribe(
      {
        next: (list) => {
          this.productDataSource = list as Product[];
          console.log(this.productDataSource);
        },
        error: (erro) => {
          alert("Erro ao obter a lista de produtos");
          console.log(erro)
        }
      }
    );
  }

  onRowClick(event:any){
    console.log(event);
    //Navega para tela de edição
    this.router.navigate([`/${PRODUCT}/detail/`+event.id]);
  }


  loadCategories() {
    this.categoryService.getAll()
    .subscribe(
      {
          next: (list:any) => {
            console.log(list);
            this.categories = list ;
           
          },
          error: (erro:any) => {
                  alert("Erro ao obter a lista de categorias");
                  console.log(erro)
          }
      });
   }
   
   getCategoryDescription(id:any) {
      let category = this.categories.filter(c => c.id == id);
      return category[0]?.name || "";
   }

}

