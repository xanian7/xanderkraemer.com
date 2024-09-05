<template>
    <div class="card flex justify-center">
        <Breadcrumb :home="home" :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
    </div>
    <Panel>
        <canvas ref="canvas" width="800" height="600"></canvas>
        <p>WASD/Arrow Keys to move, Space to shoot</p>
    </Panel>
</template>

<script>
    import { ref, onMounted, onUnmounted } from 'vue';
    import Breadcrumb from 'primevue/breadcrumb';
    import { PrimeIcons } from '@primevue/core/api';
    import Panel from 'primevue/panel';

    export default {
    name: 'MovePlayer',
    components: {
        Breadcrumb,
        PrimeIcons,
        Panel
    },
    data() {
        return {
            home: {icon: PrimeIcons.HOME, route: '/'},
            items: [
                {label: 'Games', route: '/games'},
                {label: 'Sandbox', route: '/games/sandbox'},
            ]
        };
    },
    setup() {
        const canvas = ref(null);
        const player = { x: 400, y: 300, size: 30, speed: 5, dx: 1, dy: 0 };
        const keys = {};
        const projectiles = [];
        const enemies = [];

        const handleKeyDown = (e) => {
        keys[e.key] = true;
        if (e.key === ' ') shootProjectile();
        };

        const handleKeyUp = (e) => {
        keys[e.key] = false;
        };

        const shootProjectile = () => {
        projectiles.push({
            x: player.x + player.size / 2 - 2.5,
            y: player.y + player.size / 2 - 2.5,
            dx: player.dx * 7,
            dy: player.dy * 7,
            size: 5,
        });
        };

        const updatePlayerPosition = () => {
        if (keys['ArrowRight'] || keys['d']) {
            player.x += player.speed;
            player.dx = 1;
            player.dy = 0;
        }
        if (keys['ArrowLeft'] || keys['a']) {
            player.x -= player.speed;
            player.dx = -1;
            player.dy = 0;
        }
        if (keys['ArrowUp'] || keys['w']) {
            player.y -= player.speed;
            player.dx = 0;
            player.dy = -1;
        }
        if (keys['ArrowDown'] || keys['s']) {
            player.y += player.speed;
            player.dx = 0;
            player.dy = 1;
        }

        player.x = Math.max(0, Math.min(800 - player.size, player.x));
        player.y = Math.max(0, Math.min(600 - player.size, player.y));
        };

        const updateProjectiles = () => {
        projectiles.forEach((projectile, pIndex) => {
            projectile.x += projectile.dx;
            projectile.y += projectile.dy;

            if (
            projectile.x < 0 ||
            projectile.x > 800 ||
            projectile.y < 0 ||
            projectile.y > 600
            ) {
            projectiles.splice(pIndex, 1);
            }

            enemies.forEach((enemy, eIndex) => {
            if (
                projectile.x < enemy.x + enemy.size &&
                projectile.x + projectile.size > enemy.x &&
                projectile.y < enemy.y + enemy.size &&
                projectile.y + projectile.size > enemy.y
            ) {
                projectiles.splice(pIndex, 1);
                enemies.splice(eIndex, 1);
            }
            });
        });
        };

        const spawnEnemy = () => {
        const size = 20;
        enemies.push({
            x: Math.random() * (800 - size),
            y: Math.random() * (600 - size),
            size: size,
            speed: 1 + Math.random() * 1.5,
            dx: Math.random() > 0.5 ? 1 : -1,
            dy: Math.random() > 0.5 ? 1 : -1,
        });
        };

        const updateEnemies = () => {
        enemies.forEach((enemy) => {
            enemy.x += enemy.dx * enemy.speed;
            enemy.y += enemy.dy * enemy.speed;

            if (enemy.x <= 0 || enemy.x + enemy.size >= 800) enemy.dx *= -1;
            if (enemy.y <= 0 || enemy.y + enemy.size >= 600) enemy.dy *= -1;
        });
        };

        const draw = () => {
        const ctx = canvas.value.getContext('2d');
        ctx.clearRect(0, 0, 800, 600);

        ctx.fillStyle = 'red';
        ctx.fillRect(player.x, player.y, player.size, player.size);

        ctx.fillStyle = 'black';
        projectiles.forEach((projectile) => {
            ctx.fillRect(projectile.x, projectile.y, projectile.size, projectile.size);
        });

        ctx.fillStyle = 'green';
        enemies.forEach((enemy) => {
            ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
        });
        };

        const gameLoop = () => {
        updatePlayerPosition();
        updateProjectiles();
        updateEnemies();
        draw();
        requestAnimationFrame(gameLoop);
        };

        onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        spawnEnemy();
        setInterval(spawnEnemy, 2000);
        gameLoop();
        });

        onUnmounted(() => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
        });

        return { canvas };
    },
    };
</script>

<style scoped>
canvas {
display: block;
background-color: white;
margin: 0 auto;
border: 1px solid #000;
}
</style>
