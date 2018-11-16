class Compiler {
  constructor(compiler) {
    this.compiler = compiler;

    if(typeof compiler === "string") {
      this.compiler = require(compiler);
    }
	else if(typeof compiler === "object") {
      this.compiler = compiler;
    }
    else {
      throw new Error('compiler must be a string or a module');
    }
  }

  compile(lines) {
    if(this.compiler.compile === undefined) {
      throw new Error('compiler module must have a function called compile');
    }
    else {
      if(typeof lines === "object") {
        return this.compiler.compile(lines);
      }
      else {
        throw new Error('lines must be a array');
      }
    }
  }
}

module.exports = Compiler;
