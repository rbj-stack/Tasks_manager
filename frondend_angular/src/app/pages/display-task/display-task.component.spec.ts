import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from 'src/app/task.service';

import { DisplayTaskComponent } from './display-task.component';

describe('DisplayTaskComponent', () => {
  let component: DisplayTaskComponent;
  let fixture: ComponentFixture<DisplayTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
