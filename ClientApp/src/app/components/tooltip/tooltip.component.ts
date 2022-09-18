import { Directive, Input, ElementRef, ViewContainerRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[tooltip]',
  exportAs: 'tooltip'
})
export class TooltipDirective implements OnInit {

  constructor(
    private element: ElementRef
  ) { }

  ngOnInit(): void {
    this.tooltipElement.className = 'tooltip';
    this.element.nativeElement.appendChild(this.tooltipElement);
    this.element.nativeElement.classList.add('tooltip-container')
  }

  @Input('position') position = 'bottom';
  @Input('blockHover') blockHover = false;
  tooltipElement = document.createElement('div');
  visible = false;


  @Input() set tooltip(value: string) {
    this.tooltipElement.textContent = value;
  }

  @HostListener('mouseenter') onMouseEnter() {

    let x, y;

    switch (this.position) {
      case "top":
        x = this.element.nativeElement.getBoundingClientRect().left + this.element.nativeElement.offsetWidth / 2; // get the middle of the element
        y = this.element.nativeElement.getBoundingClientRect().top - this.element.nativeElement.offsetHeight; // get the top of the element
        break;
      case "bottom":
        x = this.element.nativeElement.getBoundingClientRect().left + this.element.nativeElement.offsetWidth / 2; // get the middle of the element
        y = this.element.nativeElement.getBoundingClientRect().top + this.element.nativeElement.offsetHeight + 6; // get the bottom of the element
        break;
      case "left":
        //to be continued...
        break;
      case "right":
        x = this.element.nativeElement.getBoundingClientRect().left + this.element.nativeElement.offsetWidth + 6; // get ending of the element
        y = this.element.nativeElement.getBoundingClientRect().top + (this.tooltipElement.offsetHeight / 2); // get the top of the element
        break;
    }

    if (!this.blockHover) this.show(x, y);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.blockHover) this.hide();
  }

  show(x: number, y: number) {
    this.tooltipElement.classList.add(`tooltip-${this.position}`);
    this.tooltipElement.classList.contains
    this.tooltipElement.style.top = y.toString() + "px";
    this.tooltipElement.style.left = x.toString() + "px"
  }

  hide() {
    this.tooltipElement.classList.remove(`tooltip-${this.position}`);
  }
}
