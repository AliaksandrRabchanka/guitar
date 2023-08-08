import {Component, ChangeDetectionStrategy, Input, OnInit, ChangeDetectorRef, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { combineLatest, takeUntil} from "rxjs";

import { IBasket, IProduct, IUpdateUserBasket, IUser } from '../../models';
import { UserFacadeService } from '../../store/user';

import { AutoCloseable } from "../../utils/auto-closable";

@Component({
  selector: 'guitar-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardCreateComponent extends AutoCloseable implements OnInit {
  @Input() public product: IProduct;
  @Output() public closeModal = new EventEmitter<any>();
  public cardCreateForm : UntypedFormGroup;
  public imageData: any;

  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    super();
    this.cardCreateForm = new UntypedFormGroup({
      "title": new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      "image": new UntypedFormControl(""),
      "description": new UntypedFormControl(""),
      "price": new UntypedFormControl("", [
        Validators.required,
        Validators.pattern(/^[0-9\.]+$/)
      ])
    });
  }

  ngOnInit(): void {
    this.imageData = this.product && this.product.image ? atob(this.product.image.value) : null;
  }

  public onSave() {
    if (this.imageData) {
      this.cardCreateForm.value.image = new UntypedFormControl(btoa(this.imageData));
    }
    this.closeModal.emit(this.cardCreateForm.value);
  }

  public onCancel() {
    this.closeModal.emit({});
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];

    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageData = reader.result as string;
        this.changeDetectorRefs.markForCheck();
      };
    }
  }

  deleteImage() {
    this.imageData = null;
  }
}
