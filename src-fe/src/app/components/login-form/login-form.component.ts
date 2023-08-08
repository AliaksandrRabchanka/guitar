import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';

import { UserFacadeService } from "../../store/user";

@Component({
  selector: 'guitar-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  loginForm : UntypedFormGroup;
  constructor(private userFacade: UserFacadeService){
    this.loginForm = new UntypedFormGroup({

      "login": new UntypedFormControl("", [
        Validators.required,
        this.loginValidator
      ]),
      "password": new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }
  ngOnInit() {

  }

  submit(){
    this.userFacade.userLogin(this.loginForm.value);
  }
  // Validator
  loginValidator(control: UntypedFormControl): {[s:string]:boolean}|null{
    if(control.value.length < 2){
      return {"login": true};
    }
    return null;
  }
}
