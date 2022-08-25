import { Injectable } from '@angular/core';
import { of, Observable, forkJoin } from 'rxjs';
import { map, concatMap, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class ApiCallsService {
  constructor() {}

  idData = [
    {
      _id: '5c9dda9aca9c171d6ba4b87e',
    },
    {
      _id: '5c9ddb82ca9c171d6ba4b87f',
    },
  ];

  authorData = [
    {
      _id: '5c9dda9aca9c171d6ba4b87e',
      author: 'Luke',
    },
    {
      _id: '5c9ddb82ca9c171d6ba4b87f',
      author: 'Neel',
    },
  ];

  titleData = [
    {
      _id: '5c9dda9aca9c171d6ba4b87e',
      title: 'Mrs',
    },
    {
      _id: '5c9ddb82ca9c171d6ba4b87f',
      title: 'Mr',
    },
  ];

  public getMultipleRelationData(): Observable<any> {
    return of(this.idData);
  }

  public getAuthorData(id): Observable<any> {
    let foundIdData = this.authorData.find((data) => data._id === id);
    return of(foundIdData);
  }

  public getTitleData(id): Observable<any> {
    let foundIdData = this.titleData.find((data) => data._id === id);
    return of(foundIdData);
  }

  public getCombinedData(): Observable<any> {
    return this.getMultipleRelationData().pipe(
      mergeMap((result: any) => {
        console.log(result);
        let allIds = result.map((id) => this.getAuthorData(id._id));
        let allIds1 = result.map((id) => this.getTitleData(id._id));
        return result;
        // return forkJoin(allIds1).pipe(
        //   map((idDataArray) => {
        //     console.log(idDataArray);
        //     result.contact.forEach((eachContact, index) => {
        //       eachContact.relationship = idDataArray[index];
        //     });
        //     return result;
        //   })
        // );
      })
    );
  }
}
