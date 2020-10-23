import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, concatMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { DataLoadModule } from 'src/app/shared/models/data-loader.model';
import { ImportDataComponent } from 'src/app/home/import-data/import-data.component';
import { Role, RoleFeatureMapping } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  moduleName = 'user';
  constructor(private http: HttpClient) { }

  createRole(roleData) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/create_role`, roleData)
      .pipe(
        catchError(error => {return of({
          status: false
        })
      })
    );
  }

  updateRoleFeatureMapping(roleData) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/update_role_feature_map`, roleData)
      .pipe(
        catchError(error => {return of({
          status: false
        })
      })
    );
  }

  uploadRoles(rows, moduleDetails: DataLoadModule, dataLoaderCmp: ImportDataComponent) {
    return from(rows).pipe(
      concatMap(currentRow => {
        const roleObj = new Role();
        roleObj.code = currentRow[0];
        roleObj.name = currentRow[1];
        roleObj.description = currentRow[2];
        return this.createRole(roleObj);
      })
    );
  }

  uploadRoleFeatureMapping(rows, moduleDetails: DataLoadModule, dataLoaderCmp: ImportDataComponent) {
    return from(rows).pipe(
      concatMap(currentRow => {
        const roleFeatureObj = new RoleFeatureMapping();
        roleFeatureObj.roleCode = currentRow[0];
        roleFeatureObj.featureCode = currentRow[1];
        return this.updateRoleFeatureMapping(roleFeatureObj);
      })
    );
  }
}
