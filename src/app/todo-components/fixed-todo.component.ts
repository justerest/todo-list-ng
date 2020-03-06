import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Todo } from 'src/core/Todo';

@Component({
  selector: 'app-fixed-todo',
  template: `
    <li style="cursor: not-allowed;">
      {{ todo.getTitle() }}
    </li>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedTodoComponent implements OnInit {
  @Input() todo!: Todo;

  constructor() {}

  ngOnInit(): void {}
}
