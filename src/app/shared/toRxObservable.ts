import { Observable as RxObservable } from 'rxjs';

import { Observable } from 'src/utils/Observable';

export function toRxObservable<T>(observable: Observable<T>): RxObservable<T> {
  return new RxObservable((subscriber) => observable.subscribe((value) => subscriber.next(value)));
}
