import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { bottom } from '@popperjs/core';
import { Todo } from 'src/Todo';
import { TodoserviceService } from './todoservice.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Todo';
  Todoform!: FormGroup;
  TodoItems: any = [];
  closeResult = '';
  Todoitem: Todo[] | any = [];
  modalReference!: NgbModalRef;
  page: any;
  filterTerm='';

  constructor(private fb: FormBuilder, private modalService: NgbModal, private tservice: TodoserviceService, private datepipe: DatePipe) {

  }

  ngOnInit(): void {
    this.getAll();

    //number null,date this format
    this.Todoform = this.fb.group({
      id: [null],
      name: [''],
      isComplete: [false],
      date: [{ year: 2005, month: 7, day: 12 }],
      priority: [null]
    })
  }



  onSubmit() {
    // this.TodoItems = this.Todoform.value;
    console.log(this.Todoform.value);
    // this.save();
  }




  open(content: any, Todoitem: any) {
    // console.log( new Date(Todoitem.date));

    if (Todoitem != null) {
      this.Todoform.patchValue({
        id: Todoitem.id,
        name: Todoitem.name,
        isComplete: Todoitem.isComplete,
        date: { year: new Date(Todoitem.date).getFullYear(), month: new Date(Todoitem.date).getMonth() + 1, day: new Date(Todoitem.date).getDate() },
        priority: Todoitem.priority
      })
      
    } else {
      this.Todoform.reset();
      this.Todoform.patchValue({
        date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() },
      })
      // this.Todoform.reset();
    }

    this.modalReference = this.modalService.open(content, Todoitem);
  }







  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  getAll() {
    return this.tservice.getAllTodos().subscribe(data => {
      this.TodoItems = data;
      // console.log(data);
    });
  }


  save() {
    // const username = this.Todoform.get('name')?.value;
    // console.log("Hello"+this.Todoform.get('id')?.value);
    // console.log("world "+this.Todoform.value.id);
    // console.log(this.Todoform.value.date);

    if ((this.Todoform.value.id != null)) {

      return this.tservice.updateTodo(this.Todoform.value.id, this.Todoform.value).subscribe((resp) => {
        this.getAll();
        this.Todoform.reset();
        let element: HTMLElement = document.getElementById('closeModel') as HTMLElement;
        element.click();

      })
    }
    else {
      
      return this.tservice.createTodo(this.Todoform.value).subscribe((resp) => {
        this.getAll();
        let element: HTMLElement = document.getElementById('closeModel') as HTMLElement;
        element.click();
      })
    }
    this.Todoform.reset();

  }


  //Delete
  id: number = 0;
  deleteTodo(id: number) {
    return this.tservice.deleteTodo(id).subscribe((resp) => {
      console.log('Deletedsuccess')
      this.getAll();
    })
  }

  // editTodo(Todoitem: Todo) {
  //   this.tservice.updateTodo(this.Todoform.value, this.id).subscribe((resp) => {
  //     console.log(resp);
  //   })
  // }


}






