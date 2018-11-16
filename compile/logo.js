function buildSystem(axoim, rules, iterations) {
  let last = axoim;
  let current = "";
  for(let i = 0; i < iterations; i++) {
    for (let j = 0; j < last.length; j++) {
      let word = last[j];

      if(rules[word] !== undefined) {
        current += rules[word];
      }
      else {
        current += word;
      }
    }

    last = current;
    current = "";
  }

  return last;
}

function transformLine(angle, scala, axoim, rules, iterations) {
  let system = buildSystem(axoim, rules, iterations);
  let output = "CS";

  let useAngle = Math.round(angle);
  let length = Math.pow(scala, iterations);
  length = Math.round(length);

  for(let i = 0; i < system.length; i++) {
    let word = system[i];
    let addition;

    if(word == "[" || word == "]") {
      throw new Error('lsystem stack is currently unsupported!');

      return ;
    }

    if(word == "+") {
      addition = `LT ${useAngle}`;
    }
    else if(word == "-") {
      addition = `RT ${useAngle}`;
    }
    //else {
    if(word.toLowerCase() == "f") {
      addition = `FD ${length}`;
    }


    if(addition !== undefined) {
      output += ` ${addition}`;
    }
  }

  return output;
}


function compileLine(line, iterations) {
  let angle, scala, axoim, rules;

  if(line.angle === undefined) {
    throw new Error('lsystem must have a angle parameter');
  }
  else {
    angle = line.angle;

    if(typeof angle !== "number") {
      throw new Error('angle parameter must be a number');
    }
  }

  if(line.scala !== undefined) {
    scala = line.scala;

    if(typeof scala !== "number") {
      throw new Error('scala parameter must be a number');
    }
  }
  else {
    scala = 1;
  }

  if(line.axoim === undefined) {
    throw new Error('lsystem must have a axoim parameter');
  }
  else {
    axoim = line.axoim;

    if(typeof axoim !== "string") {
      throw new Error('axoim parameter must be a string');
    }
  }

  if(line.rules === undefined) {
    throw new Error('lsystem must have a rules parameter');
  }
  else {
    rules = line.rules;
  }

  if(typeof iterations !== "number") {
    throw new Error('iterations must be a number');
  }


  //no errors, everythings fine
  return transformLine(angle, scala, axoim, rules, iterations);
}
module.exports.compileLine = compileLine;

module.exports.compile = function (lines) {
  let output = [];
  for(let i = 0; i < lines.length; i++) {
    let line = lines[i];

    if(typeof line !== "object") {
      throw new Error('contains of lines must be arrays');

      continue;
    }

    if(line.length != 2) {
      throw new Error('array must have the length of 2');

      continue;
    }

    output.push(compileLine(line[0], line[1]));
  }
  return output;
}
