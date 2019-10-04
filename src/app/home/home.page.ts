import { Component } from '@angular/core';
import {Task} from '../models/task';
import {TaskStorageService} from '../services/task-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private taskStorage: TaskStorageService) {
    this.taskStorage.getTasks().then(tasks => {
      if (null !== tasks) {
        this.tasks = tasks;
      }
    });
  }

  /*** Création d'une tâche*/
  task: Task = new Task();

  /***liste des tâches*/
  tasks: Task[] = [
    {
      id: 1,
      title: 'faire la vaisselle',
      status: false
    },
    {
      id: 2,
      title: 'sortir la poubelle',
      status: true
    },
    {
      id: 3,
      title: 'faire une balade avec mon chéri',
      status: false
    }
  ];

  /**
   * cette fonction déclenche l'enregistrement lors de la pression sur "Entrer"
   * @param code
   */
  saveTask(code: string): void {
    if ( code === 'Enter') {
      // -- je pousse dans mon tableau la nouvelle tâche
      this.tasks.push( this.task );
      // -- j'enregistre les tâches
      this.taskStorage.saveTasks( this.tasks );
      // -- je remets à zéro la tâche
      this.task = new Task();
    }
  }
}
