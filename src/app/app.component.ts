
import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { PrivateParkingService } from './services/privateparking.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = '';
  lat: number = 51.678418;
  lng: number = 7.809007;
  Hide: boolean = false;
  public latitude: number;
  public longitude: number;

  latitudeMarker: any[] = [];
  longitudeMarker: number[] = [];
  latLong: any[] = [];
  public searchControl: FormControl;
  public zoom: number;
  isSearch: boolean = true;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  private loggedIn: boolean;
  private loggedInUser: string;
  private loggedInUserId: string;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router, private LoginService: LoginService, private PrivateParkingService: PrivateParkingService) {

    this.loggedIn = !!localStorage.getItem('Username');
    if (this.loggedIn == true) {
      this.loggedInUser = localStorage.getItem('Username');

      this.loggedInUserId = localStorage.getItem('UserId');
    }


    if (this.loggedIn == false) {
      this.router.navigate(['login']);
    }
    else {
      this.router.navigate(['../search']);
    }


  }

  ngOnInit() {

    //set google maps defaults
    this.zoom = 15;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      let map = new google.maps.Map(this.searchElementRef.nativeElement, {
        zoom: this.zoom,
        center: new google.maps.LatLng(40.730610, -73.935242),

      });


      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = this.zoom;
          let self = this;
          var currentLocation = new google.maps.LatLng(this.latitude, this.longitude);
          let request = {
            location: currentLocation,
            radius: 1000,
            types: ['parking']
          };

          let service = new google.maps.places.PlacesService(map)
          service.nearbySearch(request, callback)

          this.PrivateParkingService.getPrivateParkings()
            .subscribe(queryResults => {
              for (var i = 0; i < queryResults.length; i++) {
                debugger;
                this.latLong.push(
                  {
                    'latitude': queryResults[i].Latitude,
                    'longitude': queryResults[i].Longitude,
                    'name': queryResults[i].Name,
                    'vicinity': queryResults[i].Vicinity,
                    'available': queryResults[i].Availability,
                    'id': queryResults[i]._id,
                    'startTime': queryResults[i].startTime == undefined ? 'NA' : queryResults[i].startTime,
                    'endTime': queryResults[i].endTime == undefined ? 'NA' : queryResults[i].endTime,
                  });
              }
            });
          function callback(results: any, status: any) {
            let arr = [];
            let list = new Object()


            for (var i = 0; i < results.length; i++) {

              self.latLong.push({ 'latitude': results[i].geometry.location.lat(), 'longitude': results[i].geometry.location.lng(), 'name': results[i].name, 'vicinity': results[i].vicinity, 'id': results[i]._id, 'available': Math.floor(Math.random() * (100 - 1 + 1)) + 1 });

            }


          }
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

        this.zoom = this.zoom;
      });
    }
  }

  bookParking(parking: any) {

    this.PrivateParkingService.bookParkings(this.loggedInUserId, parking.id, parking.name, parking.startTime, parking.endTime).subscribe(queryResults => {
      alert("Booking successful");

    });
  }

  Logout() {

    this.LoginService.logout();
  }

  History() {
    this.router.navigate(['login']);
  }

  toggleSearch() {
    if (this.isSearch == true) {
      this.isSearch = false;
    }
    else
    {
      this.isSearch = true;
    }
  }

}