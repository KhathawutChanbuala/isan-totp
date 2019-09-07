import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenOtpPage } from './gen-otp.page';

describe('GenOtpPage', () => {
  let component: GenOtpPage;
  let fixture: ComponentFixture<GenOtpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenOtpPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenOtpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
