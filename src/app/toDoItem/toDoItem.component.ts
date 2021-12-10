import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TODOItem } from '../_models/toDoItem';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToDoListService } from '../_services/toDoService.service';

@Component({
  selector: 'app-toDoItem',
  templateUrl: './toDoItem.component.html',
  styleUrls: ['./toDoItem.component.css']
})
export class ToDoItemComponent implements OnInit {

  constructor(private router: Router,private modalService: NgbModal,private toDoListService: ToDoListService) { }

  @Input() toDoItem:TODOItem;
  modalRef:NgbModalRef;
  index=null;
  id:number;
  ngOnInit() {
    this.id=this.toDoItem.statusName.id;
  }
open(content,index) {

    this.modalRef=this.modalService.open(content, {backdrop:'static'});
    this.index=index;
}

  deleteItem(){

    if(this.index != null){
    this.toDoListService.deleteItem(this.index);
    this.index=null;
  }
    this.modalRef.close();
  }
  
  editItem(index:number){
    //  this.router.navigate(['ToDoList','edit'],{queryParams:{'id':index}});
   this.router.navigate(['ToDoList','edit', index]);
    // this.router.navigateByUrl('/ToDoList/edit/'+ index);
  }
}
