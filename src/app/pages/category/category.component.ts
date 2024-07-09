import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categoyService = inject(CategoryService);
  router = inject(Router);

  categoryList:any =[];
  displayedColumns: string[] = [ 'name'];

  constructor(){}

  ngOnInit(){

    this.categoyService.getAll()
    .subscribe(
      {
        next: (list) => {
          this.categoryList = list;
        },
        error: (erro) => {
          alert("Erro ao obter a lista de categorias");
          console.log(erro)
        }
      }
    );
  }

}
