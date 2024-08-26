import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackHomeButtonComponent } from './back-home-button.component';

describe('BackHomeButtonComponent', () => {
  let component: BackHomeButtonComponent;
  let fixture: ComponentFixture<BackHomeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackHomeButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackHomeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
