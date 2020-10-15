import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataLoadModule } from 'src/app/shared/models/data-loader.model';
import { ImportDataComponent } from 'src/app/home/import-data/import-data.component';
import { from, of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';
import { Feature } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  moduleName = 'user';
  constructor(private http: HttpClient) { }

  createFeature(feature) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/create_feature`, feature)
      .pipe(
        catchError(error => {return of({
          status: false
        })})
      );
  }

  uploadFeatures(rows, moduleDetails: DataLoadModule, dataLoaderCmp: ImportDataComponent) {
    from(rows).pipe(
      concatMap(currentRow => {
        const featureObj = new Feature();
        featureObj.code = currentRow[0];
        featureObj.name = currentRow[1];
        featureObj.title = currentRow[2];
        featureObj.displayOrder = currentRow[3];
        featureObj.parent = currentRow[4];
        featureObj.isMenuFeature = currentRow[5];
        featureObj.isToolbarFeature = currentRow[6];
        featureObj.isAppFeature = currentRow[7];
        featureObj.isWebFeature = currentRow[8];
        featureObj.featureType = currentRow[9];
        featureObj.featureRoute = currentRow[10];
        featureObj.featureWebIconClass = currentRow[11];
        featureObj.featureAppIconClass = currentRow[12];
        return this.createFeature(featureObj);
      })
    ).subscribe(
      data => {
        dataLoaderCmp.updateProgress(moduleDetails, true);
      },
      error => {
        dataLoaderCmp.updateProgress(moduleDetails, false);
      }
    )
  }
}
