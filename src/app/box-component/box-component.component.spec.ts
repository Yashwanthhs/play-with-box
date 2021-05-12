import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxComponentComponent } from './box-component.component';

describe('BoxComponentComponent', () => {
  let component: BoxComponentComponent;
  let fixture: ComponentFixture<BoxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoxComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
