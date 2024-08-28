import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../../../types';
import { ReviewsService } from '../../core/services/reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrl: './submit-review.component.scss',
})
export class SubmitReviewComponent {
  constructor(private reviewService: ReviewsService, private router: Router) {}

  // variable to keep track of what page to display (submit page or thank you page)
  reviewSubmitted: boolean = false;

  // cancel button click takes user to back to the homepage
  homePage() {
    this.router.navigate(['']);
  }

  // this is the object created when a user fills in the form. 
  reviewForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    freelancer: new FormControl('', [Validators.required]),
    rating: new FormControl(0, [Validators.required]),
    review_text: new FormControl('', [Validators.required]),
  });

  // this is the post method, takes in a review object
  submitReview(review: Review) {
    this.reviewService
      .postReview('http://127.0.0.1:8000/api/reviews/', review)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // when the submit button is pressed the review object is submitted and sent to the backend. 
  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewObj = this.reviewForm.value;

      // Creating the Review object with the correct keys
      const review: Review = {
        user_name: reviewObj.name,
        freelancer_name: reviewObj.freelancer,
        rating: reviewObj.rating,
        review_text: reviewObj.review_text,
        date: '',
      };

      // Directly submit the review to the backend
      this.submitReview(review);
      // show thank you page
      this.reviewSubmitted = true;
    }
  }

  // show the submission page
  writeAnotherReview() {
    this.reviewSubmitted = false;
    this.reviewForm.reset();
  }
}
