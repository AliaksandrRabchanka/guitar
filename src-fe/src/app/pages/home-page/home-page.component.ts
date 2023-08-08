import {Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef} from '@angular/core';
import { RoutesConfig } from '../../../configs/routes';
import { UserFacadeService } from "../../store/user";
import {IUser} from "../../models";

@Component({
  selector: 'guitar-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public loginUrl: string;
  public user: string;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private userFacade: UserFacadeService
  ) {}

  ngOnInit(): void {
    this.loginUrl = `/${RoutesConfig.login}`;
    this.refresh();
  }

  refresh() {
    this.userFacade.userLogin$.subscribe(
      (user: IUser) => {
        this.user = user?.login;
        this.changeDetectorRefs.detectChanges();
      }
    );
  }
}
