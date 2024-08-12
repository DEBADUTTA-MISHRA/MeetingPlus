import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private currentStep = new BehaviorSubject<number>(1);
  currentStep$ = this.currentStep.asObservable();

  constructor() {}

  nextStep() {
    let current = this.currentStep.value;
    if (current < 4) {
      this.currentStep.next(current + 1);
    }
  }

  previousStep() {
    let current = this.currentStep.value;
    if (current > 1) {
      this.currentStep.next(current - 1);
    }
  }
}
