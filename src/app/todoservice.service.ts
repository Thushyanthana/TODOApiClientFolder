import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Todo } from 'src/Todo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoserviceService {

  todo!: Todo;
  constructor(private http: HttpClient) {

  }

  getAllTodos(): Observable<Todo> {

    return this.http.get<Todo>(environment.url);
    // .pipe(retry(1), catchError(this.handleError));
  }


  getTodobyId(id: any): Observable<Todo> {
    return this.http.get<Todo>(environment.url + id);
    
  }


  createTodo(todo: any): Observable<Todo> {
   //Id delete panniddu send pannonum
    delete todo.id
    // console.log(todo.date);
    todo.date = new Date(todo.date.year, todo.date.month - 1, todo.date.day + 1).toISOString();
    // todo.date="2022-04-09"
    // console.log(todo.date);
    todo.isComplete = JSON.parse(todo.isComplete);
    return this.http.post<Todo>(environment.url, todo)

    
  }


  //update
  updateTodo(id: number, todo: any): Observable<Todo> {
    todo.date = new Date(todo.date.year, todo.date.month - 1, todo.date.day + 1).toISOString();
    todo.isComplete = JSON.parse(todo.isComplete);
    const url = environment.url + '/' + id;
    return this.http.put<Todo>(url, todo);
  }

  //Delete
  deleteTodo(id: number) {
    return this.http.delete<Todo>(environment.url + '/' + id);
  }





}
