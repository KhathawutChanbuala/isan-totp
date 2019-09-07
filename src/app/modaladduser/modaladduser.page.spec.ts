import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladduserPage } from './modaladduser.page';

describe('ModaladduserPage', () => {
  let component: ModaladduserPage;
  let fixture: ComponentFixture<ModaladduserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaladduserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaladduserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
