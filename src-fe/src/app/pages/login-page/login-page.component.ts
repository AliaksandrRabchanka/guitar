import {Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef} from '@angular/core';
import {UserFacadeService} from "../../store/user";
import {IUser} from "../../models";
import {Router} from "@angular/router";

@Component({
  selector: 'guitar-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  public checked: boolean;
  public user: IUser;

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private userFacade: UserFacadeService
  ) {}

  ngOnInit(): void {
    this.checked = true;
    this.refresh();
  }

  public onChange = ((_: boolean) => {
  });

  public onChanged() {
    this.checked = !this.checked;
    this.onChange(this.checked);
  }

  refresh() {
    this.userFacade.userLogin$.subscribe(
      (user: IUser) => {
        this.user = user;
        if (this.user) this.router.navigate(['/']);
        this.changeDetectorRefs.detectChanges();
      }
    );
  }
}
