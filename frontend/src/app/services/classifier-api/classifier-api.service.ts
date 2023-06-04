import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { ClassifierResponseDto } from "../dtos/classifier-response.dto";

@Injectable({
    providedIn: 'root'
})
export class ClassifierApiService {
    private readonly api = `${environment.api}/models/classify`;

    constructor(
        private readonly http: HttpClient,
        private readonly toastr: ToastrService,
    ) {}

    classify(text: string): Observable<ClassifierResponseDto | undefined> {
        return this.http.post<ClassifierResponseDto>(this.api, {text}, {headers: {'Content-Type': 'application/json'}})
            .pipe(
                catchError((err) => {
                    console.log(err);
                    this.toastr.error('Text classification failed.');
                    return of(undefined);
                })
            );
    }
}