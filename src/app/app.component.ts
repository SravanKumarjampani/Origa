import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class UserData {
  sno: number;
  name: string;
  userName: string;
  city: string;
  pincode: number;
  companyName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'origa';
  ELEMENT_DATA = [];
  displayedColumns: string[] = ['sno', 'name', 'userName', 'city', 'pincode', 'companyName'];
  dataSource;
  userDataArray: any[];
  userData: UserData;
  userCount = 0;
  pieDataArray = [];
  latGreaterZero = 0;
  latLessZero = 0;
  lonGreaterZero = 0;
  lonLessZero = 0;

  public pieChartLabels: string[] = ['Latitude>0', 'Latitude<0', 'Longitutde>0', 'Longitude<0'];
  public pieChartData = [0, 0, 0, 0];
  public pieChartType: string = 'pie';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(
      (response) => {
        if (response) {
          this.userDataArray = response as any[];
          if (this.userDataArray.length > 0) {
            this.userDataArray.forEach(element => {
              this.userData = new UserData();
              this.userData.sno = element.id;
              this.userData.name = element.name;
              this.userData.userName = element.username;
              this.userData.city = element.address.city;
              this.userData.pincode = element.address.zipcode;
              this.userData.companyName = element.company.name;

              this.ELEMENT_DATA.push(this.userData);
              this.userCount++;
              if (element.address.geo.lat > 0) {
                this.latGreaterZero++;
              } else {
                this.latLessZero++;
              }
              if (element.address.geo.lng > 0) {
                this.lonGreaterZero++;
              } else {
                this.lonLessZero++;
              }
            });
            this.pieChartData = [this.latGreaterZero, this.latLessZero, this.lonGreaterZero, this.lonLessZero];
          }
        }
        this.dataSource = this.ELEMENT_DATA;
      }, (error) => {
        console.log(error);
      });
  }

}
