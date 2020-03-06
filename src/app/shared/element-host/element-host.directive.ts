import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  TrackByFunction,
  Type,
  ViewContainerRef,
} from '@angular/core';

export interface ElementHostParams<T = any> {
  id: any;
  component: Type<T>;
  init: (component: T) => void;
}

@Directive({ selector: '[appElementHost]' })
export class ElementHostDirective implements OnChanges {
  static trackByFn: TrackByFunction<ElementHostParams> = (_, item) => item.id;

  @Input() appElementHost!: ElementHostParams;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnChanges(): void {
    const componentRef = this.createComponent();
    this.appElementHost.init(componentRef.instance);
  }

  private createComponent(): ComponentRef<any> {
    this.viewContainerRef.clear();
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.appElementHost.component,
    );
    return this.viewContainerRef.createComponent(componentFactory);
  }
}
