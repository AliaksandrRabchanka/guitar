import {Component, ChangeDetectionStrategy, OnInit, Input} from '@angular/core';

import { AutoCloseable } from '../../utils/auto-closable';

@Component({
  selector: 'guitar-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ModalComponent extends AutoCloseable implements OnInit {
  @Input() title: string;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
