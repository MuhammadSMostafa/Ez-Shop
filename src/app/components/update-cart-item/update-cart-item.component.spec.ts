import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCartItemComponent } from './update-cart-item.component';

describe('UpdateCartItemComponent', () => {
  let component: UpdateCartItemComponent;
  let fixture: ComponentFixture<UpdateCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCartItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
