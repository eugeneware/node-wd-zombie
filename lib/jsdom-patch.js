// Generated by CoffeeScript 1.3.3
(function() {
  var HTML, PRINTABLE_VIRTUAL_KEYS, PRINTABLE_VIRTUAL_KEY_ARRAY, SUBMIT_CHAR_CODE_ARRAY, SUBMIT_VIRTUAL_KEYS, SUBMIT_VIRTUAL_KEY_ARRAY, k, triggerKeypress, v,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  HTML = require("jsdom").dom.level3.html;

  PRINTABLE_VIRTUAL_KEYS = {
    'Back space': 8,
    'Tab': 9,
    'Clear': 12,
    'Return': 13,
    'Space': 32
  };

  PRINTABLE_VIRTUAL_KEY_ARRAY = (function() {
    var _results;
    _results = [];
    for (k in PRINTABLE_VIRTUAL_KEYS) {
      v = PRINTABLE_VIRTUAL_KEYS[k];
      _results.push(v);
    }
    return _results;
  })();

  SUBMIT_VIRTUAL_KEYS = {
    'Return': 13,
    'Enter': 14
  };

  SUBMIT_VIRTUAL_KEY_ARRAY = (function() {
    var _results;
    _results = [];
    for (k in SUBMIT_VIRTUAL_KEYS) {
      v = SUBMIT_VIRTUAL_KEYS[k];
      _results.push(v);
    }
    return _results;
  })();

  SUBMIT_CHAR_CODE_ARRAY = [10, 13];

  triggerKeypress = function(e) {
    var document, evObj;
    document = e.target.ownerDocument;
    evObj = document.createEvent("UIEvents");
    evObj.initEvent('keypress', true, true);
    evObj.view = e.view;
    evObj.altKey = e.altKey;
    evObj.ctrlKey = e.ctrlKey;
    evObj.shiftKey = e.shiftKey;
    evObj.metaKey = e.metaKey;
    evObj.keyCode = e.keyCode;
    evObj.charCode = e.charCode;
    return e.target.dispatchEvent(evObj);
  };

  HTML.HTMLInputElement.prototype._eventDefaults.keydown = function(e) {
    return triggerKeypress(e);
  };

  HTML.HTMLTextAreaElement.prototype._eventDefaults.keydown = function(e) {
    return triggerKeypress(e);
  };

  HTML.HTMLInputElement.prototype._eventDefaults.keypress = function(e) {
    var _ref, _ref1, _ref2, _ref3;
    if ((_ref = e.charCode, __indexOf.call(SUBMIT_CHAR_CODE_ARRAY, _ref) >= 0) || (_ref1 = e.keyCode, __indexOf.call(SUBMIT_VIRTUAL_KEY_ARRAY, _ref1) >= 0)) {
      return (_ref2 = e.target.form) != null ? _ref2.submit() : void 0;
    } else if (_ref3 = e.keyCode, __indexOf.call(PRINTABLE_VIRTUAL_KEY_ARRAY, _ref3) >= 0) {
      return e.target.value = e.target.value + String.fromCharCode(e.keyCode).replace(/\r/g, '\n');
    } else if (e.charCode != null) {
      return e.target.value = e.target.value + String.fromCharCode(e.charCode).replace(/\r/g, '\n');
    }
  };

  HTML.HTMLTextAreaElement.prototype._eventDefaults.keypress = function(e) {
    var _ref;
    if (e.keyCode === 14) {
      return e.target.value = e.target.value + '\n';
    } else if (_ref = e.keyCode, __indexOf.call(PRINTABLE_VIRTUAL_KEY_ARRAY, _ref) >= 0) {
      return e.target.value = e.target.value + String.fromCharCode(e.keyCode).replace(/\r/g, '\n');
    } else if (e.charCode != null) {
      return e.target.value = e.target.value + String.fromCharCode(e.charCode).replace(/\r/g, '\n');
    }
  };

}).call(this);
