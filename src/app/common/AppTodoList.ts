import { Todo } from 'src/core/Todo';
import { TodoFactory, TodoParams } from 'src/core/TodoFactory';
import { TodoList, TodoListImp } from 'src/core/TodoList';
import { Observable, Subject, Subscription } from 'src/utils/Observable';
import { TodoListApi } from './TodoListApi';
import { HistoryControl, TodoListHistory } from './TodoListHistory';

export class AppTodoList implements TodoList {
  private changesSubject = new Subject();
  private readonly todoFactory = new TodoFactory();
  private readonly history: TodoListHistory = new TodoListHistory();

  readonly changes: Observable = this.changesSubject.asObservable();

  private state: TodoList = new TodoListImp();
  private stateSubscription: Subscription = this.state.changes.subscribe(() =>
    this.onStateChanges(),
  );
  private historySubscription = this.history.switched.subscribe(() => this.onHistorySwitched());

  constructor(private api: TodoListApi) {}

  async resolve(): Promise<void> {
    const todoParamsList = await this.api.getItems();
    this.history.reset(todoParamsList);
    this.updateStateTodoList(todoParamsList);
  }

  destroy(): void {
    this.stateSubscription.unsubscribe();
    this.historySubscription.unsubscribe();
  }

  getHistory(): HistoryControl<TodoParams[]> {
    return this.history;
  }

  getItems(): Todo[] {
    return this.state.getItems();
  }

  getCompletedItems(): Todo[] {
    return this.state.getCompletedItems();
  }

  getUncompletedItems(): Todo[] {
    return this.state.getUncompletedItems();
  }

  add(todoParams: TodoParams): void {
    this.state.add(todoParams);
  }

  private onStateChanges(): void {
    const params = this.state.getItems().map((todo) => this.todoFactory.serializeTodo(todo));
    this.history.setState(params);
    this.api.save(params).catch(() => {});
    this.changesSubject.next({});
  }

  private onHistorySwitched(): void {
    const params = this.history.getState();
    this.updateStateTodoList(params);
    this.api.save(params).catch(() => {});
  }

  private updateStateTodoList(todoParamsList: TodoParams[]): void {
    const todoList = new TodoListImp(todoParamsList);
    this.state = todoList;
    this.stateSubscription.unsubscribe();
    this.stateSubscription = this.state.changes.subscribe(() => this.onStateChanges());
    this.changesSubject.next({});
  }
}
