import {ValidationErrors,AbstractControl} from '@angular/forms';

export class ImageCheck 
{
    static fileCheckV(control:AbstractControl):ValidationErrors | null
    {
        let subString:Array<string>=(control.value as string).split("\\");
        let imagePathName=subString[subString.length-1];
        let stringValue=imagePathName.match(/.(jpeg|png|jpg|gif)/i);
        if(stringValue) return null;
        else return {fieldError:'error'};
    }

    static fileCheckM(fileName,fileSize?)
    {
        let subString:Array<string>=fileName.split("\\");
        let imagePathName:String=subString[(subString.length)-1];
        let stringValue=imagePathName.match(/.(jpeg|png|jpg|gif)/i);
        let fileSizeRange:Boolean=true;
        if(fileSize) if(!(fileSize < 500000 && fileSize > 0)) fileSizeRange=false;
        if(stringValue)
        {
            if(fileSizeRange) return {success:imagePathName};
            else return {error:'invalidSize'}
        }
        
        else return null;
    }

}