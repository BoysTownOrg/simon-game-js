export class ScreenResponder {
  constructor(screen, simon) {
    screen.subscribe(this);
    this.simon = simon;
  }

  notifyThatDoneWasClicked() {
    this.simon.submit();
  }

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
