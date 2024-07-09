import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Router } from '@angular/router';
import { Product } from '../../interface/product';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productService = inject(ProductService);
  router = inject(Router);

  //Table configurations
  displayedColumns: string[] = ['name', 'category'];
  productDataSource:Product[] =[];

  constructor(){}

  ngOnInit(){

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
    this.router.navigate(['/category/detail/'+event.id]);
  }

}

