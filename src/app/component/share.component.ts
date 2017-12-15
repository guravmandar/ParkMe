import { Component,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import {IMyDpOptions} from 'mydatepicker';

import { PrivateParkingService } from '../services/privateparking.service';
@Component({
  selector: 'share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent {
    Address:string;
    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };

    // Initialized to specific date (09.10.2018).
    public startTime: any = { date: { year: 2017, month: 12, day: 1 } };
    public endTime: any = { date: { year: 2017, month: 12, day: 1 } };

  constructor(private PrivateParkingService: PrivateParkingService) {
    debugger;
    this.Address = localStorage.getItem('Address');
  }

  shareParking(){
      debugger;
    this.PrivateParkingService.shareParking("","-71.11262690000001",this.Address, this.startTime, this.endTime).subscribe(queryResults => {
        alert("Successfully shared parking spot");
  
      });
  }

  
  

}
