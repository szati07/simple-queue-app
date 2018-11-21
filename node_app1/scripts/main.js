{
    const socket = io();

    $('button').on('click', () => {
        socket.emit('Job Request')
    })
}