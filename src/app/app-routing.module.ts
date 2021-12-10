import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterStateSnapshot } from '@angular/router';
import { ToDoInputComponent } from './toDoInput/toDoInput.component';
import { PageNotFoundComponent } from './pageNotFound/pageNotFound.component';


const routes: Routes = [


  { path: 'ToDoList/:mode', component:ToDoInputComponent },
 { path: 'ToDoList/:mode/:id', component:ToDoInputComponent },
  {path: '', redirectTo: 'ToDoList/add', pathMatch: 'full'},
  {path:"**",component: PageNotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'top' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
