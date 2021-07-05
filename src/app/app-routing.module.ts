import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { ContactResolverService } from './services/contact-resolver-service';

const routes: Routes = [
  {
    path: 'contact/edit', component: ContactEditComponent,
    resolve: { contact: ContactResolverService }
  },
  {
    path: 'contact/:id', component: ContactDetailsComponent,
    resolve: { contact: ContactResolverService }, children: [
      { path: 'edit', component: ContactEditComponent }
    ]
  },
  { path: 'contact', component: ContactPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'stats', component: StatsPageComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, paramsInheritanceStrategy: 'always' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
