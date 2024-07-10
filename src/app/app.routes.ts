import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryDetailComponent } from './pages/category/category-detail/category-detail.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductComponent } from './pages/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [

      {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full'
      },
      {
        path: 'error', 
        title: 'Erro inesperado',
        component: ErrorComponent, 
      },
      {
        path: 'home', 
        title: 'Cadastro de Categorias e Produtos',
        component: HomeComponent, 
      },
      {
        path: 'category', 
        title: 'Categoria',
        component: CategoryComponent, 
      },
      {
        path: 'category/detail/:id', 
        title: 'Detalhes da categoria',
        component: CategoryDetailComponent, 
      },
      {
        path: 'product', 
        title: 'Produto',
        component: ProductComponent, 
      },
      {
        path: 'product/detail/:id', 
        title: 'Detalhes do produto',
        component: ProductDetailComponent, 
      },
     
];
