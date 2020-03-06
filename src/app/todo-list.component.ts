import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from 'src/core/Todo';
import { TodoList } from 'src/core/TodoList';
import { ElementHostDirective } from './shared/element-host/element-host.directive';
import { toRxObservable } from './shared/toRxObservable';
import { TodoRendererImp } from './todo-components/TodoRendererImp';

@Component({
  selector: 'app-todo-list',
  template: `
    <div>
      <h2>What to do?</h2>
      <ul>
        <ng-container
          *ngFor="let todo of todoItems$ | async; trackBy: trackByFn"
          [appElementHost]="todo.render(todoRenderer)"
        ></ng-container>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent implements OnInit {
  @Input() todoList!: TodoList;

  todoItems$!: Observable<Todo[]>;

  trackByFn = ElementHostDirective.trackByFn;

  todoRenderer = new TodoRendererImp();

  constructor() {}

  ngOnInit(): void {
    this.todoItems$ = toRxObservable(this.todoList.changes).pipe(
      map(() => [...this.todoList.getUncompletedItems(), ...this.todoList.getCompletedItems()]),
    );
  }
}
