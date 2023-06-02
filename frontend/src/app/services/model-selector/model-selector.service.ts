import { Injectable, signal, WritableSignal } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, tap } from "rxjs";
import { ModelDto } from "../dtos/model.dto";
import { ModelSelectorApiService } from "../model-selector-api/model-selector-api.service";

@Injectable({
    providedIn: 'root'
})
export class ModelSelectorService {
    constructor(
        private readonly modelSelectorApiService: ModelSelectorApiService,
        private readonly toastr: ToastrService,
    ) {
        this.modelSelectorApiService.getModels()
            .pipe(
                tap((models) => {
                    this._activeModel.set(models?.[0]);
                })
            )
            .subscribe((models) => {
                this._models.next(models);
            }); 
    }

    private _activeModel: WritableSignal<ModelDto | undefined> = signal(undefined);
    readonly activeModel = this._activeModel.asReadonly();

    private _models = new BehaviorSubject<ModelDto[]>([]);
    readonly models$ = this._models.asObservable();

    selectModel(model: ModelDto): void {
        this._activeModel.set(model);
        this.toastr.success(`${model.fullName} model is now active`);
    }
}