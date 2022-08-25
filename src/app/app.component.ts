import { Component } from '@angular/core';
import { ApiCallsService } from './api-calls.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  constructor(private _apiService: ApiCallsService) {

  }

  combinedData

  getData() {
    this._apiService.getCombinedData().subscribe(data => {
      console.log('this', data);
      this.combinedData = data
    })
  }
}
