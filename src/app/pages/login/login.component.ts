import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    public f = this.form.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  
    })

    formSubmitted = false;
   

    constructor(private form: FormBuilder) { }

    ngOnInit(): void {
    }

    login(){
        this.formSubmitted = true;
        
        if (this.f.invalid){
          return;
        }
    }
      

    invalidField(field:string){
       
        if (this.formSubmitted && this.f.controls[field].invalid){
            return true;
        }else{
            return false;
        }
        
    }

}
