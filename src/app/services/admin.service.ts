import { Injectable } from '@angular/core';
import { GLOBAL } from './global'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
	public url: any
  constructor( private readonly _http: HttpClient ) {
		 this.url = GLOBAL.url
  }

	login_admin(data: any): Observable<any> {
		return this._http.post(this.url + 'login_admin', data)
	}

	getToken() {
		return localStorage.getItem('token')
	}
}
