import {ValidationErrors,AbstractControl} from '@angular/forms';

export class CharacterCheck 
{
    static NoCharacter(control:AbstractControl):ValidationErrors | null
    {
        let pattern=/[A-Z]/i;
        let stringValue=null;
        stringValue=(control.value as string).match(pattern);
        if(stringValue) return {fieldError:'error'};
        else return null;
    }
    static NoNumeric(control:AbstractControl):ValidationErrors | null
    {
        let pattern=/[0-9]/i;
        let stringValue=null;
        stringValue=(control.value as string).match(pattern);
        if(stringValue) return {fieldError:'error'};
        else return null;
    }
}