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
      <canvas ref="canvas" width="800" height="600" @mousedown="startDrawing" @mouseup="stopDrawing" @mouseleave="stopDrawing" @mousemove="updateMousePosition"></canvas>
      <p>Hold down the mouse button to continuously draw rounded cubes with physics simulation.</p>
    </Panel>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import Matter from 'matter-js';
  import Breadcrumb from 'primevue/breadcrumb';
  import { PrimeIcons } from '@primevue/core/api';
  import Panel from 'primevue/panel';
  
  export default {
    name: 'DrawWithPhysics',
    components: {
      Breadcrumb,
      PrimeIcons,
      Panel
    },
    data() {
      return {
        home: { icon: PrimeIcons.HOME, route: '/' },
        items: [
          { label: 'Games', route: '/games' },
          { label: 'Sandbox', route: '/games/sandbox' },
        ]
      };
    },
    setup() {
      const canvas = ref(null);
      const engine = Matter.Engine.create(); // Create Matter.js engine
      const world = engine.world;
      const mousePosition = ref({ x: 0, y: 0 });
      let drawingInterval = null; // To store the interval ID for continuous drawing
  
      // Set gravity for the world
      engine.gravity.y = 1; // Gravity strength
  
      // Ground to stop cubes from falling out of bounds
      const ground = Matter.Bodies.rectangle(400, 590, 810, 20, { isStatic: true });
      Matter.World.add(world, ground);
  
      // Function to update mouse position
      const updateMousePosition = (event) => {
        const rect = canvas.value.getBoundingClientRect();
        mousePosition.value.x = event.clientX - rect.left;
        mousePosition.value.y = event.clientY - rect.top;
      };
  
      // Function to spawn a rounded rectangle at the current mouse position
      const spawnCube = () => {
        const { x, y } = mousePosition.value;
        const box = Matter.Bodies.rectangle(x, y, 5, 5, {
          restitution: 0.5, // Add restitution for bounce
          render: {
            sprite: {
              texture: createRoundedRectangleTexture(5, 5, 10), // Use a custom texture for rounded corners
            }
          }
        });
        Matter.World.add(world, box);
      };
  
      // Function to create a texture with rounded corners
      const createRoundedRectangleTexture = (width, height, radius) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;
  
        // Draw rounded rectangle
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(radius, 0);
        ctx.lineTo(width - radius, 0);
        ctx.quadraticCurveTo(width, 0, width, radius);
        ctx.lineTo(width, height - radius);
        ctx.quadraticCurveTo(width, height, width - radius, height);
        ctx.lineTo(radius, height);
        ctx.quadraticCurveTo(0, height, 0, height - radius);
        ctx.lineTo(0, radius);
        ctx.quadraticCurveTo(0, 0, radius, 0);
        ctx.fill();
  
        return canvas.toDataURL();
      };
  
      // Function to start drawing when mouse is held down
      const startDrawing = (event) => {
        updateMousePosition(event); // Update mouse position initially
        if (!drawingInterval) { // Prevent multiple intervals
          spawnCube(); // Spawn a cube immediately
          drawingInterval = setInterval(spawnCube, 100); // Spawn cubes every 100ms
        }
      };
  
      // Function to stop drawing when mouse is released or leaves the canvas
      const stopDrawing = () => {
        if (drawingInterval) {
          clearInterval(drawingInterval);
          drawingInterval = null;
        }
      };
  
      onMounted(() => {
        // Create renderer for Matter.js
        const render = Matter.Render.create({
          element: canvas.value.parentElement, // Attach renderer to the parent element of canvas
          engine: engine,
          canvas: canvas.value,
          options: {
            width: 800,
            height: 600,
            wireframes: false, // Use solid colors for bodies
            background: 'white'
          }
        });
  
        Matter.Render.run(render);
        Matter.Runner.run(Matter.Runner.create(), engine); // Start the physics engine
      });
  
      onUnmounted(() => {
        stopDrawing(); // Stop drawing when the component is unmounted
      });
  
      return { canvas, startDrawing, stopDrawing, updateMousePosition };
    },
  };
  </script>
  
  <style scoped>
  canvas {
    display: block;
    background-color: white;
    margin: 0 auto;
    border: 1px solid #000;
    cursor: crosshair; /* Indicate that you can click to draw */
  }
  </style>
  