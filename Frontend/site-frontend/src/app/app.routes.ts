import { Routes } from '@angular/router';

// this is the only module path that needs to be acessed to display the pages. 
export const routes: Routes = [{
  path: '',
  loadChildren: () => 
    import('./modules/feature/feature.module').then(
      (m) => m.FeatureModule
    )
}]
;
