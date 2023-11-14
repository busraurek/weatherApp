import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  fetchedProduct: any;
  newProduct: any = {};
  createdProduct: any;
  updateProductId: any;
  updatedProduct: any;
  deletedProductId: any;

  constructor(private crudService:CrudService) { }

  ngOnInit() {
  }

  fetchProduct(productId: number) {
    this.crudService.getProducts(productId).subscribe(
      product => {
        this.fetchedProduct = product;
      },
      error => {
        console.error('Ürün bulunamadı:', error);
      }
    );
  }

  createProduct() {
    // Servis çağrısını gerçekleştir ve yeni ürün bilgilerini içeren nesneyi gönder
    this.crudService.createProduct(this.newProduct).subscribe(
      createdProduct => {
        this.createdProduct = createdProduct;
      },
      error => {
        console.error('Yeni ürün oluşturulamadı:', error);
      }
    );
  }


  updateProduct(productId: number) {
    const updatedData = {
      title: 'Güncellenmiş Ürün',
      description: 'Güncellenmiş Açıklama',
      price: 99.99,
      // Diğer güncellenecek alanları ekleyin
    };

    this.crudService.updateProduct(productId, updatedData).subscribe(
      updatedProduct => {
        this.updatedProduct = updatedProduct;
      },
      error => {
        console.error('Ürün güncellenemedi:', error);
      }
    );
  }
  deleteProduct(productId: number) {
    this.crudService.deleteProduct(productId).subscribe(
      () => {
        console.log('Ürün başarıyla silindi.');
      },
      error => {
        console.error('Ürün silinemedi:', error);
      }
    );
  }
}