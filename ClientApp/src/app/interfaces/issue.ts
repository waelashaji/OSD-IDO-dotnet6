import { User } from "./User";

export class Issue {
  id: string
  title: string = "";
  category: string = "";
  dueDate: string = "2022-09-17T06:54:10.835Z";
  estimate: string = "";
  importance: string = "";
  status: string = "todo"
  user: User;
}
