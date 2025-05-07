import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBuilderComponent } from './test-builder.component';

describe('TestBuilderComponent', () => {
  let component: TestBuilderComponent;
  let fixture: ComponentFixture<TestBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
