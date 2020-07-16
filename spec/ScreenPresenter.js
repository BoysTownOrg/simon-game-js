import { ScreenPresenter } from "../lib/ScreenPresenter.js";

class ScreenStub {
  redButtonLit() {
    return this.redButtonLit_;
  }

  lightRedButton() {
    this.redButtonLit_ = true;
  }
}

describe("ScreenPresenter", function () {
  it("should light red button when red tone starts", function () {
    const screen = new ScreenStub();
    const presenter = new ScreenPresenter(screen);
    presenter.notifyThatRedToneStarted();
    expect(screen.redButtonLit()).toBeTrue();
  });
});
