import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddstartupRoutingModule } from './addstartup-routing.module';
import { AddstartupComponent } from './addstartup/addstartup.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddstartupComponent],
  imports: [CommonModule, AddstartupRoutingModule, FormsModule],
})
export class AddstartupModule {}
