import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataLoadModule } from 'src/app/shared/models/data-loader.model';
import { ImportDataComponent } from 'src/app/superadmin/import-data/import-data.component';
import { from, of, Observable, pipe } from 'rxjs';
import { concatMap, catchError, map, shareReplay } from 'rxjs/operators';
import { Feature } from '../models/feature.model';

@Injectable({
  providedIn: 'root'
})
export class FeatureService {
  moduleName = 'user';
  private cachedFeatures: Observable<any[]>;
  constructor(private http: HttpClient) { }

  createFeature(feature) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/create_feature`, feature)
      .pipe(
        catchError(error => {return of({
          status: false
        })
      })
    );
  }

  uploadFeatures(rows, moduleDetails: DataLoadModule, dataLoaderCmp: ImportDataComponent) {
    return from(rows).pipe(
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
    );
  }

  getNavigationFeatures() {
    let navItems = [];
    return this.getRoleFeatures().pipe(
      map((data: any) => {
        const allFeatures = data.features;
        allFeatures.forEach((item) => {
          item.label = item.name;
          item.routerLink = item.featureRoute;
        });
        const navMenuItems = data.features.filter((d) => d.isMenuFeature && !d.parent);
        navMenuItems.forEach((item) => {
          delete item.routerLink;
          item.items = allFeatures.filter((d) => d.isMenuFeature && item._id === d.parent);
        });
        return navMenuItems;
      })
    );
  }

  getRoleFeatures() {
    if (!this.cachedFeatures) {
      this.cachedFeatures = this.requestRoleFeatures().pipe(
        shareReplay(1000)
      );
    }
    return this.cachedFeatures;
  }

  requestRoleFeatures() {
    return this.http.get<any>(`${environment.ApiURL}/api/${this.moduleName}/get_role_features`)
      .pipe(
        map(response => {
          return response;
        })
      );    
  }
}
