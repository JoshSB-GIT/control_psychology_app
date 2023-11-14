import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/authGuardians/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badges',
        loadComponent: () => import('./basic-roles/basic-roles.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'users',
        loadComponent: () => import('./basic-users/basic-users.component'),
        canActivate: [AuthGuard],
      },
      {
        path: 'citaciones',
        loadComponent: () =>
          import('./basic-citaciones/basic-citaciones.component'),
          canActivate: [AuthGuard],
      },
      {
        path: 'basic-visitas',
        loadComponent: () =>
          import('./basic-visitas/basic-visitas.component'),
          canActivate: [AuthGuard],
      },
      {
        path: 'results',
        loadComponent: () =>
          import('./basic-results/basic-results.component'),
          canActivate: [AuthGuard],
      },
      {
        path: 'typography',
        loadComponent: () =>
          import('./basic-typography/basic-typography.component'),
          canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiBasicRoutingModule {}
