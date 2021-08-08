import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-lcliente',
  templateUrl: './lcliente.page.html',
  styleUrls: ['./lcliente.page.scss'],
})
export class LclientePage  {

  cliente: Cliente = new Cliente();
  listaCliente: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ionViewDidEnter(){
    this.obtenerClientes();
  }
  obtenerClientes(){
    this.clienteService.listarCliente().subscribe((data: any) =>{
      this.listaCliente = data;
    });
  }


}
