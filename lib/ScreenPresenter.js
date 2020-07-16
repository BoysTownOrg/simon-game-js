export class ScreenPresenter {
  constructor(screen) {
    this.screen = screen;
  }

  notifyThatRedToneStarted() {
    this.screen.lightRedButton();
  }

  notifyThatRedToneEnded() {
    this.screen.turnOffRedButtonLight();
  }
}
