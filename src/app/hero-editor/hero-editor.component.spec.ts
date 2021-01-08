import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ELEMENT } from '../hero';

import { HeroEditorComponent } from './hero-editor.component';

describe('HeroEditorComponent', () => {
  let component: HeroEditorComponent;
  let fixture: ComponentFixture<HeroEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroEditorComponent ]
      , imports: [ FormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroEditorComponent);
    component = fixture.componentInstance;
    component.hero = {id:1, name: "test", element: ELEMENT.AIR};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('input').value).toEqual('test');
    });
  });

});
