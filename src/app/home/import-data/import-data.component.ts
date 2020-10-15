import { Component, OnInit, Injector } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataLoadModule } from 'src/app/shared/models/data-loader.model';
import { DataLoaderService } from 'src/app/shared/services/data-loader.service';
import { MasterDataService } from 'src/app/user/services/master-data.service';
import { FeatureService } from 'src/app/user/services/feature.service';
import { from, Observable, of, empty, onErrorResumeNext } from 'rxjs';
import { concatMap, catchError, map, switchMap } from 'rxjs/operators';
const loadDataModels = {
  MasterDataService,
  FeatureService
};

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
  totalModules: number;
  filesToLoad: DataLoadModule[] = [];
  modulesForLoading: DataLoadModule[] = [];
  totalRecordsToLoad: number = 0;
  totalRecordsLoaded: number = 0;
  totalRecordsFailed: number = 0;
  totalRemainingRecords: number = 0;
  totalUploadedPercentage: number = 0;
  totalFailedPercentage: number = 0;
  totalRemainingPercentage: number = 0;
  isDataFilesRead = false;
  constructor(private dataLoader: DataLoaderService, private injector: Injector) { }

  ngOnInit(): void {
  }

  loadModules() {
    console.log('load-modules');
    this.dataLoader.parseLoadDataXML().subscribe(
      data => {
        const xmlParser = new DOMParser();
        const loadDataXML = xmlParser.parseFromString(data, 'text/xml');
        this.totalModules = loadDataXML.getElementsByTagName('LoadDataModule').length;
        for (let index = 0; index < this.totalModules; index++) {
          const currentModule = loadDataXML.getElementsByTagName('LoadDataModule')[index];
          const newModule = new DataLoadModule();
          newModule.moduleName = currentModule.getElementsByTagName('ModuleName')[0].textContent;
          newModule.dataFileName = currentModule.getElementsByTagName('DataFileName')[0].textContent;
          newModule.dataFilePath = currentModule.getElementsByTagName('DataFilePath')[0].textContent;
          newModule.actionName = currentModule.getElementsByTagName('ActionName')[0].textContent;
          newModule.action = currentModule.getElementsByTagName('Action')[0].textContent;
          this.filesToLoad.push(newModule);
        }
      },
      error => {},
      () => {
        console.log('XML File Read Completed');
        this.readDataFile();
      }
    );
  }

  readDataFile() {
    from(this.filesToLoad).pipe(
      concatMap(param => this.dataLoader.getModuleData(param))
    ).subscribe(
      data => {
        const moduleDetail = data.moduleDetail;
        const allTextLines = data.content.split(/\r\n|\n/);
        const records = [];
        for (let index = 1; index < allTextLines.length; index++) {
          records.push(allTextLines[index].split(','));
        }

        moduleDetail.recordsToLoad = records.length;
        this.totalRecordsToLoad = this.totalRecordsToLoad + records.length;
        moduleDetail.remainingRecords = records.length;
        this.totalRemainingRecords = this.totalRemainingRecords + records.length;
        moduleDetail.recordsLoaded = 0;
        this.totalRecordsLoaded = this.totalRecordsLoaded + 0;
        moduleDetail.recordsFailed = 0;
        this.totalRecordsFailed = this.totalRecordsFailed + 0;
        moduleDetail.uploadedPercentage = 0;
        this.totalUploadedPercentage = 0;
        moduleDetail.failedPercentage = 0;
        this.totalFailedPercentage = 0;
        moduleDetail.remainingPercentage = 100;
        this.totalRemainingPercentage = 100;
        moduleDetail.records = records;
        this.modulesForLoading.push(moduleDetail);
      },
      error => {
        console.log('Inside Error');
      },
      () => {
        // this.uploadData();
        this.isDataFilesRead = true;
      }
    );
  }

  uploadData() {
    let tmpIndex = -1;
    from(this.modulesForLoading).pipe(
      concatMap(param => {
        tmpIndex++;
        const moduleName = param.moduleName + 'Service';
        const serviceObj = this.injector.get<any>(loadDataModels[moduleName]);
        return serviceObj[param.action](param.records, param, this);
      })
    ).subscribe(
      (data: any) => {
        this.updateProgress(this.modulesForLoading[tmpIndex], data.status);
      },
      () => {
        console.log('Module Loaded - ' + this.modulesForLoading[tmpIndex].moduleName);
        tmpIndex++;
      }
    );
  }

  updateProgress(moduleDetail: DataLoadModule, status) {
    if (status) {
      moduleDetail.recordsLoaded = moduleDetail.recordsLoaded + 1;
      this.totalRecordsLoaded = this.totalRecordsLoaded + 1;
      moduleDetail.uploadedPercentage = Math.round((moduleDetail.recordsLoaded / moduleDetail.recordsToLoad) * 100);
      this.totalUploadedPercentage = Math.round((this.totalRecordsLoaded / this.totalRecordsToLoad) * 100);
    } else {
      moduleDetail.recordsFailed = moduleDetail.recordsFailed + 1;
      this.totalRecordsFailed = this.totalRecordsFailed + 1;
      moduleDetail.failedPercentage = Math.round((moduleDetail.recordsFailed / moduleDetail.recordsToLoad) * 100);
      this.totalFailedPercentage = Math.round((this.totalRecordsFailed / this.totalRecordsToLoad) * 100);
    }

    moduleDetail.remainingRecords = moduleDetail.remainingRecords - 1;
    this.totalRemainingRecords = this.totalRemainingRecords - 1;
    moduleDetail.remainingPercentage = Math.round((moduleDetail.remainingRecords / moduleDetail.recordsToLoad) * 100);
    this.totalRemainingPercentage = Math.round((this.totalRemainingRecords / this.totalRecordsToLoad) * 100);
  }

}
