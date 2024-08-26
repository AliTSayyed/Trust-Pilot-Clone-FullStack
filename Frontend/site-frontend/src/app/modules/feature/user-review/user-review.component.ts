import { Component } from '@angular/core';
import { UsersService } from '../../core/services/users.service';
import { Review, Reviews, User } from '../../../../types';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../core/services/reviews.service';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.scss'
})
export class UserReviewComponent {

  constructor(private userService: UsersService, private reviewService:ReviewsService, private route: ActivatedRoute){}

  user: User = {
    id: 0,
    user_name: ""
  }

  userId:string | null= '';
  userReviews: Review[] = [];

  ngOnInit(): void{
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId){
      this.fetchUser(this.userId);
      this.fetchUserReviews(this.userId);
    }
  }

  fetchUser(id:string){
    this.userService.getOneUser(`http://127.0.0.1:8000/api/users/${id}`).subscribe((user:User) => {
      this.user = user
    });
  }
  
  fetchUserReviews(id:string){
    this.reviewService.getReviewsNoParam(`http://127.0.0.1:8000/api/reviews/users/${id}`).subscribe((reviews: Review[]) => {
      this.userReviews = reviews;
    });
  }

}
