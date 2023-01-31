const socket = io();




const chatBox = document.getElementById('chatBox');
const messageFromServer = document.getElementById('messageFromServer');
const messages = document.getElementById('mesagges');

const swal = async () => {
    await Swal.fire({
        title: "Identificate",
        input: "text",
        text: "Ingresa el usuario para identificarte en el chat",
        inputValidator: value => {
            return !value && 'necesitas escribir un usuario'
        },
        allowOutsideClick: false,
    })
    const user = result.value;
    socket.emit('newUser', user)
}

swal();

socket.on('messageFromServer', data => {
    messages.innerHTML += `${data.user}: ${data.message}<br>`;
});

chatBox.addEventListener('keyup', e => {
    if (e.key == 'Enter') {
        const userMessage = {
            user,
            message: chatBox.value
        }
        socket.emit('chatFromClient', userMessage);
        chatBox.value = ' ';
    }
});

socket.on('messageForChat', data => {
    messages.innerHTML += `${data.user}: ${data.message}<br>`;
});

socket.on('newUserConected', user => {
    Swal.fire({
        text: 'nuevo usuario conectado',
        toast: 'true',
        position: 'top-right'
    })
});