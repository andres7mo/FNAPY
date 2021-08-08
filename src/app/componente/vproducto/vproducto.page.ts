import { Component } from '@angular/core';
import { Producto } from 'src/app/models/Producto';
import { ProductoServiceService } from 'src/app/services/producto-service.service';

@Component({
  selector: 'app-vproducto',
  templateUrl: './vproducto.page.html',
  styleUrls: ['./vproducto.page.scss'],
})
export class VproductoPage  {

  producto: Producto = new Producto();
  listaProductos: Producto[] = [];

  constructor(private productoService: ProductoServiceService) {}

  ionViewDidEnter(){
    this.obtenerProductos();
  }
  obtenerProductos(){
    this.productoService.listarProductos().subscribe((data: any) =>{
      this.listaProductos = data;
    });
  }
  agregarProducto() {
    this.productoService.guardarProducto(this.producto).subscribe((res: any) =>{
      this.producto = new Producto();
      this.obtenerProductos();
    });
  }
}
