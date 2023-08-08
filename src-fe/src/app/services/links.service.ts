import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ILink } from '../models';
import {RoutesConfig} from "../../configs/routes";

@Injectable({
  providedIn: 'root',
})
export class LinksService {}
