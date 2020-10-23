import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, concatMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { DataLoadModule } from 'src/app/shared/models/data-loader.model';
import { ImportDataComponent } from 'src/app/home/import-data/import-data.component';
import { from } from 'rxjs';
import { FeatureService } from './feature.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  moduleName = 'user';
  constructor(private http: HttpClient, private authService: AuthService, private featureService: FeatureService) { }

  createUser(userData, action?) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/create_user`, userData);
  }

  authenticateUser(userData) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/authenticate_user`, userData).pipe(
      map((res: any) => {
      if (res.user) {
        this.authService.setCurrentUser(res.user);
        this.authService.setUserToken(res.token);
      }
      return res;
    }));
  }

  uploadUsers(rows, moduleDetails: DataLoadModule, dataLoaderCmp: ImportDataComponent) {
    return from(rows).pipe(
      concatMap(currentRow => {
        const userObj:any = {};
        userObj.username = currentRow[0];
        userObj.password = currentRow[1];
        userObj.active_role = currentRow[3];
        userObj.status = currentRow[4];
        userObj.email = currentRow[5];
        userObj.mobileNo = currentRow[6];
        userObj.action = 'upload';
        return this.createUser(userObj);
      })
    );
  }
}
