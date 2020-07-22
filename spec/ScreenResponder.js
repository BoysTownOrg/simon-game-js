import { ScreenResponder } from "../lib/ScreenResponder.js";

class ScreenStub {
  clickDone() {
    this.listener.notifyThatDoneWasClicked();
  }

  clickYellow() {
    this.listener.notifyThatYellowWasClicked();
  }

  clickRed() {
    this.listener.notifyThatRedWasClicked();
  }

  clickGreen() {
    this.listener.notifyThatGreenWasClicked();
  }

  clickBlue() {
    this.listener.notifyThatBlueWasClicked();
  }

  clickDone() {
    this.listener.notifyThatDoneWasClicked();
  }

  subscribe(e) {
    this.listener = e;
  }
}

class SimonStub {
  constructor() {
    this.redEntered_ = false;
    this.yellowEntered_ = false;
    this.greenEntered_ = false;
    this.blueEntered_ = false;
    this.submitted_ = false;
  }

  submitSeries(s) {
    this.submittedSeries_ = s;
  }

  submittedSeries() {
    return this.submittedSeries_;
  }

  redEntered() {
    return this.redEntered_;
  }

  greenEntered() {
    return this.greenEntered_;
  }

  blueEntered() {
    return this.blueEntered_;
  }

  yellowEntered() {
    return this.yellowEntered_;
  }

  enterRed() {
    this.redEntered_ = true;
  }

  enterGreen() {
    this.greenEntered_ = true;
  }

  enterBlue() {
    this.blueEntered_ = true;
  }

  enterYellow() {
    this.yellowEntered_ = true;
  }

  submitted() {
    return this.submitted_;
  }

  submit() {
    this.submitted_ = true;
  }
}

function expectTrue(b) {
  expect(b).toBeTrue();
}

describe("ScreenResponder", function () {
  beforeEach(function () {
    this.screen = new ScreenStub();
    this.simon = new SimonStub();
    new ScreenResponder(this.screen, this.simon);
  });

  it("should enter red when user clicks red", function () {
    this.screen.clickRed();
    expectTrue(this.simon.redEntered());
  });

  it("should enter yellow when user clicks yellow", function () {
    this.screen.clickYellow();
    expectTrue(this.simon.yellowEntered());
  });

  it("should enter green when user clicks green", function () {
    this.screen.clickGreen();
    expectTrue(this.simon.greenEntered());
  });

  it("should enter blue when user clicks blue", function () {
    this.screen.clickBlue();
    expectTrue(this.simon.blueEntered());
  });

  it("should submit when user clicks done", function () {
    this.screen.clickDone();
    expectTrue(this.simon.submitted());
  });
});
