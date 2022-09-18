import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  content = '"Anthing that can go wrong, will go wrong!"';

  @ViewChild('banner') banner: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    this.banner.nativeElement.classList.add("hide")
  }

  show(){
    this.banner.nativeElement.classList.remove("hide")
  }

}
