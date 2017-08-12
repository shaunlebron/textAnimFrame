
function parseLayerLine(state, line) {
  if (line[0] !== '^') {
    return null;
  }
  var result = [];
  var x;
  for (x=1; x<line.length; x++) {
    if (line[x] !== ' ') {
      result.push({x: x, name: line[x]});
    }
  }
  return result;
}

function parseLine(state, line, lineNo) {
  var layers = parseLayerLine(state, line);
  if (layers) {
    var prevLine = state.lines.pop();
    state.lines.push(prevLine.substring(0, layers[0].x));
    var i;
    for (i=0; i<layers.length; i++) {
      var curr = layers[i];
      var next = layers[i+1];
      curr.lineNo = lineNo-1;
      curr.text = prevLine.substring(curr.x, next && next.x);
      state.layers[curr.name] = curr;
    }
  }
  else {
    state.lines.push(line);
  }
}

function parseText(text) {
  var state = {
    lines: [],
    layers: {}
  };
  var lines = text.split('\n');
  var i;
  for (i=0; i<lines.length; i++) {
    parseLine(state, lines[i], i);
  }
  return state;
}

const result = parseText(`
foo bar
^   a
    bazboo
^   b  c
`);
console.log(result);
