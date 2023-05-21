import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.scss']
})
export class IndexClienteComponent implements OnInit {
	constructor( private readonly _clienteService: ClienteService,
	             private readonly _adminService: AdminService ) {
		this.token = _adminService.getToken() ?? ''
	}

	public token = ''
	public clientes: any[] = []
	public filtroApellidos = ''
	public filtroCorreo = ''
	public page = 1
	public pageSize = 1

	ngOnInit(): void {
		this.initData()
	}

	private initData() {
		this._clienteService.listar_clientes_filtro_admin(null, null, this.token).subscribe(
			response => {
				this.clientes = response.data
			},
			error => {
				console.log(error)
			}
		)
	}

	public filtro(tipo: any) {
		let filtro: string = '';
		if(tipo === 'apellidos') filtro = this.filtroApellidos
		else if(tipo == 'correo') filtro = this.filtroCorreo

		if(filtro) {
			this._clienteService.listar_clientes_filtro_admin(tipo, filtro, this.token).subscribe(
				response => {
					this.clientes = response.data
				},
				error => {
					console.log(error)
				}
			)
		}
		else {
			this.initData()
		}
	}
}
