import { SelectListItem } from './../_models/selectListItem';
import { TODOItem } from './../_models/toDoItem';
import { ToDoListService } from './../_services/toDoService.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable, merge } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { tick } from '@angular/core/testing';


//data for dropdownInput//
const priortyList:SelectListItem[]=
[
  {id:0 ,value:"مهمه که انجامش بدم"},
  {id:1 ,value:"انجامش بدم بهتره"},
  {id:2 ,value:"اگه وقت شد انجامش میدم"},
];
const statusList:SelectListItem[]=
[
  {id:0,value:"هنوز شروعش نکردم"},
  {id:1,value:"دارم انجامش میدم"},
  {id:2,value:"هورا!! تموم شد"}
] 
//..............//

@Component({
  selector: 'app-toDoInput',
  templateUrl: './toDoInput.component.html',
  styleUrls: ['./toDoInput.component.css'],
})
export class ToDoInputComponent implements OnInit {

 //variable for detecting editAction or createAction
  editing =false;
//....///

  toDoItem:TODOItem;
  id:number;
  toDoForm: FormGroup;
  showError=false;
  //variable for displaying dropdown input in editAction
  priorityDisplayName:string = null
  statusDisplayName:string = null
  //......//

 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toDoListService: ToDoListService
  ) {
    console.log("in cons");
  }

  @ViewChild('prioritycontrol', {static: true}) prioritycontrol: NgbTypeahead;

  priorityfocus$ = new Subject<string>();
  priorityclick$ = new Subject<string>();

  formatter = (state) => state.value;
  searchPriority = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.priorityclick$.pipe(filter(() => !this.prioritycontrol.isPopupOpen()));
    const inputFocus$ = this.priorityfocus$;
  
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? priortyList
        : priortyList.filter(v => v.value.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  @ViewChild('statuscontrol', {static: true}) statuscontrol: NgbTypeahead;

  statusfocus$ = new Subject<string>();
  statusclick$ = new Subject<string>();

  
  searchStatus = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.statusclick$.pipe(filter(() => !this.statuscontrol.isPopupOpen()));
    const inputFocus$ = this.statusfocus$;
  
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? statusList
        : statusList.filter(v => v.value.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  ngOnInit() {
    this.createToDoForm();
    // console.log("this.createToDoForm();");

    this.editing = this.activatedRoute.snapshot.params.mode === 'edit';

    //  this.activatedRoute.params.subscribe(p=> {
    //   this.editing = p['mode'] == 'edit';
      console.log(this.editing);
    // });
    if (this.editing) {

      console.log("editing is true")
      this.toDoItem=new TODOItem();
      // this.id = +this.activatedRoute.snapshot.queryParamMap.get('id');
      this.id=this.activatedRoute.snapshot.params.id
      // console.log("id");
      // console.log(this.id);
      this.toDoListService.toDoArray$.subscribe( p =>{
        this.toDoItem =p.filter( item => item.temptId == this.id)[0];
      });
      this.setTODOForm();
      this.priorityDisplayName = this.toDoItem.priorityName.value;
      this.statusDisplayName = this.toDoItem.statusName.value;
    }
  }
  
  createToDoForm(){
    this.toDoForm=new FormGroup({

      "temptId": new FormControl(0),
      "toDOText":new FormControl('',Validators.required),
      "mintime":new FormControl('',{validators: [Validators.required, this.greaterThanZero.bind(this)]}),
      "hourTime":new FormControl('',{validators: [Validators.required, this.greaterThanZero.bind(this)]}),
      "statusName":new FormControl('',Validators.required),
      // "statusId":new FormControl('',Validators.required),
      "priorityName":new FormControl('',Validators.required),
      // "priorityId":new FormControl('',Validators.required),
    
    });

  }
  //validation for time input that num>0
  greaterThanZero(control: FormControl): { [s: string]: boolean } {
    const controlValue: string = control.value;
    if (+controlValue < 0) {
      return { greaterthanzero: true };
    }

    return null;
  }
  setTODOForm(){
    this.toDoForm.setValue({

    "temptId":this.toDoItem.temptId,
     "toDOText":this.toDoItem.toDOText,
     "mintime":this.toDoItem.mintime,
     "hourTime":this.toDoItem.hourTime,
     "statusName":this.toDoItem.statusName,
    //  "statusId":this.toDoItem.statusId,
     "priorityName":this.toDoItem.priorityName,
    //  "priorityId":this.toDoItem.priorityId


    })
  }
  toDoFormSubmit() {

    let toDOValue:TODOItem;
    // console.log(this.toDoForm.value);
    // console.log(this.toDoForm.valid);
    // console.log(this.editing)
      
    if(this.toDoForm.valid){
      this.showError=false;
      toDOValue=Object.assign({},this.toDoForm.value);
    if(this.editing){

     this.toDoListService.updateItem(toDOValue);
    } else{
     this.toDoListService.addItem(toDOValue);
    
    }
    this.toDoForm.reset();
    this.router.navigate(['ToDoList','add']);

  }else{
    this.showError=true;
  }
  }
  cancel(){

    this.toDoForm.reset();
     this.router.navigate(['ToDoList','add']);
  }
}
