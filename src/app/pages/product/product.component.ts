import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productService = inject(ProductService);
  router = inject(Router);

  productList:any =[];
  displayedColumns: string[] = [ 'name', 'category'];

  constructor(){}

  ngOnInit(){

    this.productService.getAll()
    .subscribe(
      {
        next: (list) => {
          this.productList = list;
        },
        error: (erro) => {
          alert("Erro ao obter a lista de produtos");
          console.log(erro)
        }
      }
    );
  }

}