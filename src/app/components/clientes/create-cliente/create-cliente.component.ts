import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare const iziToast: any

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.scss']
})
export class CreateClienteComponent implements OnInit {
  public cliente: any = {
    genero: ''
  };
  public token: any;
  constructor(  private readonly _clienteService: ClienteService,
                private readonly _adminService: AdminService,
                private readonly _router: Router ) {
                  this.token = this._adminService.getToken();
                }

  ngOnInit(): void {
    
  }

  registro(registroForm: any) {
    if(registroForm.valid) {
      this._clienteService.registro_cliente_admin(this.cliente, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'SUCCSESS',
            titleColor: '#',
            color:'#1dc74c',
            class: 'text-succsess',
            position: 'topRight',
            message: 'Se registro correctanente el nuevo cliente.'
          })
          this.cliente = {
            genero: '',
            nonbres: '',
            apellidos: '',
            f_nacimiento: '',
            telefono: '',
            dni: '',
            email: ''
          }
          this._router.navigate(['panel/clientes'])
        },
        error => {
          console.log(error);
        }
      )
    }
    else {
      iziToast.show({
				title: 'ERROR',
				titleColor: '#ff0000',
				color:'#fff',
				class: 'text-danger',
				position: 'topRight',
				message: 'Los datos del formulario no son validos'
			})
    } 
  }
}
