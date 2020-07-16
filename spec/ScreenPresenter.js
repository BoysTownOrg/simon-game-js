import { ScreenPresenter } from "../lib/ScreenPresenter.js";

class ScreenStub {
  redButtonLit() {
    return this.redButtonLit_;
  }

  lightRedButton() {
    this.redButtonLit_ = true;
  }

  redButtonLightTurnedOff() {
    return this.redButtonLightTurnedOff_;
  }

  turnOffRedButtonLight() {
    this.redButtonLightTurnedOff_ = true;
  }
}

describe("ScreenPresenter", function () {
  it("should light red button when red tone starts", function () {
    const screen = new ScreenStub();
    const presenter = new ScreenPresenter(screen);
    presenter.notifyThatRedToneStarted();
    expect(screen.redButtonLit()).toBeTrue();
  });

  it("should turn off red button light when red tone ends", function () {
    const screen = new ScreenStub();
    const presenter = new ScreenPresenter(screen);
    presenter.notifyThatRedToneEnded();
    expect(screen.redButtonLightTurnedOff()).toBeTrue();
  });
});
