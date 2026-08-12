const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'tscraft67.aternos.me', // <--- CAMBIA ESTO POR LA IP DE TU SERVER
        port: 27041,                
        username: 'Erick_JKN',     
        version: false              
    });

    bot.on('spawn', () => {
        console.log(`[Bot] El bot ha aparecido en el mundo.`);
        // Si tu servidor tiene contraseña, borra las '//' de la línea de abajo:
        // setTimeout(() => bot.chat('/login TuContrasenaAqui'), 4000);
    });

    bot.on('login', () => {
        console.log(`[Bot] Conectado exitosamente al servidor.`);
    });

    // Anti-AFK suave: Mira a los lados de forma aleatoria para no activar alertas
    setInterval(() => {
        if (bot && bot.entity) {
            const yaw = Math.random() * Math.PI * 2;
            const pitch = (Math.random() - 0.5) * Math.PI;
            bot.look(yaw, pitch, false);
            console.log('[Bot] Mirando a otra dirección para seguir activo.');
        }
    }, 40000);

    // Esperar 25 segundos antes de reintentar si es expulsado
    bot.on('end', (reason) => {
        console.log(`[Bot] Desconectado por: ${reason}. Reconectando en 25 segundos...`);
        setTimeout(createBot, 25000);
    });

    bot.on('error', (err) => console.log(`[Bot] Error de conexión: ${err}`));
}

createBot();
