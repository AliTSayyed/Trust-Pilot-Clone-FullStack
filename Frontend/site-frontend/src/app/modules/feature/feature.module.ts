import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { HomeComponent } from './home/home.component';
import { SubmitReviewComponent } from './submit-review/submit-review.component';
import { FreelancerReviewComponent } from './freelancer-review/freelancer-review.component';
import { HeaderComponent } from '../shared/header/header.component';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../shared/shared.module';
import { PaginatorModule } from 'primeng/paginator';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [HomeComponent, SubmitReviewComponent, FreelancerReviewComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    HeaderComponent,
    ButtonModule, 
    SharedModule,
    PaginatorModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    RatingModule,
    ReactiveFormsModule,
    FormsModule,
],
})
export class FeatureModule { }
