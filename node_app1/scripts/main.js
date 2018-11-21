{
    const socket = io('http://localhost:3000');

    $('button').on('click', () => {
        socket.emit('Job Request')
    })

    socket.on('feedback', (msg) => {
        console.log(msg);
        $('p').text(msg.feedback)
    })
}