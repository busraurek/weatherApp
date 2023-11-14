import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) { }

//GET
getProducts(productId?: number): Observable<any> {
  const url = productId ? `${this.apiUrl}/${productId}` : this.apiUrl;
  return this.http.get(url);
}

//POST
createProduct(productData: any): Observable<any> {
  let url = this.apiUrl +'/add'
  return this.http.post(url, productData);
}
//PUT
updateProduct(productId: number, updatedData: any): Observable<any> {
  const url = `${this.apiUrl}/${productId}`;
  return this.http.put(url, updatedData);
}

//DELETE
deleteProduct(productId: number): Observable<any> {
  const url = `${this.apiUrl}/${productId}`;
  return this.http.delete(url);
}
}
