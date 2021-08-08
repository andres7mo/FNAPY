import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  private url = 'https://apiproductovent.herokuapp.com/api/';
  constructor(private http: HttpClient) { }



  listarProductos(){
    return this.http.get<Producto[]>(this.url+'productos/');
  }

  guardarProducto(producto: Producto)
  {
    // eslint-disable-next-line prefer-const
    let json= JSON.stringify(producto);
    // eslint-disable-next-line prefer-const
    let params = json;
    // eslint-disable-next-line prefer-const
    let headers = new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json'
    });
    // eslint-disable-next-line object-shorthand
    return this.http.post(this.url+'producto/',json, { headers: headers })
    // eslint-disable-next-line arrow-body-style
    .pipe(map((data) => {return data;})
    );
  }
}


