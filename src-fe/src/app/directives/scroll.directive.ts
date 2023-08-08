import {Directive, ElementRef, AfterViewChecked} from "@angular/core";

@Directive({
  selector: '[appScroll]'
})

export class ScrollDirective implements AfterViewChecked{
  constructor(private el: ElementRef) {
  }

  ngAfterViewChecked(): void {
    this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
  }
}
