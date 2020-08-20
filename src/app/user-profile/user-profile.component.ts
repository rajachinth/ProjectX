import { Component } from '@angular/core';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { CharacterCheck } from '../ValidationFile/SynchronousValidation/CharacterCheck';
import { UserProfileServiceService } from '../Services/CommonServices/user-profile-service.service';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { UniqueDataCheckService } from '../ValidationFile/AsynchronousValidation/unique-data-check.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent
{
  newUser:Boolean=true;
  editUser:Boolean=false;
  $isLoad:Observable<Boolean>;
  $isError:Observable<Boolean>;
  $serverData:Observable<Object>;
  $errorMessage:Observable<Object>;
  isUpdate:Boolean=true;

  constructor(private UserProfileService:UserProfileServiceService,
              private DataCheckService:UniqueDataCheckService ) {}

  UserID=new FormGroup({
    UniqueID:new FormControl('', [Validators.minLength(6),
                                  Validators.maxLength(12),
                                  Validators.required,
                                  CharacterCheck.NoCharacter,
                                ],this.DataCheckService.uniqueNameCheck()),
                                });

  submit(switchType)
  {
    (switchType == 'newUser') ? (this.newUser=true,this.editUser=false) :
                                (this.newUser=false,this.editUser=true) ;
  }

  UserIDSubmit(userID)
  {
    this.$isLoad=of(true);
    this.$isError=of(false);
    this.UserProfileService.findUser(userID)
        .pipe(take(1))
        .subscribe((responseData)=>{ this.$isLoad=of(false);
                                     this.$serverData=of(responseData)},
                    (error)=>{
                      this.$isLoad=of(false);
                      this.$isError=of(true);
                      if(error.response == 400) this.$errorMessage=of(error);
                      if(error.response == 404) this.$errorMessage=of(error);
                      if(error.response == 405) this.$errorMessage=of(error);
                      if(error.response == 500) this.$errorMessage=of(error);
                      else this.$errorMessage=of(error)
                    },
                    ()=>{this.$isLoad=of(false)}
                    );}

  cancelUpdate(eventData)
  {
    if(eventData.cancel) this.$serverData=of(null);
  }
}
