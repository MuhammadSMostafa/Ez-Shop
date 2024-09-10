import { Routes } from '@angular/router';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';

// Lazy Loading Routes with Standalone Components
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/auth/auth.component').then(c => c.AuthComponent),
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent),
        title: 'Login'
      },
      {
        path: 'register',
        loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent),
        title: 'Register'
      },
      {
        path: 'forgotpassword',
        loadComponent: () => import('./components/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent),
        title: 'Forgot Password'
      }
    ]
  },

  {
    path: '',
    loadComponent: () => import('./layouts/blank/blank.component').then(c => c.BlankComponent),
    canActivate: [authGuard],
    children: [
      { path: 'home', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', component:HomeComponent,title: 'Home'
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent),
        title: 'Categories'
      },
      {
        path: 'products',
        loadComponent: () => import('./components/products/products.component').then(c => c.ProductsComponent),
        title: 'Products'
      },
      {
        path: 'wishlist',
        loadComponent: () => import('./components/wishlist/wishlist.component').then(c => c.WishlistComponent),
        title: 'Wishlist'
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent),
        title: 'Cart'
      },
      {
        path: 'payment/:id',
        loadComponent: () => import('./components/place-order/place-order.component').then(c => c.PlaceOrderComponent),
        title: 'Place Order'
      },
      {
        path: 'allorders',
        loadComponent: () => import('./components/orders/orders.component').then(c => c.OrdersComponent),
        title: 'Orders'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details.component').then(c => c.DetailsComponent),
        title: 'Product'
      },
      {
        path: 'brand/:id',
        loadComponent: () => import('./components/brand/brand.component').then(c => c.BrandComponent),
        title: 'Brand details'
      },
      {
        path: 'category/:id',
        loadComponent: () => import('./components/category/category.component').then(c => c.CategoryComponent),
        title: 'Category'
      }
    ]
  },

  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(c => c.NotFoundComponent),
    title: 'Not Found'
  }
];
