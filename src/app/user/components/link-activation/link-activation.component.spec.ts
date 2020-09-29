import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkActivationComponent } from './link-activation.component';

describe('LinkActivationComponent', () => {
  let component: LinkActivationComponent;
  let fixture: ComponentFixture<LinkActivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkActivationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkActivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
