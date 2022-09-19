import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Issue } from '../interfaces/issue';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  readonly API_URL = environment.apiUrl;

  constructor(
      private http: HttpClient,
  ) { }

  getIssues() {
    return this.http.get<Array<Issue>>(`${this.API_URL}/Issues`).pipe(
      map(data => {
            let todo : Issue[] = [];
            let doing : Issue[] = [];
            let done : Issue[] = [];
            data.forEach( issue=> {;
                if ( issue.status == 'todo') todo.push(issue)
                if ( issue.status == 'doing') doing.push(issue)
                if ( issue.status == 'done') done.push(issue)
            });
            return {todo , doing , done}
        })
    )
  }

  addIssue(issue: Issue) { return this.http.post<string>(`${this.API_URL}/Issues/`, issue);}

  updateIssue(id: number, issue: Issue) {
    return this.http.put<Issue>(`${this.API_URL}/Issues/${id}`, issue);
  }

}
