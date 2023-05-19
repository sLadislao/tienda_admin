import { Injectable } from '@angular/core';
import { GLOBAL } from './global'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';

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

	isAuthenticated(allowedRole: string[]): boolean {
		const token = localStorage.getItem('token')
		let decodedToken
		if(!token) {
			return false
		}
		try {
			const helper = new JwtHelperService()
			decodedToken = helper.decodeToken(token ?? '')
			if(!decodedToken) {
				localStorage.removeItem('token')
				return false
			}
		}
		catch (error: any) {
			localStorage.removeItem('token')
			return false
		}
		return allowedRole.includes(decodedToken.role)
	}
}
