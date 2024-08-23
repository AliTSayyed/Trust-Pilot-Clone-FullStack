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
  @Input() review!: Review;
  constructor(
    private freelancerService: FreelancersService,
    private userService: UsersService,
    private datePipe:DatePipe,
  ) {}

  freelancers: Freelancer[] = [];
  freelancer: Freelancer = {
    id: 0,
    freelancer_name: '',
  };
  freelancerName: string = '';

  users: User[] = [];
  user: User = {
    id: 0,
    user_name: '',
  };
  userName: string = '';

  formattedDate:string | null= '';

  fetchFreelancer() {
    this.freelancerService
      .getFreelancers('http://127.0.0.1:8000/api/freelancers/')
      .subscribe((response: Freelancer[]) => {
        console.log(response);
        this.freelancers = response;
        this.freelancer =
          this.freelancers.find((f) => f.id === this.review.freelancer) ||
          this.freelancer;
        this.freelancerName = this.freelancer.freelancer_name;
        console.log(this.freelancerName);
      });
  }

  fetchUser() {
    this.userService
      .getUsers('http://127.0.0.1:8000/api/users/')
      .subscribe((response: User[]) => {
        console.log(response);
        this.users = response;
        this.user =
          this.users.find((f) => f.id === this.review.user) || this.user;
        this.userName = this.user.user_name;
        console.log(this.userName);
      });
  }

    convertDate(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'MMMM dd, yyyy');
  }


  ngOnInit() {
    this.fetchFreelancer();
    this.fetchUser();
    const rawDate:string = this.review.date;
    this.formattedDate = this.convertDate(rawDate);
  }
}
