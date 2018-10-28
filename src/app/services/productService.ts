// import { Injectable } from '@angular/core';
// import { AuthService } from './authService';
// import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
// import { ProductForCreation } from '../models/productForCreation';
// import { Observable } from 'rxjs';
// import { ProductForDisplay } from '../models/productForDisplay';
// import { API_PRODUCTS_URL } from '../constants/enpoints';

// @Injectable()
// export class ProductService {
//   public token: string;

//   constructor(private http: HttpClient,
//     private authService: AuthService) {
//     this.token = this.authService.getToken();

//   }

//   public addProduct(productForCreation: ProductForCreation): Observable<any> {
//     const options = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + this.token
//       })
//     };

//     return this.http.post(API_PRODUCTS_URL, productForCreation, options);
//   }

//   public fetchProductsList(): Observable<any> {
//     const options = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + this.token
//       })
//     };

//     return this.http.get(API_PRODUCTS_URL, options);
//   }
  
//   public getProductById(id: number): Observable<any> {
//     const options = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + this.token
//       })
//     };

//     return this.http.get(API_PRODUCTS_URL + '/' + id, options);
//   }

  
//   public getProductByCategoryId(categoryId: number): Observable<any> {
//     const options = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + this.token
//       })
//     };

//     return this.http.get(API_PRODUCTS_URL + '/' + categoryId, options);
//   }
// }
