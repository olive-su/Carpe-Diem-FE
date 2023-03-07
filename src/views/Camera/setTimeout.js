self.addEventListener('message', function(e) {
  if (e.data === 'start') {
    setTimeout(function() {
      self.postMessage('timeout completed');
    }, 5000);
  }
}, false);