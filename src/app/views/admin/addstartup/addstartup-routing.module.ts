import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddstartupComponent } from './addstartup/addstartup.component';

const routes: Routes = [{ path: '', component: AddstartupComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddstartupRoutingModule {}
