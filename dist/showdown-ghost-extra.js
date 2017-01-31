;/*! showdown-ghost-extra 31-01-2017/* jshint node:true, browser:true */

// Ghost extra
(function (extension) {
  'use strict';

  var extName = 'showdown-ghost-extra';

  if (typeof showdown === 'object') {
    // global (browser or nodejs global)
    showdown.extension(extName, extension());
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(extName, extension());
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = extension();
  } else {
    // showdown was not found so we throw
    throw Error('Could not find showdown library');
  }

}(function() {

  return [
    // Multiple underscores
    // keep 4 or more inline underscores e.g. Ghost rocks my _____!
    // Fixed failing on:
    //  - reference style urls and imgs
    //  - code blocks
    {
      type: 'listener',
      listeners: {
        'italicsAndBold.before': function (evtName, text) {
          text = text.replace(/([^_\n\r])(_{4,})/g, function (match, prefix, underscores) {
            underscores = underscores.replace(/_/g, function (m) {
              return '¨E' + m.charCodeAt(0) + 'E';
            });
            return prefix + underscores;
          });
          return text;
        }
      }
    }
  ];
}));

//# sourceMappingURL=showdown-ghost-extra.js.map