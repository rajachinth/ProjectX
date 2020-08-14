import { Component, Input,Output,EventEmitter, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';

import {CharacterCheck} from '../ValidationFile/SynchronousValidation/CharacterCheck';
import {ImageCheck} from '../ValidationFile/SynchronousValidation/ImageCheck';

import * as $ from 'jquery';
import { Observable, of } from 'rxjs';
import { UserProfileServiceService } from '../Services/CommonServices/user-profile-service.service';
import { take } from 'rxjs/operators';
import { UniqueDataCheckService } from '../ValidationFile/AsynchronousValidation/unique-data-check.service';

@Component({
  selector: 'app-profile-template',
  templateUrl: './profile-template.component.html',
  styleUrls: ['./profile-template.component.css']
})
export class ProfileTemplateComponent implements OnInit
{
  @Input('UniqueID') UniqueID:String='';
  @Input('UserName') UserName:String='';
  @Input('ImageFile') ImageFile:String='';
  @Input('ImageFileURL') ImageFileURL:String='';
  @Input('IsUpdate') IsUpdate:Boolean=false;
  @Output('responseEvent') responseEvent=new EventEmitter();
  imagePathDATA="https://image.shutterstock.com/image-vector/user-login-authenticate-icon-human-260nw-1365533969.jpg";

  $isLoad:Observable<Boolean>;
  $isError:Observable<Boolean>;
  $serverData:Observable<Boolean>;
  $errorMessage:Observable<Object>;
  fileInValid:Boolean=false;
  fileSizeInValid:Boolean=false;
  isFileData:Boolean=false;

  ngOnInit(): void 
  {
    $(document).ready(function(){
      $('.JqueryBTN01').click(function(){
        $('.JqueryFile01').trigger('click')
      });
    })  
    const imgCheck:any=ImageCheck.fileCheckM(this.ImageFile)
    if(imgCheck) if(imgCheck.success) this.isFileData=true;
  }

  constructor(private UserProfileService:UserProfileServiceService,
              private DataCheckService:UniqueDataCheckService) {}

  UserProfile = new FormGroup({
    UniqueID:new FormControl('',[Validators.minLength(6),
                                 Validators.maxLength(12),
                                 Validators.required,
                                 CharacterCheck.NoCharacter,  
                                ],this.DataCheckService.uniqueNameCheck()),
    UserName:new FormControl('',[Validators.minLength(6),
                                 Validators.maxLength(12),
                                 Validators.required,
                                 CharacterCheck.NoNumeric,
                                ]),
  });
  
  addImage(event)
  {
    this.fileInValid=false;
    this.fileSizeInValid=false;
    console.log(event);
    const imgCheck:any=ImageCheck.fileCheckM(event.target.value as string,event.target.files[0].size);
    console.log(imgCheck);
    if(imgCheck) if(imgCheck.error) this.fileSizeInValid=true;
      else
      {
        this.ImageFile=imgCheck.success;
        this.fileInValid=false;
        this.isFileData=true;
        const file = (event.target).files[0];
        let imageFileReader=new FileReader();
        imageFileReader.readAsDataURL(file);
        imageFileReader.onload = ()=>{this.ImageFileURL=imageFileReader.result as string;}
      }
    else this.fileInValid=true;
  }

  resetFile() {  /* code logic here */  }

  submitUser(userData)
  {
    const dataObj=Object.assign({},userData,{ImageData:this.ImageFileURL});
    console.log(dataObj);
    this.$isLoad=of(true);
    this.$isError=of(false);
    this.UserProfileService.addUser(userData)
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
                    ()=>{this.$isLoad=of(false)});
  }

  updateUser(userData)
  {
    const dataObj=Object.assign({},userData,{ImageData:this.ImageFile});
    this.$isLoad=of(true);
    this.$isError=of(false);
    this.UserProfileService.updateUser(userData)
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
                    ()=>{this.$isLoad=of(false)});
  }

  cancel()
  {  this.responseEvent.emit({cancel:true}); }

}
