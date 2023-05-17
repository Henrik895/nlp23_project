import { Route } from '@angular/router';
import { PilotComponent } from './components/pilot/pilot.component';
import { ModelsComponent } from './components/models/models/models.component';
import { AboutComponent } from './components/about/about/about.component';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        component: PilotComponent,
    },
    {
        path: 'models',
        component: ModelsComponent,
    },
    {
        path: 'about',
        component: AboutComponent,
    },
    {
        path: '**',
        component: PilotComponent,
    },
];