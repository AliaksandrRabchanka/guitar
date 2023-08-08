import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorRoutes, RoutesConfig } from '../../../configs/routes';

@Component({
  selector: 'guitar-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent implements OnInit {
  public homePageLink = `/${RoutesConfig.home}`;

  public errorCode: number;

  public errorMessage: string;

  public errorMessageComment: string;

  public errorImageURL: string;

  private path: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.path = this.router.url.substr(1);
    this.setTypeError();
  }

  private setTypeError(): void {
    switch (this.path) {
      case `${RoutesConfig.error}/${ErrorRoutes.serverInternalError}`:
        this.errorCode = 500;
        this.errorMessage = 'serverInternalError';
        this.errorMessageComment = 'serverInternalError';
        break;
      case `${RoutesConfig.error}/${ErrorRoutes.notEnoughPermissions}`:
        this.errorCode = 403;
        this.errorMessage = 'notEnoughPermissions';
        this.errorMessageComment = 'notEnoughPermissions';
        break;
      case `${RoutesConfig.error}/${ErrorRoutes.accessDenied}`:
        this.errorCode = 401;
        this.errorMessage = 'accessDenied';
        this.errorMessageComment = 'accessDenied';
        break;
      default:
        this.errorCode = 404;
        this.errorMessage = 'notFound';
        this.errorMessageComment = 'notFound';
        break;
    }
    this.errorImageURL = `../../../assets/svg/error-page/error-${this.errorCode}.svg`;
  }
}
