import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ElementHostDirective } from './element-host.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [ElementHostDirective],
	exports: [ElementHostDirective],
})
export class ElementHostModule {}
