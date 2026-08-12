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
        // Si tu servidor tiene contraseña, borra las '//' de abajo:
        // setTimeout(() => bot.chat('/login TuContrasenaAqui'), 4000);
    });

    bot.on('login', () => {
        console.log(`[Bot] Conectado exitosamente al servidor.`);
    });

    // Rutina interactiva: Buscar cofre, abrirlo y saltar (Cada 45 segundos)
    setInterval(async () => {
        if (!bot || !bot.entity) return;

        try {
            // 1. Buscar el cofre más cercano en un radio de 5 bloques
            const chestBlock = bot.findBlock({
                matching: bot.registry.blocksByName.chest.id,
                maxDistance: 5
            });

            if (chestBlock) {
                console.log('[Bot] Cofre encontrado. Caminando a abrirlo...');
                
                // 2. Abrir el cofre
                const chest = await bot.openChest(chestBlock);
                console.log('[Bot] Cofre abierto con éxito.');
                
                // Esperar 2 segundos simulando que revisa el inventario
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // 3. Cerrar el cofre
                chest.close();
                console.log('[Bot] Cofre cerrado.');
            } else {
                console.log('[Bot] No encontré ningún cofre cerca de mi posición.');
            }

            // 4. Realizar la acción de saltar
            await new Promise(resolve => setTimeout(resolve, 1000));
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
            console.log('[Bot] Saltando para mantener activa la sesión.');

        } catch (err) {
            console.log(`[Bot] Error durante la rutina: ${err.message}`);
        }
    }, 45000);

    // Esperar 25 segundos antes de reintentar si es expulsado
    bot.on('end', (reason) => {
        console.log(`[Bot] Desconectado por: ${reason}. Reconectando en 25 segundos...`);
        setTimeout(createBot, 25000);
    });

    bot.on('error', (err) => console.log(`[Bot] Error de conexión: ${err}`));
}

createBot();
