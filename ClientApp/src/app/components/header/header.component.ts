import { Component, ElementRef, OnInit, Output, EventEmitter, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onNewIssue = new EventEmitter();
  @ViewChild('popup') popup: ElementRef;
  @ViewChild('profile') profile: ElementRef;
  

  currentUser: any;

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }


  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  add() {
    this.onNewIssue.emit();
  }

  open() {
    this.popup.nativeElement.classList.add('show')
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/'])
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
      
    if (!this.popup.nativeElement.contains(event.target) && !this.profile.nativeElement.contains(event.target) ) {
        this.popup.nativeElement.classList.remove('show');
      }
  }

  search(event: any) {
    this.userService.searchEvent.emit(event.target.value);
  }
}

