import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';

@Injectable({
  providedIn: 'root'
})
export class PilotApiService {
  private readonly apiUrl = 'http://localhost:3000/models';

  constructor(private readonly http: HttpClient) { }

  complete(input: string): Observable<ResponseDto | undefined> {
    return this.http.get<ResponseDto>(this.apiUrl, {headers: {'Content-Type': 'application/json'}})
      .pipe(
        catchError((err) => {
          return of(undefined);
        })
      );
  }
}
