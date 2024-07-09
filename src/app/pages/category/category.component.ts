import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { Category } from '../../interface/category';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  router = inject(Router);

  //Table configurations
  displayedColumns: string[] = ['name'];
  categoryDataSource:Category[] =[];

  //Service
  categoyService = inject(CategoryService);
 

  constructor(){}

  ngOnInit(){

    this.categoyService.getAll()
    .subscribe(
      {
        next: (list) => {
          this.categoryDataSource = list as Category[];
        },
        error: (erro) => {
          alert("Erro ao obter a lista de categorias");
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
