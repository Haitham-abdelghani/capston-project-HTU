import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';

import { ShareIconsModule } from 'ngx-sharebuttons/icons';
@NgModule({
  declarations: [AdminLayoutComponent, FrontLayoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ShareButtonsModule,
    ShareIconsModule,
  ],
})
export class LayoutsModule {}
