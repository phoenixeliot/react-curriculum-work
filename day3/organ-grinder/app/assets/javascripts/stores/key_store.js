(function(root) {
  var _data = [];
  var KeyStore = root.KeyStore = $.extend({}, EventEmitter.prototype, {
    all: function () {
      return _data.slice();
    },
    playNote: function(noteName) {
      if (_data.indexOf(noteName) < 0){
        _data.push(noteName);
        this.emit("change");
      }
    },
    stopNote: function(noteName) {
      var index = _data.indexOf(noteName)
      if (index > -1){
        _data.splice(index,1);
        this.emit("change");
      }
    },
    contains: function(noteName) {
      return _data.indexOf(noteName) > -1
    },
  });

  KeyStore.dispatcherID = AppDispatcher.register(function (noteAction) {
    switch(noteAction.actionType) {
      case "PLAY_NOTE":
        KeyStore.playNote(noteAction.noteName);
        break;
      case "STOP_NOTE":
        KeyStore.stopNote(noteAction.noteName);
        break;
    }
  })

  KeyStore.setMaxListeners(40);
})(this);
