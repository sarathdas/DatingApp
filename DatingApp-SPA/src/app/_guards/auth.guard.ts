import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authServices : AuthService){}
  canActivate(): boolean {
    return true;
  }
  
}
