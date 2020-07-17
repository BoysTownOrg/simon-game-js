import { ScreenPresenter } from "../lib/ScreenPresenter.js";

class ScreenStub {
  constructor() {
    this.redButtonLightTurnedOn_ = false;
    this.redButtonLightTurnedOff_ = false;
    this.blueButtonLightTurnedOn_ = false;
    this.blueButtonLightTurnedOff_ = false;
    this.greenButtonLightTurnedOn_ = false;
    this.greenButtonLightTurnedOff_ = false;
    this.yellowButtonLightTurnedOn_ = false;
    this.yellowButtonLightTurnedOff_ = false;
  }

  redButtonLightTurnedOn() {
    return this.redButtonLightTurnedOn_;
  }

  turnOnRedButtonLight() {
    this.redButtonLightTurnedOn_ = true;
  }

  redButtonLightTurnedOff() {
    return this.redButtonLightTurnedOff_;
  }

  turnOffRedButtonLight() {
    this.redButtonLightTurnedOff_ = true;
  }

  greenButtonLightTurnedOn() {
    return this.greenButtonLightTurnedOn_;
  }

  turnOnGreenButtonLight() {
    this.greenButtonLightTurnedOn_ = true;
  }

  greenButtonLightTurnedOff() {
    return this.greenButtonLightTurnedOff_;
  }

  turnOffGreenButtonLight() {
    this.greenButtonLightTurnedOff_ = true;
  }

  blueButtonLightTurnedOn() {
    return this.blueButtonLightTurnedOn_;
  }

  turnOnBlueButtonLight() {
    this.blueButtonLightTurnedOn_ = true;
  }

  blueButtonLightTurnedOff() {
    return this.blueButtonLightTurnedOff_;
  }

  turnOffBlueButtonLight() {
    this.blueButtonLightTurnedOff_ = true;
  }

  yellowButtonLightTurnedOn() {
    return this.yellowButtonLightTurnedOn_;
  }

  turnOnYellowButtonLight() {
    this.yellowButtonLightTurnedOn_ = true;
  }

  yellowButtonLightTurnedOff() {
    return this.yellowButtonLightTurnedOff_;
  }

  turnOffYellowButtonLight() {
    this.yellowButtonLightTurnedOff_ = true;
  }
}

function expectTrue(b) {
  expect(b).toBeTrue();
}

function expectRedButtonLightTurnedOn(screen) {
  expectTrue(screen.redButtonLightTurnedOn());
}

function expectGreenButtonLightTurnedOn(screen) {
  expectTrue(screen.greenButtonLightTurnedOn());
}

function expectBlueButtonLightTurnedOn(screen) {
  expectTrue(screen.blueButtonLightTurnedOn());
}

function expectYellowButtonLightTurnedOn(screen) {
  expectTrue(screen.yellowButtonLightTurnedOn());
}

describe("ScreenPresenter", function () {
  beforeEach(function () {
    this.screen = new ScreenStub();
    this.presenter = new ScreenPresenter(this.screen);
  });

  it("should light red button when red tone starts", function () {
    this.presenter.notifyThatRedToneStarted();
    expectRedButtonLightTurnedOn(this.screen);
  });

  it("should turn off red button light when red tone ends", function () {
    this.presenter.notifyThatRedToneEnded();
    expectTrue(this.screen.redButtonLightTurnedOff());
  });

  it("should light green button when green tone starts", function () {
    this.presenter.notifyThatGreenToneStarted();
    expectGreenButtonLightTurnedOn(this.screen);
  });

  it("should turn off green button light when green tone ends", function () {
    this.presenter.notifyThatGreenToneEnded();
    expectTrue(this.screen.greenButtonLightTurnedOff());
  });

  it("should light blue button when blue tone starts", function () {
    this.presenter.notifyThatBlueToneStarted();
    expectBlueButtonLightTurnedOn(this.screen);
  });

  it("should turn off blue button light when blue tone ends", function () {
    this.presenter.notifyThatBlueToneEnded();
    expectTrue(this.screen.blueButtonLightTurnedOff());
  });

  it("should light yellow button when yellow tone starts", function () {
    this.presenter.notifyThatYellowToneStarted();
    expectYellowButtonLightTurnedOn(this.screen);
  });

  it("should turn off yellow button light when yellow tone ends", function () {
    this.presenter.notifyThatYellowToneEnded();
    expectTrue(this.screen.yellowButtonLightTurnedOff());
  });

  it("should turn on all button lights when tone series ends", function () {
    this.presenter.notifyThatToneSeriesEnded();
    expectYellowButtonLightTurnedOn(this.screen);
    expectRedButtonLightTurnedOn(this.screen);
    expectGreenButtonLightTurnedOn(this.screen);
    expectBlueButtonLightTurnedOn(this.screen);
  });
});
