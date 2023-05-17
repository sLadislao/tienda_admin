import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {Router} from "@angular/router";

declare const jQuery: any
declare const $: any
declare const iziToast: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public user: any = {
		email: '',
		password: ''
	}
	public usuario: any = {}
	public token: any = ''
  constructor( private readonly _adinService: AdminService,
               private readonly _router: Router )
  {
		this.token = this._adinService.getToken()
  }
  ngOnInit(): void {
		if(this.token) {
			this._router.navigate(['/'])
		}
  }

  login(loginForm: any){
		if(loginForm.valid) {
			const data: any = {
				email: this.user.email,
				password: this.user.password
			}
			this._adinService.login_admin(data).subscribe(
				response => {
					if(!response.data) {
						iziToast.show({
							title: 'ERROR',
							titleColor: '#ff0000',
							color:'#fff',
							class: 'text-danger',
							position: 'topRight',
							message: response.message
						})
					}
					else {
						this.usuario = response.data
						localStorage.setItem('token', response.token)
						localStorage.setItem('_id', response.data._id)
						this._router.navigate(['/'])
					}
				},
				error => {
					console.log(error)
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
