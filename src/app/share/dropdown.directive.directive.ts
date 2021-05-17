import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;

  constructor(private el : ElementRef, private renderer : Renderer2 ){}

  @HostListener ('click') DropdownOpen(){
    this.isOpen= !this.isOpen;
    let part=this.el.nativeElement.querySelector('.dropdown-menu');
    if (this.isOpen) this.renderer.addClass(part, 'show');
    else this.renderer.removeClass(part,'show');
  }

}
