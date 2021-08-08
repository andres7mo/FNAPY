import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cliente } from 'src/app/models/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = 'https://clientesapp1.herokuapp.com/api/';
  constructor(private http: HttpClient) { }

  listarCliente(){
    return this.http.get<Cliente[]>(this.url+'productos/');
  }

  guardarCliente(cliente: Cliente)
  {
    // eslint-disable-next-line prefer-const
    let json= JSON.stringify(cliente);
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
