import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';

import { IUser } from '../../models';
import { UserFacadeService } from '../../store/user';

@Component({
  selector: 'guitar-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent implements OnInit {
  registerForm : UntypedFormGroup;
  public admin: boolean;

  constructor(private userFacade: UserFacadeService){
    this.registerForm = new UntypedFormGroup({

      "login": new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(2)
      ]),
      "email": new UntypedFormControl("", [
        Validators.required,
        Validators.email
      ]),
      "password": new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }
  ngOnInit(): void {
    this.admin = false;
  }
  public onChange = ((_: boolean) => {
  });

  submit(){
    const formData = this.registerForm.value;
    const registrationData: IUser = {
      ...formData,
      isAdmin: this.admin,
      newUser: true
    };
    this.userFacade.userLogin(registrationData);
  }

  isAdmin() {
    this.admin = !this.admin;
    this.onChange(this.admin);
  }
}
