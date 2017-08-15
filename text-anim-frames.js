
function parseLayerLine(state, line) {
  if (line[0] === '^') {
    var result = [];
    for (var x=1; x<line.length; x++) {
      if (line[x] !== ' ') {
        result.push({x: x, name: line[x]});
      }
    }
    return result;
  }
}

function parseLine(state, line, lineNo) {
  var layers = parseLayerLine(state, line);
  if (layers) {
    var prevLine = state.lines.pop();
    var untagged = prevLine.substring(0, layers[0].x);
    var lineObjects = [untagged];
    for (var i=0; i<layers.length; i++) {
      var curr = layers[i];
      var next = layers[i+1];
      curr.lineNo = lineNo-1;
      curr.text = prevLine.substring(curr.x, next && next.x);
      state.layers[curr.name] = curr;
      lineObjects.push(curr);
    }
    state.lines.push(lineObjects);
  }
  else {
    state.lines.push(line);
  }
}

function parseFrame(text) {
  var state = {
    lines: [],
    layers: {}
  };
  var lines = text.split('\n');
  for (var i=0; i<lines.length; i++) {
    parseLine(state, lines[i], i);
  }
  return state;
}

function parseFrames(text) {
  var frames = text.split('\n=====\n');
  return frames.map(parseFrame);
}

const result = parseFrames(`
foo bar
^   a
    bazboo
^   b  c
=====
foo boo
^   c
`);
console.log(JSON.stringify(result, null, 2));
