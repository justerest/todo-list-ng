import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

import { Subscription } from 'src/utils/Observable';
import { HistoryControl } from './common/TodoListHistory';

@Component({
  selector: 'app-history-control',
  template: `
    <p>
      <button [disabled]="!historyControl.hasPrev()" (click)="historyControl.switchToPrev()">
        ↪️
      </button>
      &nbsp;
      <button [disabled]="!historyControl.hasNext()" (click)="historyControl.switchToNext()">
        ↩️
      </button>
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryControlComponent implements OnInit {
  @Input() historyControl!: HistoryControl;

  private subscription!: Subscription;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscription = this.historyControl.changes.subscribe(() =>
      this.changeDetectorRef.markForCheck(),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
