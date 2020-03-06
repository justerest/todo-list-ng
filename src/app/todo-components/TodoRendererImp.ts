import { EditableTodo } from 'src/core/EditableTodo';
import { Todo } from 'src/core/Todo';
import { TodoRenderer } from 'src/core/TodoRenderer';
import { ElementHostParams } from '../shared/element-host/element-host.directive';
import { FixedTodoComponent } from './fixed-todo.component';
import { SimpleTodoComponent } from './simple-todo.component';

export class TodoRendererImp implements TodoRenderer {
  renderSimpleTodo(todo: Todo): ElementHostParams {
    return { id: todo.id, component: SimpleTodoComponent, init: (cmp) => (cmp.todo = todo) };
  }

  renderFixedTodo(todo: Todo): ElementHostParams {
    return { id: todo.id, component: FixedTodoComponent, init: (cmp) => (cmp.todo = todo) };
  }

  renderEditableTodo(todo: EditableTodo): ElementHostParams {
    return this.renderSimpleTodo(todo);
  }
}
