import { Todo } from './Todo';
import { TodoRenderer } from './TodoRenderer';

export class EditableTodo extends Todo {
  changeTitle(title: string): void {
    this.title = title;
    this.onChange?.(this);
  }

  render(renderer: TodoRenderer): any {
    return renderer.renderEditableTodo(this);
  }
}
