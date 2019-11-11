import { Injectable, RootRenderer, ResolvedReflectiveFactory } from "@angular/core";
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router'
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
// import { resolve } from 'dns';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]>{
    pageNumber = 1;
    pageSize = 5;
    
    constructor(private router : Router , private userService : UserService , private alertify : AlertifyService) {}
    
    resolve(router: ActivatedRouteSnapshot): Observable<User[]>{
        return this.userService.getUsers(this.pageNumber,this.pageSize).pipe(
            catchError(error=>{
                this.alertify.error('Problem Retrieving data')
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}