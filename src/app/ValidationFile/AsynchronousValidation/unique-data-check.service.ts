import { Injectable } from '@angular/core';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError, delay } from 'rxjs/operators';
import { UserProfileServiceService } from 'src/app/Services/CommonServices/user-profile-service.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueDataCheckService {

  constructor(private http: HttpClient,
              private UserProfileService:UserProfileServiceService ) { }

  uniqueNameCheck(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      const obj = {UniqueID: control.value};
      const $response = this.UserProfileService.uniqueIDCheck(obj);
      return $response.pipe(delay(4000),map((response:any) => {
        if (response.IDCheck) return null; 
      }), catchError((error) => {
          if (error.response == 400) { return of({UniqueID: 'duplicateID'}); }
          else { return of({serverError: 'serverError'}); }
      }));
    };
  }
}
