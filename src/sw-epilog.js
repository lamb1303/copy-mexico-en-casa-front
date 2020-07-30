self.addEventListener('notificationclick', (event) => {
    let notification = event.notification;
    let action = event.action;
    // if(action !== 'ver')
    event.waitUntil(
        clients.matchAll().then(clnts => {
            let client = clnts.find(c => c.visibilityState === 'visible')
            if (client !== undefined) {
                client.navigate('https://notificatest2.netlify.app/pedidos');
                client.focus();
            } else {
                clients.openWindow('https://notificatest2.netlify.app/pedidos');
            }
            notification.close();
        })
    );
})