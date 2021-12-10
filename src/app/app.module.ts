import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ToDoListComponent } from './toDoList/toDoList.component';
import { ToDoItemComponent } from './toDoItem/toDoItem.component';
import { ToDoInputComponent } from './toDoInput/toDoInput.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';

import { ToDoListService } from './_services/toDoService.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';


@NgModule({
   declarations: [	
      AppComponent,
      ToDoListComponent,
      ToDoItemComponent,
      ToDoInputComponent,
      PageNotFoundComponent,
      NavComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,ReactiveFormsModule, NgbModule
   ],
   providers: [ToDoListService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
