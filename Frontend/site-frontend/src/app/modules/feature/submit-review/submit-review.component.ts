import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Freelancer, Review, User } from '../../../../types';

@Component({
  selector: 'app-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrl: './submit-review.component.scss',
})
export class SubmitReviewComponent {
  @Output() submit = new EventEmitter<Review>();
  
  reviewForm: FormGroup = new FormGroup({
    name: new FormControl(),
    freelancer: new FormControl(),
    rating: new FormControl(0),
    review_text: new FormControl(),
  });

  review: Review = {
    user: 0,
    rating: 0,
    review_text: "",
    date: "",
    freelancer: 0,
  }

  user: User = {
    id: 0,
    user_name: ""
  }
  
  freelancer: Freelancer = {
    id: 0,
    freelancer_name: ""
  }

  onSubmit() {
    const reviewObj = this.reviewForm.value;
    console.log(reviewObj);

    console.log('Review sent');
  }
}
