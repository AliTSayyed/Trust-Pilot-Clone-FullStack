import { Component, Input } from '@angular/core';
import { Freelancer, Review, User } from '../../../../types';
import { FreelancersService } from '../../core/services/freelancers.service';
import { UsersService } from '../../core/services/users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {
  // the review component will always recieve a review variable from the component that is calling it.
  // Ex: In the home components html <app-review *ngFor="let review of reviews" [review]="review"></app-review> [review]="review" is calling on this review variable but the "let review of reviews" are the reviews stored in the home component.
  @Input() review!: Review;

  constructor(
    private freelancerService: FreelancersService,
    private userService: UsersService,
    private datePipe: DatePipe
  ) {}

  // store the freelancers
  freelancers: Freelancer[] = [];

  // store the freelancer object
  freelancer: Freelancer = {
    id: 0,
    freelancer_name: '',
  };
  freelancerName: string = '';

  // store all the users
  users: User[] = [];

  // store the user obeject
  user: User = {
    id: 0,
    user_name: '',
  };
  userName: string = '';

  // store the date of the review as a formatted string, since backend date is in a different format.
  formattedDate: string | null = '';

  // The reviews object does not have a name, need to get it. The id will be used in routing.
  fetchFreelancer() {
    this.freelancerService
      .getFreelancers('http://127.0.0.1:8000/api/freelancers/')
      .subscribe((response: Freelancer[]) => {
        this.freelancers = response;
        this.freelancer =
          this.freelancers.find((f) => f.id === this.review.freelancer) ||
          this.freelancer;
        this.freelancerName = this.freelancer.freelancer_name;
      });
  }

  // The reviews object does not have a name, need to get it. The id will be used in routing.
  fetchUser() {
    this.userService
      .getUsers('http://127.0.0.1:8000/api/users/')
      .subscribe((response: User[]) => {
        this.users = response;
        this.user =
          this.users.find((f) => f.id === this.review.user) || this.user;
        this.userName = this.user.user_name;
      });
  }

  // input the date from the reviews and convert it to MMMM dd, yyyy
  convertDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'MMMM dd, yyyy');
  }

  // on initilization get the freelancer's name, id, users name, id, and date. This is stored in the reviews object and will be displayed in the html.
  ngOnInit() {
    this.fetchFreelancer();
    this.fetchUser();
    const rawDate: string = this.review.date;
    this.formattedDate = this.convertDate(rawDate);
  }
}
