import { Injectable, RootRenderer, ResolvedReflectiveFactory } from "@angular/core";
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router'
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
// import { resolve } from 'dns';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    
    constructor(private router : Router , private userService : UserService , private alertify : AlertifyService, private authService : AuthService) {}
    
    resolve(router: ActivatedRouteSnapshot): Observable<User>{
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error=>{
                this.alertify.error('Problem Retrieving your data')
                this.router.navigate(['/members']);
                return of(null);
            })
        );
    }
}