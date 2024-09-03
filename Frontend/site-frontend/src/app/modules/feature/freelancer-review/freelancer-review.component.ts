import { Component } from '@angular/core';
import { FreelancersService } from '../../core/services/freelancers.service';
import { Freelancer, Review, User } from '../../../../types';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../core/services/reviews.service';
import { UsersService } from '../../core/services/users.service';

@Component({
  selector: 'app-freelancer-review',
  templateUrl: './freelancer-review.component.html',
  styleUrl: './freelancer-review.component.scss',
})
export class FreelancerReviewComponent {
  // Keeps track of the freelancer's id. It is a string because the id from the url will be a string. The review.component.html will provide the id.
  freelancerId: string | null = null;

  constructor(
    private freelancerService: FreelancersService,
    private reviewService: ReviewsService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {}

  // store all the freelancers to pass to the review component
  freelancers: Freelancer[] = [];

  // store all the users to pass to the review component
  users: User[] = [];

  // stores all the reviews related to the freelancer.
  freelancerReviews: Review[] = [];

  // stores the freelancer object which contains name and id
  freelancer: Freelancer = {
    id: 0,
    freelancer_name: '',
  };

  // score to dislay, use a string so that .toFixed() can be used
  score: string = '';

  // store stars object which will keep track of how many of each rating (star) a freelancer has
  stars: {
    oneStar: number;
    twoStar: number;
    threeStar: number;
    fourStar: number;
    fiveStar: number;
  } = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  };

  // this will keep track of the percentage of each star rating for the freelancer
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

  // this is used to store the value of stars filled in the p-rating module.
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

  // Get freelancers and users to input into the review component. 
  fetchFreelancersAndUsers() {
    this.freelancerService
      .getFreelancers('http://127.0.0.1:8000/api/freelancers/')
      .subscribe((response: Freelancer[]) => {
        this.freelancers = response;
      });
    this.userService
      .getUsers('http://127.0.0.1:8000/api/users/')
      .subscribe((response: User[]) => {
        this.users = response;
      });
  }

  // use the id to fetch the freelancer object
  fetchFreelancer(id: string) {
    this.freelancerService
      .getOneFreelancer(`http://127.0.0.1:8000/api/freelancers/${id}`)
      .subscribe((freelancer: Freelancer) => {
        this.freelancer = freelancer;
      });
  }

  // use the id to fetch all the reviews for the freelancer. Filtering done in the backend. Call the get score here since this.freelancerReviews will be empty outside this scope.
  fetchFreelancerReview(id: string) {
    this.reviewService
      .getReviewsNoParam(`http://127.0.0.1:8000/api/reviews/freelancers/${id}`)
      .subscribe((reviews: Review[]) => {
        this.freelancerReviews = reviews;
        this.getScore(); // calculate score as well since this.freelancerReviews is in the same scope.
      });
  }

  // calculate the average score of the freelancer and keep track of how many of each star rating they have. Also keep track of the percentage since that will be used to display the bar graph with the correct ratios.
  getScore() {
    let freelancerScoreTotal: number = 0;
    let freelancerScore: string = '0.00';
    if (this.freelancerReviews.length !== 0) {
      this.freelancerReviews.forEach((freelancer) => {
        freelancerScoreTotal += freelancer.rating;
        // for each rating, increment the stars object's field by one.
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
    // store the score and calculate the percentages.
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
  }

    // on initilization, get the id from the url, if it exists, get the freelancer object and the reviews related to the freelancer.
    ngOnInit(): void {
      this.freelancerId = this.route.snapshot.paramMap.get('id');
      if (this.freelancerId) {
        this.fetchFreelancersAndUsers();
        this.fetchFreelancer(this.freelancerId);
        this.fetchFreelancerReview(this.freelancerId);
      }
    }
}
