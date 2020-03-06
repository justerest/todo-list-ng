import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Todo } from 'src/core/Todo';

@Component({
  selector: 'app-simple-todo',
  template: `
    <li
      [style]="todo.isCompleted() ? 'text-decoration: line-through;' : ''"
      (click)="todo.toggleCompletion()"
    >
      {{ todo.getTitle() }}
    </li>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTodoComponent implements OnInit {
  @Input() todo!: Todo;

  constructor() {}

  ngOnInit(): void {}
}
