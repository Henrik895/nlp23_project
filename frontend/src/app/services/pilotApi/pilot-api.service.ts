import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PilotApiService {
  // Currently hardcoded
  private readonly model: string = 'wsb';
  private readonly apiUrl = 'http://localhost:3000/models';

  constructor(
    private readonly http: HttpClient,
    private readonly toastr: ToastrService,
  ) { }

  complete(text: string): Observable<ResponseDto | undefined> {
    const url = `${this.apiUrl}/${this.model}`;
    return this.http.post<ResponseDto>(url, {text}, {headers: {'Content-Type': 'application/json'}})
      .pipe(
        catchError((err) => {
          console.log(err);
          this.toastr.error('Text completion unsuccessful. Try again.');
          return of(undefined);
        })
      );
  }
}
