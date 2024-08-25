import { Component, Input } from '@angular/core';
import { FreelancersService } from '../../core/services/freelancers.service';
import { Freelancer, Review, Reviews } from '../../../../types';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../core/services/reviews.service';

@Component({
  selector: 'app-freelancer-review',
  templateUrl: './freelancer-review.component.html',
  styleUrl: './freelancer-review.component.scss',
})
export class FreelancerReviewComponent {
  freelancerId: string | null = null;

  constructor(
    private freelancerService: FreelancersService,
    private reviewService: ReviewsService,
    private route: ActivatedRoute
  ) {}

  reviews: Review[] = [];

  freelancerReviews: Review[] = [];

  freelancer: Freelancer = {
    id: 0,
    freelancer_name: '',
  };

  score: string = '';

  ngOnInit(): void {
    this.freelancerId = this.route.snapshot.paramMap.get('id');
    if (this.freelancerId) {
      this.fetchFreelancer(this.freelancerId); // get freelancer from freelancer table
      this.fetchFreelancerReview(this.freelancerId); // get all the reviews associated with that freelancer
    }
  }

  fetchFreelancer(id: string) {
    this.freelancerService
      .getOneFreelancer(`http://127.0.0.1:8000/api/freelancers/${id}`)
      .subscribe((freelancer: Freelancer) => {
        this.freelancer = freelancer;
      });
  }

  fetchFreelancerReview(id: string) {
    const freelancerID: number = Number(id);
    this.reviewService
      .getFreelancerReviews(`http://127.0.0.1:8000/api/reviews`)
      .subscribe((reviews: Reviews) => {
        this.freelancerReviews = reviews.reviews.filter(
          (review) => review.freelancer === freelancerID
        ); // if the review has the freelancer ID === to the ID of the route, add it to the freelancerReview list.
        this.getScore(); // calculate score as well since this.freelancerReviews is in the same scope. 
      });
  }

  getScore() {
    let freelancerScoreTotal: number = 0;
    let freelancerScore: string = '0.00'
    if (this.freelancerReviews.length !== 0) {
      this.freelancerReviews.forEach((freelancer) => {
        freelancerScoreTotal += freelancer.rating;
      });
      freelancerScore = (freelancerScoreTotal / this.freelancerReviews.length).toFixed(1);
    }
    this.score = freelancerScore;
    console.log(this.score);
  }
}
