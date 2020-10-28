import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataLoadModule } from 'src/app/shared/models/data-loader.model';
import { from, of } from 'rxjs';
import { concatMap, catchError } from 'rxjs/operators';
import { MasterData } from '../models/masterdata.model';
import { ImportDataComponent } from 'src/app/superadmin/import-data/import-data.component';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  moduleName = 'user';
  constructor(private http: HttpClient) { }

  createMasterData(dataConfig) {
    return this.http.post(`${environment.ApiURL}/api/${this.moduleName}/create_master_data`, dataConfig)
      .pipe(
        catchError(error => {return of({
          status: false
        })})
      );
  }

  uploadMasterData(rows, moduleDetails: DataLoadModule, dataLoaderCmp: ImportDataComponent) {
    return from(rows).pipe(
      concatMap(currentRow => {
        const masterDataObj = new MasterData();
        masterDataObj.code = currentRow[0];
        masterDataObj.name = currentRow[1];
        masterDataObj.summary = currentRow[2];
        masterDataObj.displayOrder = currentRow[3];
        masterDataObj.parent = currentRow[4];
        return this.createMasterData(masterDataObj);
      })
    );
  }
}
