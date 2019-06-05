class socketManager {
  constructor() {
    this.io;
    this.socket;
  }

  load(io) {
    this.io = io;
    this.run();

  }

  run() {
    this.io.on("connection", function(socket) {
      console.log("A client is connected!");
      this.socket = socket;
    });
  }
}
module.exports = new socketManager();
