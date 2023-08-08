import { IBuildVersion, ILink } from '../../models';
import {Output} from "@angular/core";

export const mainDataKey = 'mainData';

export interface IMainDataState {
  activePageUrl: string; // Active page URL
  buildVersion: IBuildVersion; // build version for footer
  links: ILink[]; // links for navigation panel
  showModal: boolean; //show popup modal window
}

export const mainDataInitialState: IMainDataState = {
  activePageUrl: null,
  buildVersion: null,
  links: null,
  showModal: false
}
