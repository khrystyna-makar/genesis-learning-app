export class CustomError extends Error {
    constructor(message, status, statusText) {
     super(message);
     this.status = status;
     this.statusText = statusText
    }
  }