import { ScreenPresenter } from "../lib/ScreenPresenter.js";

class ScreenStub {
  constructor() {
    this.redButtonLit_ = false;
    this.redButtonLightTurnedOff_ = false;
    this.blueButtonLit_ = false;
    this.blueButtonLightTurnedOff_ = false;
    this.greenButtonLit_ = false;
    this.greenButtonLightTurnedOff_ = false;
    this.yellowButtonLit_ = false;
    this.yellowButtonLightTurnedOff_ = false;
  }

  redButtonLit() {
    return this.redButtonLit_;
  }

  turnOnRedButtonLight() {
    this.redButtonLit_ = true;
  }

  redButtonLightTurnedOff() {
    return this.redButtonLightTurnedOff_;
  }

  turnOffRedButtonLight() {
    this.redButtonLightTurnedOff_ = true;
  }

  greenButtonLit() {
    return this.greenButtonLit_;
  }

  turnOnGreenButtonLight() {
    this.greenButtonLit_ = true;
  }

  greenButtonLightTurnedOff() {
    return this.greenButtonLightTurnedOff_;
  }

  turnOffGreenButtonLight() {
    this.greenButtonLightTurnedOff_ = true;
  }

  blueButtonLit() {
    return this.blueButtonLit_;
  }

  turnOnBlueButtonLight() {
    this.blueButtonLit_ = true;
  }

  blueButtonLightTurnedOff() {
    return this.blueButtonLightTurnedOff_;
  }

  turnOffBlueButtonLight() {
    this.blueButtonLightTurnedOff_ = true;
  }

  yellowButtonLit() {
    return this.yellowButtonLit_;
  }

  turnOnYellowButtonLight() {
    this.yellowButtonLit_ = true;
  }

  yellowButtonLightTurnedOff() {
    return this.yellowButtonLightTurnedOff_;
  }

  turnOffYellowButtonLight() {
    this.yellowButtonLightTurnedOff_ = true;
  }
}

describe("ScreenPresenter", function () {
  beforeEach(function () {
    this.screen = new ScreenStub();
    this.presenter = new ScreenPresenter(this.screen);
  });

  it("should light red button when red tone starts", function () {
    this.presenter.notifyThatRedToneStarted();
    expect(this.screen.redButtonLit()).toBeTrue();
  });

  it("should turn off red button light when red tone ends", function () {
    this.presenter.notifyThatRedToneEnded();
    expect(this.screen.redButtonLightTurnedOff()).toBeTrue();
  });

  it("should light green button when green tone starts", function () {
    this.presenter.notifyThatGreenToneStarted();
    expect(this.screen.greenButtonLit()).toBeTrue();
  });

  it("should turn off green button light when green tone ends", function () {
    this.presenter.notifyThatGreenToneEnded();
    expect(this.screen.greenButtonLightTurnedOff()).toBeTrue();
  });

  it("should light blue button when blue tone starts", function () {
    this.presenter.notifyThatBlueToneStarted();
    expect(this.screen.blueButtonLit()).toBeTrue();
  });

  it("should turn off blue button light when blue tone ends", function () {
    this.presenter.notifyThatBlueToneEnded();
    expect(this.screen.blueButtonLightTurnedOff()).toBeTrue();
  });

  it("should light yellow button when yellow tone starts", function () {
    this.presenter.notifyThatYellowToneStarted();
    expect(this.screen.yellowButtonLit()).toBeTrue();
  });

  it("should turn off yellow button light when yellow tone ends", function () {
    this.presenter.notifyThatYellowToneEnded();
    expect(this.screen.yellowButtonLightTurnedOff()).toBeTrue();
  });

  it("should turn on all button lights when tone series ends", function () {
    this.presenter.notifyThatToneSeriesEnded();
    expect(this.screen.yellowButtonLit()).toBeTrue();
    expect(this.screen.redButtonLit()).toBeTrue();
    expect(this.screen.greenButtonLit()).toBeTrue();
    expect(this.screen.blueButtonLit()).toBeTrue();
  });
});
