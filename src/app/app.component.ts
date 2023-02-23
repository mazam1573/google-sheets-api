import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'google-sheets-api';
  sheetData: any[]=[];
  public googleURL: string = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url="; 
  public mobileURL: string = "&strategy=mobile&key=AIzaSyAZhmjWZEHbHxUksCo9u6GTIG8D45JVhvM";
  public desktopURL: string = "&strategy=desktop&key=AIzaSyAZhmjWZEHbHxUksCo9u6GTIG8D45JVhvM";
  constructor(private appservice: AppService){}

  ngOnInit(){
    this.appservice.getSheets().subscribe((res: any) => {
      this.sheetData = res;
      this.sheetData.forEach((rowData, index) => {
        let apiURL = this.googleURL + rowData.url.toString() + this.mobileURL;
        // console.log(apiURL);
        setTimeout(() => {
          this.getApiResult(apiURL, index, rowData)
        }, 5000);
        // this.getApiResult(apiURL, index, rowData);
      })
    })
  };
  
  getApiResult(apiURL:any, index: any, rowData: any){
    this.appservice.getSpeedFromGoogleApi(apiURL).subscribe((res:any)=> {
      console.log(res);
      let mobile = res.lighthouseResult.categories.performance.score * 100
      this.appservice.updateDataGoogleSheet(index, rowData.url, mobile, 0).subscribe((res => {
        console.log(res);
      }))
    }, error => {
      console.log(error);
    })
  }
}
