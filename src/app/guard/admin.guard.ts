import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
	constructor( private readonly _adminService: AdminService,
	             private readonly _router: Router ) { }
  canActivate():any {
		if(!this._adminService.isAuthenticated(['admin'])) {
			this._router.navigate(['/login'])
			return false
		}
		return true
  }
}
