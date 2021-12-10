import { Component, OnInit } from '@angular/core';
import { TODOItem } from '../_models/toDoItem';
import { ToDoListService } from '../_services/toDoService.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-toDoList',
  templateUrl: './toDoList.component.html',
  styleUrls: ['./toDoList.component.css']
})
export class ToDoListComponent implements OnInit {


  toDoList:TODOItem[];
  mySubscription: any;
  titel:string;

  constructor(private toDoListService: ToDoListService,private router: Router) {
    this.mySubscription = this.router.events.subscribe((event) => {
      let profile: string;
      if (event instanceof NavigationEnd) {

         if (this.toDoListService.getToDoListFromStorage() != null){
          this.toDoList = JSON.parse(this.toDoListService.getToDoListFromStorage());
          this.toDoListService.updateToDoArray(this.toDoList);
          this.titel="لیست کارهای امروزم";
         }
        this.router.navigated = false;
       }

   });
  
   }

  ngOnInit() {
    
    this.toDoListService.toDoArray$.subscribe(p=>{
       this.toDoList=p;
    })
    this.titel="لیست کارهای امروزم";
  }
  notToDoWork(){
    let arrayf =JSON.parse(this.toDoListService.getToDoListFromStorage()).filter(p => p.statusName.id < 2)
    this.toDoListService.filterToDoArray(arrayf);
    this.titel="لیست کارهای ناتمام امروزم";
  }
  toDoWork(){
    let arrayf =JSON.parse(this.toDoListService.getToDoListFromStorage()).filter(p => p.statusName.id == 2)
    this.toDoListService.filterToDoArray(arrayf);
    this.titel="لیست کارهای تمام شده ی امروزم";
  }
  allWork(){
    let arrayf= JSON.parse(this.toDoListService.getToDoListFromStorage());
    this.toDoListService.filterToDoArray(arrayf);
    this.titel="لیست کارهای امروزم";
  }

  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

}
