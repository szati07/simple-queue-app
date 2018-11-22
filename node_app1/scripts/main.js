{
    const socket = io('http://localhost:80');

    $('button').on('click', () => {
        socket.emit('Job Request')
        $('p').text('Your request is processing')
    })

    socket.on('feedback', (msg) => {
        console.log(msg);
        $('p').text(msg.feedback)
    })

    socket.on('disable', (val) => {
        $('button').prop('disabled', val);
    })

    socket.on('enable', ()=> {
        $('button').removeAttr('disabled');
    })
}