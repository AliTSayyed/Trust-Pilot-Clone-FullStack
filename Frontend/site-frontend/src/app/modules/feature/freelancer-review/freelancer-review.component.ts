import { Component, Input } from '@angular/core';
import { FreelancersService } from '../../core/services/freelancers.service';
import { Freelancer, Review, Reviews, Stars } from '../../../../types';
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


  freelancerReviews: Review[] = [];

  freelancer: Freelancer = {
    id: 0,
    freelancer_name: '',
  };

  score: string = '';

  stars: Stars = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  };

  starRatings: {
    oneStarPercentage: number;
    twoStarPercentage: number;
    threeStarPercentage: number;
    fourStarPercentage: number;
    fiveStarPercentage: number;
  } = {
    oneStarPercentage: 0,
    twoStarPercentage: 0,
    threeStarPercentage: 0,
    fourStarPercentage: 0,
    fiveStarPercentage: 0,
  };

  ratingValues: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
  };

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
    this.reviewService
      .getReviewsNoParam(`http://127.0.0.1:8000/api/reviews/freelancers/${id}`)
      .subscribe((reviews: Review[]) => {
        this.freelancerReviews = reviews // if the review has the freelancer ID === to the ID of the route, add it to the freelancerReview list.
        console.log(this.freelancerReviews);
        this.getScore(); // calculate score as well since this.freelancerReviews is in the same scope.
      });
  }

  getScore() {
    let freelancerScoreTotal: number = 0;
    let freelancerScore: string = '0.00';
    if (this.freelancerReviews.length !== 0) {
      this.freelancerReviews.forEach((freelancer) => {
        freelancerScoreTotal += freelancer.rating;
        switch (freelancer.rating) {
          case 1:
            this.stars.oneStar++;
            break;
          case 2:
            this.stars.twoStar++;
            break;
          case 3:
            this.stars.threeStar++;
            break;
          case 4:
            this.stars.fourStar++;
            break;
          case 5:
            this.stars.fiveStar++;
            break;
        }
      });

      freelancerScore = (
        freelancerScoreTotal / this.freelancerReviews.length
      ).toFixed(1);
    }

    this.score = freelancerScore;
    this.starRatings = {
      oneStarPercentage:
        (this.stars.oneStar / this.freelancerReviews.length) * 100,
      twoStarPercentage:
        (this.stars.twoStar / this.freelancerReviews.length) * 100,
      threeStarPercentage:
        (this.stars.threeStar / this.freelancerReviews.length) * 100,
      fourStarPercentage:
        (this.stars.fourStar / this.freelancerReviews.length) * 100,
      fiveStarPercentage:
        (this.stars.fiveStar / this.freelancerReviews.length) * 100,
    };
    console.log(this.starRatings);
  }
}
