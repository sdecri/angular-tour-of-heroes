import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMoreDetailComponent } from './hero-more-detail.component';

describe('HeroMoreDetailComponent', () => {
  let component: HeroMoreDetailComponent;
  let fixture: ComponentFixture<HeroMoreDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroMoreDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroMoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
