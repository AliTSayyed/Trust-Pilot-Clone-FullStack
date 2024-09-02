import { Component, Input } from '@angular/core';
import { Freelancer, Review, User } from '../../../../types';
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
  @Input() freelancers!:Freelancer[];
  @Input() users!:User[]

  constructor(private datePipe: DatePipe) {}

  // store the freelancer object
  freelancer: Freelancer = {
    id: 0,
    freelancer_name: '',
  };
  freelancerName: string = '';

  // store the user obeject
  user: User = {
    id: 0,
    user_name: '',
  };
  userName: string = '';

  // store the date of the review as a formatted string, since backend date is in a different format.
  formattedDate: string | null = '';

  // input the date from the reviews and convert it to MMMM dd, yyyy
  convertDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'MMMM dd, yyyy');
  }

  // find the correct freelancer from the inputed freelancer list 
  mapFreelancer() {
    this.freelancer =
      this.freelancers.find((f) => f.id === this.review.freelancer) ||
      this.freelancer;
    this.freelancerName = this.freelancer.freelancer_name;
  }

  // find the correct freelancer from the inputed user list. 
  mapUser() {
    this.user = this.users.find((f) => f.id === this.review.user) || this.user;
    this.userName = this.user.user_name;
  }

  // on initilization get the freelancer's name, id, users name, id, and date. This is stored in the reviews object and will be displayed in the html.
  ngOnInit() {
    this.mapFreelancer();
    this.mapUser();
    const rawDate: string = this.review.date;
    this.formattedDate = this.convertDate(rawDate);
  }
}
