import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { TodoType } from 'src/core/TodoFactory';
import { AppTodoList } from './common/AppTodoList';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <h1>Todo List App</h1>
    </header>
    <app-todo-list [todoList]="todoList"></app-todo-list>
    <button (click)="addEditableTodo()">Add Editable Todo</button>
    <app-history-control [historyControl]="todoList.getHistory()"></app-history-control>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(public todoList: AppTodoList) {}

  ngOnInit(): void {
    this.todoList.resolve();
  }

  addEditableTodo(): void {
    this.todoList.add({
      title: `Todo ${this.todoList.getItems().length + 1}`,
      type: TodoType.Editable,
    });
  }
}
