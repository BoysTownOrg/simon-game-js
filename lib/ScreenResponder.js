export class ScreenResponder {
  constructor(screen, simon) {
    screen.subscribe(this);
    this.simon = simon;
  }

  notifyThatDoneWasClicked() {}

  notifyThatYellowWasClicked() {
    this.simon.enterYellow();
  }

  notifyThatRedWasClicked() {
    this.simon.enterRed();
  }

  notifyThatGreenWasClicked() {
    this.simon.enterGreen();
  }

  notifyThatBlueWasClicked() {
    this.simon.enterBlue();
  }
}
