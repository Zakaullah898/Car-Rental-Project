import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
@Output() public clickOutSide = new EventEmitter<any>
  constructor(private ele : ElementRef) { }
  @HostListener('document:click', ['$event.target']) public outSideClick(target: any){
      let clickInside = this.ele.nativeElement.contains(target)
      if(!clickInside){
        this.clickOutSide.emit(target)
      }
  }
}
