import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { StartupComponent } from './startup/startup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StartupComponent],
  imports: [CommonModule, StartupRoutingModule, FormsModule],
})
export class StartupModule {}
