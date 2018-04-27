'use strict';

// ------------Nickname Form---------------
let nicknameForm = document.querySelector('.form--nickname');
let nickname;

nicknameForm.onsubmit = function(event) {
  event.preventDefault();
  nickname = document.querySelector('#nickname').value;
  socket.emit('join', nickname);
  this.remove();
};

// ------------Create Room Form--------------
let createRoom = document.querySelector('.button--create-room');

createRoom.onclick = function(event) {
  // Display form when create room button clicked
  let createRoomForm = document.querySelector('.form--create-room');
  createRoomForm.style.display = 'block';

  // Default room name
  if (nickname) {
    let roomName = document.querySelector('#room_name');
    roomName.value = `${nickname}'s room`;
  }

  // Hide form when cancel
  let cancelFormButton = createRoomForm.querySelector('input[type="button"]');
  cancelFormButton.onclick = function(event) {
    createRoomForm.style.display = 'none';
  }
};

// ----------USERLIST------------
let userlist = document.querySelector('.userlist ul');

socket.on('get userlist', function(users) {
  userlist.innerHTML = '';

  for (let user in users) {
    let item = document.createElement('li');
    item.textContent = users[user]; 
    userlist.append(item);
  }
});

socket.on('update userlist', function(name) {
  let item = document.createElement('li');
  item.textContent = name; 
  userlist.append(item);
});

// ----------ROOMLIST-------------
let roomlist = document.querySelector('.rooms ul');

socket.on('get roomlist', function(rooms) {
  roomlist.innerHTML = '';

  for (let room in rooms) {
    roomlist.insertAdjacentHTML('beforeend', `<li><a href='/room/${room}'>${rooms[room].name}</a></li>`);
  }
});

socket.on('update roomlist', function(id, name) {
  roomlist.insertAdjacentHTML('beforeend', `<li><a href='/room/${id}'>${name}</a></li>`);
});