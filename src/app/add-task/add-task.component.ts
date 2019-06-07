import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';


import { TaskService } from '../shared/taskshared/task.service';

import { Task } from '../shared/taskshared/task.model';

import { ParentTask } from '../shared/taskshared/parent-task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

 

  parentTasks: ParentTask[]=[];
  task: Object = {};

  disable: boolean = false;
  editTaskFlag : boolean = false;
  

  constructor(private taskService: TaskService,
    router:Router, route:ActivatedRoute) { 
    
    if(this.taskService.task != null){
      this.task = this.taskService.task;
      this.taskService.task = null;
      this.editTaskFlag = this.taskService.editTaskFlag;
      this.taskService.editTaskFlag = false;
    }
  }

  ngOnInit() {
   
      this.getParentTask();
  }
 
 

  

  addTask(task: Task): void {
   
    this.taskService.addTask(task).subscribe();
  }

  editTask(task : Task): void {
    this.taskService.editTask(task).subscribe();
    this.editTaskFlag = false;
  }

  changeEvent(event: boolean): void{
    this.disable = event;
  }

  getParentTask(): void{
    this.taskService.getParentTask()
    .subscribe(parentTasks => this.parentTasks = parentTasks)
  }


}
