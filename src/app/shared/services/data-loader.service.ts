import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataLoadModule } from '../models/data-loader.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {

  constructor(private http: HttpClient) { }

  parseLoadDataXML() {
    const httpHeader = new HttpHeaders();
    const reqHeader = httpHeader.set('Content-Type', 'text/xml');
    return this.http.get('assets/Data/LoadDataRef.xml', {
      headers: reqHeader,
      responseType: 'text'
    });
  }

  getModuleData(moduleData: DataLoadModule) {
    const fileUrl = moduleData.dataFilePath + moduleData.dataFileName;
    return this.http.get(fileUrl, {
      responseType: 'text'
    }).pipe(map(data => {
      return {
        content: data,
        moduleDetail: moduleData
      };
    }));
  }
}
