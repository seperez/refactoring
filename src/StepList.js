import Step from './Step';

class StepList {
  constructor() {
    this.steps = [];
  }

  createAndAddSteps(listingId, newSteps) {
    for (let i = 0, len = newSteps.length; i < len; i++) {
      if (newSteps[i].id < 0) {
        const step = new Step(listingId, newSteps[i].flowId, newSteps[i].name, newSteps[i].step);
      }
    }
    
    this.steps.push(step);
  }

  asJSON() {
    return this.steps.map(step => step.asJSON());
  }

  hasSteps() {
    return this.steps.lenght > 0 ? true : false;
  }
}

export default StepList;