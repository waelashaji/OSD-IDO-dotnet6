import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  toDo: Issue[] 
  doing: Issue[]
  done: Issue[] 

  loading = true;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.authorize()
      .subscribe({
        next: res => {
          this.authService.setUser(res);
          this.userService.getIssues().subscribe(data => {
            this.toDo = data.todo;
            this.doing = data.doing;
            this.done = data.done;
            this.loading = false;
          })
        },
        error: err => {
          localStorage.removeItem('access_token');
          this.router.navigate(['/']);
        }
      });
  }

  drop(event: CdkDragDrop<Issue[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let issue = event.container.data[event.currentIndex];
      let status = (<string>event.container.element.nativeElement.getAttribute('id'));
      issue.status = status; 
      this.userService.updateIssue(issue.id, issue).subscribe();
    }
  }

  addIssue() {
    let issue = new Issue;
    this.userService.addIssue(issue).subscribe(data =>{
      issue.id = data
      this.toDo.unshift(issue)
      
    })
  }
}
