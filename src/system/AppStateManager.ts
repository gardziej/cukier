export default class AppStateManager {

  gameStates = {};
  currentGameState = null;
  lastGameStateId = 0;
  currentGameStateId = 0;
  lastMasterStateId = 0;

  add(id, gamestate, master) {
    this.gameStates[id] = {
      state: gamestate
    };
    if (typeof master !== "undefined" && master === true) {
      this.gameStates[id].type = 'master';
    }
    this.currentGameState = gamestate;
    this.currentGameStateId = id;
  }

  switchTo(id) {
    if (typeof this.gameStates[id] !== "undefined") {
      this.currentGameState = this.gameStates[id].state;
      if (this.currentGameStateId !== id) {
        this.lastGameStateId = this.currentGameStateId;
      }
      this.currentGameStateId = id;
      if (this.gameStates[id].type === "master") {
        this.lastMasterStateId = id;
      }
      return this;
    }
  }

  escape() {
    if (this.lastMasterStateId !== null) {
      this.switchTo(this.lastMasterStateId);
		}
  }

  getCurrentGameStateId() {
    if (this.currentGameStateId !== null) {
      return this.currentGameStateId;
		}
    return false;
  }

  getLastMasterStateId() {
    if (this.lastMasterStateId !== null) {
      return this.lastMasterStateId;
		}
    return false;
  }

  handleInput(delta) {
    if (this.currentGameState !== null) {
      this.currentGameState.handleInput(delta);
		}
  }

  update(delta) {
    if (this.currentGameState !== null) {
      this.currentGameState.update(delta);
		}
  }

  draw() {
    if (this.currentGameState !== null) {
      this.currentGameState.draw();
		}
  }

  reset() {
    if (this.currentGameState !== null) {
      this.currentGameState.reset();
		}
  }
}
