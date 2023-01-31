import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from 'src/app/lib/services/service.service';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css'],
})
export class StartupComponent implements OnDestroy {
  messegeclint: any;
  percentage: any;
  sub: Subscription | undefined;
  constructor(private service: ServiceService) {}

  //  function add request from client to admin start
  addRequest(requestform: any) {
    let requestData = requestform.value;
    this.service
      .addstartupsRequest({ ...requestData, logo: this.percentage })
      .then(() => {
        this.messegeclint = 'request sent';
        window.location.reload();
      });
  }
  //  function add request from client to admin end

  // upload photo from firebase storage start

  upload(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      this.sub = this.service.uploadimage(file).subscribe((value) => {
        this.percentage = value;
      });
    }
  }
  // upload photo from firebase storage end
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
