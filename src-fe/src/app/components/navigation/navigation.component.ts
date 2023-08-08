import {Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef} from '@angular/core';

import { ILink, IUser } from "../../models";
import { UserFacadeService } from "../../store/user";
import { RoutesConfig } from "../../../configs/routes";

import { AutoCloseable } from '../../utils/auto-closable'
import {takeUntil} from "rxjs";

@Component({
  selector: 'guitar-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent extends AutoCloseable implements OnInit {
  public links: string[];
  public user: IUser;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private userFacade: UserFacadeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.userFacade.userLogin$.pipe(
      takeUntil(this.destroyedSource),
    ).subscribe(
      (user: IUser) => {
        this.user = user;
        this.links = [RoutesConfig.showcase];

        if (this.user) {
          this.links.push(RoutesConfig.basket);
          this.links.push(RoutesConfig.order);
          if (this.user.isAdmin) {
            this.links.push(RoutesConfig.admin);
          }
        }

        this.links.push(RoutesConfig.chat);
        this.changeDetectorRefs.detectChanges();
      }
    );
  }
}
