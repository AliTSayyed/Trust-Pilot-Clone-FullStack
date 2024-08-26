import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubmitReviewComponent } from './submit-review/submit-review.component';
import { FreelancerReviewComponent } from './freelancer-review/freelancer-review.component';
import { UserReviewComponent } from './user-review/user-review.component';

const routes: Routes = [{
  path:'',
  component: HomeComponent
},
{
  path:'submit-review',
  component: SubmitReviewComponent
},
{
  path:'freelancer/:id',
  component: FreelancerReviewComponent
},
{
  path:'user/:id',
  component: UserReviewComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
