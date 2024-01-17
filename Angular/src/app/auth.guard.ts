import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { PatientService } from './patient.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(private service: PatientService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.service.getUserLoggedStatus() || this.service.getDoctorLoggedStatus() || this.service.getLabLoggedStatus()) {
      return true;
    }
    this.router.navigate(['signin']);
    return false;
  }
}

/*
export const authGuard: CanActivateFn = (route, state) => {
  let service =  inject(PatientService);
  return service.getUserLoggedStatus();
}; */
