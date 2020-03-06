import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppTodoList } from './common/AppTodoList';
import { TodoListApiImp } from './common/TodoListApi';
import { HistoryControlComponent } from './history-control.component';
import { ElementHostModule } from './shared/element-host/element-host.module';
import { FixedTodoComponent } from './todo-components/fixed-todo.component';
import { SimpleTodoComponent } from './todo-components/simple-todo.component';
import { TodoListComponent } from './todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    SimpleTodoComponent,
    FixedTodoComponent,
    HistoryControlComponent,
  ],
  imports: [BrowserModule, ElementHostModule],
  providers: [{ provide: AppTodoList, useValue: new AppTodoList(new TodoListApiImp()) }],
  bootstrap: [AppComponent],
})
export class AppModule {}
