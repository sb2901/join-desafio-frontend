import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryDetailComponent } from './pages/category/category-detail/category-detail.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductComponent } from './pages/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/error/error.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [

      {
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full',
        
      },
      {
        path: 'signup', 
        title: 'Erro inesperado',
        component: RegisterComponent, 
        
      },
      {
        path: 'login', 
        title: 'Erro inesperado',
        component: LoginComponent, 
        
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
        canActivate: [authGuard]
      },
      {
        path: 'category', 
        title: 'Categoria',
        component: CategoryComponent, 
        canActivate: [authGuard]
      },
      {
        path: 'category/detail/:id', 
        title: 'Detalhes da categoria',
        component: CategoryDetailComponent, 
        canActivate: [authGuard]
      },
      {
        path: 'product', 
        title: 'Produto',
        component: ProductComponent, 
        canActivate: [authGuard]
      },
      {
        path: 'product/detail/:id', 
        title: 'Detalhes do produto',
        component: ProductDetailComponent, 
        canActivate: [authGuard]
      },
     
];
