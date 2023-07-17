import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingUpGerenteComponent } from './sing-up-gerente.component';

describe('SingUpGerenteComponent', () => {
  let component: SingUpGerenteComponent;
  let fixture: ComponentFixture<SingUpGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingUpGerenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
