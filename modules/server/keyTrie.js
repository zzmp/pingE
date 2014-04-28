  var keyTrie = {};

  var sanitize = function (word) {
    return word.toLowerCase().match(/[A-Z]|\ /gi);
  };

  keyTrie.match = function (word) {
    word = sanitize(word);
    var node = this;
    var matches = [];
    var keys;

    for (var letter = 0; letter < word.length; letter++) {
      if (!node[word[letter]]) return;
      node = node[word[letter]];
    }

    keys = Object.keys(node)
      .sort(function (a, b) {
        return !node[a].freq ? 1 : +node[b].freq - +node[a].freq;
      })
      .slice(0,5);

    +node.freq && matches.unshift(null);
    for (var i = 0; i < keys.length; i++) {
      if (node[keys[i]].freq) {
        matches.push(keys[i]);
      } else{
        break;
      }
    }

    return matches;
  };

  keyTrie.add = function (word) {
    var node = this;
    var letter;
    var room;
    word = sanitize(word);
    room = word.join('');

    if (!word) return;

    while (word.length) {
      var key = word.join('');
      node[key] = node[key] || {};
      node[key].freq = (node[key].freq || 0) + 1;
      letter = word.shift();
      node[letter] = node[letter] || {};
      node = node[letter];
    }

    return room;
  };

  keyTrie.remove = function (word) {
    var node = this;
    var letter;
    var room;
    word = sanitize(word);

    if (!word) return;
    word.push(null);

    while (node) {
      var key = word.join('');
      console.log(key);
      key ? --(node[key].freq) : --node.freq;
      letter = word.shift();
      node = node[letter];
    }
  };

module.exports = keyTrie;
