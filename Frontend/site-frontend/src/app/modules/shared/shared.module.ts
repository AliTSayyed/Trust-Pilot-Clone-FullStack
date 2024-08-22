import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToolbarModule } from 'primeng/toolbar';
import { FilterComponent } from './filter/filter.component';
import { ButtonModule } from 'primeng/button';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [FilterComponent, ReviewComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HeaderComponent,
    FooterComponent,
    ToolbarModule, 
    ButtonModule
  ],
  exports: [HeaderComponent, FooterComponent, FilterComponent, ReviewComponent]
})
export class SharedModule { }
