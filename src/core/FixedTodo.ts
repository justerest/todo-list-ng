import { override } from 'src/utils/metric-decorators';
import { Todo } from './Todo';
import { TodoRenderer } from './TodoRenderer';

export class FixedTodo extends Todo {
  @override
  toggleCompletion(): void {}

  @override
  render(renderer: TodoRenderer): any {
    return renderer.renderFixedTodo(this);
  }
}
