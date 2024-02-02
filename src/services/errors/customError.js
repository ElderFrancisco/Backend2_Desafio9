class CustomError {
  static CreateError({ name = 'Error', cause, message, code }) {
    const error = new Error();
    error.name = name;
    error.code = code;

    throw error;
  }
}

module.exports = CustomError;
//control+alt+shift+h
