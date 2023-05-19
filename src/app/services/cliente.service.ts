import { Injectable } from '@angular/core';
import { GLOBAL } from './global'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
	public url: any
	constructor( private readonly _http: HttpClient ) {
		this.url = GLOBAL.url
	}

	listar_clientes_filtro_admin(tipo: any, filtro: any): Observable<any> {
		return this._http.get(this.url + 'listar_clientes_filtro_admin/' + tipo + '/' + filtro)
	}
}
