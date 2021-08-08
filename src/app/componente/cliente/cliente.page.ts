import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage  {
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
  agregarCliente() {
    this.clienteService.guardarCliente(this.cliente).subscribe((res: any) =>{
      this.cliente = new Cliente();
      this.obtenerClientes();
    });

  }

}
