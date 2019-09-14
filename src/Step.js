class Step {
  constructor(listingId, flowId, name, step) {
    this.listingId = listingId;
    this.flowId = flowId;
    this.name = name;
    this.step = step;
  }

  asJSON() {
    return {
      listingId: this.listingId,
      flowId: this.flowId,
      name: this.name,
      step: this.step,
    }
  }
}

export default Step;