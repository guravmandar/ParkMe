import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PrivateParkingService } from './../services/privateparking.service';

@Component({
  selector: 'history',
  templateUrl: './archive.component.html',
  providers: [PrivateParkingService]
})
export class ArchiveComponent implements OnChanges {
  private loggedIn: boolean;
  private loggedInUser: string;
  private loggedInUserId: string;
  userHistory:any[] = [];
  ngOnChanges(changes: any) {

  }

  constructor(private router: Router, private PrivateParkingService: PrivateParkingService) {
    debugger;
    this.loggedIn = !!localStorage.getItem('Username');
    if (this.loggedIn == true) {
      this.loggedInUser = localStorage.getItem('Username');

      this.loggedInUserId = localStorage.getItem('UserId');

    }

    this.loggedIn = !!localStorage.getItem('Username');
    if (this.loggedIn == true) {
      this.loggedInUser = localStorage.getItem('Username');

      this.loggedInUserId = localStorage.getItem('UserId');
    }


    if (this.loggedIn == false) {
      this.router.navigate(['login']);
    }
 
    this.getUserHistory();
  }


  getUserHistory() {
   
    this.PrivateParkingService.getMyParkingHistory(this.loggedInUserId)
      .subscribe(queryResults => {
        debugger;
        
        for (var i = 0; i <queryResults.length; i++) {
          if (queryResults[i].availability == null) {
            queryResults[i].availability = 1;
          }
          

      }

      this.userHistory = queryResults;
      });


  }





}
