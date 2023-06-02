import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, map, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { ModelDto } from "../dtos/model.dto";

type ModelsResponse = {models: ModelDto[]};

@Injectable({
    providedIn: 'root'
})
export class ModelSelectorApiService {
    private readonly api = `${environment.api}/models`;

    constructor(
        private readonly http: HttpClient,
        private readonly toastr: ToastrService,
    ) {}

    getModels(): Observable<ModelDto[]> {
        return this.http.get<ModelsResponse>(this.api, {headers: {'Content-Type': 'application/json'}})
            .pipe(
                map((res) => {
                    return res.models;
                }),
                catchError((err) => {
                    console.log(err);
                    this.toastr.error('Loading models failed. Try again.');
                    return [];
                })
            )
    }
}