
const socket = io();
      const counter = document.getElementById('counter');

      socket.on('count-update', count => {
        counter.innerHTML = count;
    });