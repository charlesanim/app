import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesResultComponent } from './games-result.component';

describe('GamesResultComponent', () => {
  let component: GamesResultComponent;
  let fixture: ComponentFixture<GamesResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamesResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
