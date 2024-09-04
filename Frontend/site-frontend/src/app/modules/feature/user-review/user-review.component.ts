import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { Freelancer, Review, Reviews, User } from '../../../../types';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../core/services/reviews.service';
import { FreelancersService } from '../../core/services/freelancers.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.scss',
})
export class UserReviewComponent {
  constructor(
    private userService: UsersService,
    private reviewService: ReviewsService,
    private route: ActivatedRoute,
    private freelancerService: FreelancersService
  ) {}

  // store all the freelancers to pass to the review component
  freelancers: Freelancer[] = [];

  // store all the users to pass to the review component
  users: User[] = [];

  // store the user id, it is a string because the id in the url is a string. The review.component.html will provide the id.
  userId: string | null = '';

  // store the user object
  user: User = {
    id: 0,
    user_name: '',
  };

  // store all the related user's reviews.
  userReviews: Review[] = [];

  // Get freelancers to input into the review component.
  fetchFreelancers() {
    this.freelancerService
      .getFreelancers('http://127.0.0.1:8000/api/freelancers/')
      .subscribe((response: Freelancer[]) => {
        this.freelancers = response;
      });
  }

  // Get users to input into the review component.
  fetchUsers() {
    this.userService
      .getUsers('http://127.0.0.1:8000/api/users/')
      .subscribe((response: User[]) => {
        this.users = response;
      });
  }

  // method to get the user object using the user's id.
  fetchUser(id: string) {
    this.userService
      .getOneUser(`http://127.0.0.1:8000/api/users/${id}`)
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  // method to get all the reviews for a user using their id. Filtering is done on backend.
  fetchUserReviews(id: string) {
    this.reviewService
      .getReviewsNoParam(`http://127.0.0.1:8000/api/reviews/users/${id}`)
      .subscribe((reviews: Review[]) => {
        this.userReviews = reviews;
      });
  }

  showAlert(){
    alert('User and freelancer names may not show on review boxes since the site is hosted with Git-Hub-Pages.\nRefresh the page if you have this problem.')
  }

  // on page initilization, get the user id from the url, if it exists, get the user object and all the reviews related to that user.
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.showAlert();
    if (this.userId) {
      this.fetchFreelancers();
      this.fetchUsers();
      this.fetchUser(this.userId);
      this.fetchUserReviews(this.userId);
    }
  }
}
