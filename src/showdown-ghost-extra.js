/* jshint node:true, browser:true */

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

  var ESCAPE_CHAR = '¨';

  return [
    // Multiple underscores
    // keep 4 or more inline underscores e.g. Ghost rocks my _____!
    // currently fails on:
    //  - reference style urls and imgs
    //  - code blocks
    {
      type: 'lang',
      regex: /([^_\n\r])(_{4,})/g,
      replace: function (match, prefix, underscores) {
        return prefix + underscores.replace(/_/g, '\\_');
      }
    }
  ];
}));
