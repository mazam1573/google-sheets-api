import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sheet } from './models/sheet.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getSheets(){
    return this.http.get(`${environment.CONNECTION_URL}`);
  }

  getSpeedFromGoogleApi(apiURL: any){
    return this.http.get(`${apiURL}`);
  }

  updateDataGoogleSheet(id: number, url: string, mobile: number, desktop: number): Observable<Sheet>{
    return this.http.put<Sheet>(`${environment.CONNECTION_URL}/${id}`, {url, mobile, desktop});
  }
}
