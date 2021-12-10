import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { TODOItem } from '../_models/toDoItem';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ToDoListService {

  private toDoArrayObserver = new BehaviorSubject<TODOItem[]>( new Array<TODOItem>());
  toDoArray$ = this.toDoArrayObserver.asObservable();

  updateToDoArray(toDoArray: TODOItem[]) {
    toDoArray= toDoArray.sort((a , b) => {
      if( a.temptId < b.temptId){ return 1}
      if (a.temptId > b.temptId){ return -1}
      return 0; 
    });
    this.toDoArrayObserver.next(toDoArray);
    sessionStorage.setItem('toDoList', JSON.stringify(toDoArray));
  }
  filterToDoArray(toDoArray: TODOItem[]){
    this.toDoArrayObserver.next(toDoArray);
  }

  constructor() {}

  getToDoList(): TODOItem[] {
    let toDOArray = new Array<TODOItem>();
    this.toDoArray$.subscribe((p) => {
      if(p != null){

        toDOArray = p.sort((a , b) => {
          if( a.temptId < b.temptId){ return 1}
          if (a.temptId > b.temptId){ return -1}
          return 0; 
        });
       
      } else{
        toDOArray = p;
      }
    });
    return toDOArray;
  }
  addItem(item: TODOItem) {
    let toDOArray=new Array<TODOItem>();

   
    if(this.getToDoListFromStorage()!= null){ 

      toDOArray=JSON.parse(this.getToDoListFromStorage());
      item.temptId=toDOArray.length;
    }else{
      item.temptId=0;
    }

    toDOArray.push(item);
    this.updateToDoArray(toDOArray);

  }

  deleteItem(temptId: number) {
    let toDOArray = this.getToDoList();

    let id: number = toDOArray.findIndex(p => p.temptId === temptId);

    toDOArray.splice(id, 1);
    this.updateToDoArray(toDOArray);
  }

  updateItem(item: TODOItem) {
    let toDOArray = this.getToDoList();
    let id: number = toDOArray.findIndex(p => p.temptId === item.temptId);

    toDOArray.splice(id, 1);
    toDOArray.push(item);
    this.updateToDoArray(toDOArray);
  }
  getToDoListFromStorage(){
    return sessionStorage.getItem("toDoList");
  }
}
