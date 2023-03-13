export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._aboutElement.textContent,
    };
  }

  setUserInfo(nameElement, aboutElement) {
    this._nameElement.textContent = nameElement;
    this._aboutElement.textContent = aboutElement;
  }
}
