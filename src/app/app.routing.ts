import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guard/admin.guard'

const appRoute: Routes = [
	{ path: '', component: InicioComponent, canActivate: [AdminGuard]},
	{ path: 'login', component: LoginComponent }
]

export const appRoutingProvider: any = []
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
