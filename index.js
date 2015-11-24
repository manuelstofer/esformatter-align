var rocambole = require('rocambole');
var flatten   = require('array-flatten');

var alignedNodes = [];

exports.setOptions = function(opts) {
  alignedNodes = [];
};

exports.transform = function(ast) {
  rocambole.walk(ast, function(node) {

    if (node.type == 'ObjectExpression') {
      alignObjectExpression(node);
    }

    if (node.type == 'VariableDeclaration') {
      alignVariableDeclaration(node);
    }
  });
};

function alignObjectExpression(node) {
  var tokens = node.properties.map(function(property) {
    return property.value.startToken;
  });
  align(tokens);
}

function alignVariableDeclaration(node) {
  if (alignedNodes.indexOf(node) !== -1) return;

  var nodes = [];
  while (node && node.type == 'VariableDeclaration') {
    nodes.push(node);
    node = node.next;
  }

  alignedNodes = alignedNodes.concat(nodes);

  var tokens = flatten(nodes.map(function(node) {
    return node.declarations
      .map(function(declaraction) {
        return findNextInLine(declaraction.startToken, isEqualPunctuator);
      })
      .filter(truthy);
  }));

  align(tokens);

}

function align(tokens) {
  groupConsecutive(tokens).forEach(alignTokens);
}

function groupConsecutive(tokens) {
  var groups = [];
  var group  = [];
  var last   = undefined;
  tokens.forEach(function(token) {
    var line = getTokenLine(token);
    if (!last || line == last + 1) {
      group.push(token);
    } else {
      groups.push(group);
      group = [token];
    }
    last = line;
  });
  if (group.length) groups.push(group);
  return groups;
}

function alignTokens(tokens) {
  var alignToCol = Math.max.apply(Math, tokens.map(getMinTokenColumn));
  tokens.forEach(function(token) {
    var whitespace = token.prev;
    if (!isWhiteSpace(whitespace)) {
      throw new Error('no whitespace before token to align');
    }
    var alignDiff = alignToCol - getMinTokenColumn(token);
    whitespace.value = repeat(' ', alignDiff + 1);
  });
}

function getMinTokenColumn(token) {
  var lineFirst = findPrevious(token.prev, isFirstOfLine);
  var pos       = 0;
  for (var t = lineFirst; t !== token; t = t.next) {
    if (isWhiteSpace(t) && t == token.prev) {
      pos += 1;
    } else {
      pos += t.value.length;
    }

  }
  return pos;
}

function getTokenLine(token) {
  var line = 0;

  while (!isFirst(token)) {
    token = token.prev;
    if (isLineBreak(token)) {
      line++;
    }
  }
  return line;
}

function findPrevious(token, callback) {
  while (token) {
    if (callback(token)) return token;
    token = token.prev;
  }
}

function findNextInLine(token, callback) {
  while (token && !isLineBreak(token)) {
    if (callback(token)) return token;
    token = token.next;
  }
}

function isFirstOfLine(token) {
  return isFirst(token) || isLineBreak(token.prev);
}

function isLineBreak(token) {
  return token.type == 'LineBreak';
}

function isWhiteSpace(token) {
  return token.type == 'WhiteSpace';
}

function isFirst(token) {
  return !token.prev;
}

function isEqualPunctuator(token) {
  return token.type == 'Punctuator' && token.value == '=';
}

function truthy(v) {
  return !!v;
}

function repeat(str, n) {
  return new Array(n + 1).join(str);
}
