import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FilterComponent } from './filter/filter.component';
import { ButtonModule } from 'primeng/button';
import { ReviewComponent } from './review/review.component';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [FilterComponent, ReviewComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HeaderComponent,
    FooterComponent,
    ToolbarModule, 
    ButtonModule,
    RatingModule,
    FormsModule,
    DropdownModule
  ],
  exports: [HeaderComponent, FooterComponent, FilterComponent, ReviewComponent],
  providers: [DatePipe]
})
export class SharedModule { }
