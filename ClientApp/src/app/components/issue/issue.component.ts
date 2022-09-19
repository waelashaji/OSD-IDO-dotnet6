import { Component, Input, OnInit, ViewChildren, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Issue } from 'src/app/interfaces/issue';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit, AfterViewInit {

  @Input() data: Issue;
  @ViewChildren('root') root: ElementRef;
  titleShown = true;
  importanceShown = true;
  typing = false
  searchText: string;

  constructor(private userService: UserService, private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.userService.searchEvent.subscribe(searchText => { this.searchText = searchText; console.log(searchText) })
    let formattedDate = (<string>this.datePipe.transform(this.data.dueDate, 'yyyy-MM-dd'))
    this.data.dueDate = formattedDate
  }

  ngAfterViewInit(): void {
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any) {
    if (this.typing) {
      this.userService.updateIssue(this.data.id, this.data).subscribe();
      this.titleShown = true;
      this.typing = false;
    }
  }


  onImportanceChange() {
    this.importanceShown = true;
    this.typing = true;
  }
}
