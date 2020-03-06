import { EditableTodo } from 'src/core/EditableTodo';
import { Todo } from 'src/core/Todo';

export interface TodoRenderer {
  renderSimpleTodo(todo: Todo): any;
  renderFixedTodo(todo: Todo): any;
  renderEditableTodo(todo: EditableTodo): any;
}
