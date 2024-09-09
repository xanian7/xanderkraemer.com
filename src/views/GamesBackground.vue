<template>
    <!-- Canvas for drawing in the background -->
        <canvas ref="canvas" @mousedown="startDrawing" @mouseup="stopDrawing" @mouseleave="stopDrawing" @mousemove="updateMousePosition"></canvas>
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
      const ground = Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 10, window.innerWidth, 20, { isStatic: true });
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
        const box = Matter.Bodies.rectangle(x, y, 50, 50, {
          restitution: 0.5, // Add restitution for bounce
          render: {
            sprite: {
              texture: createRoundedRectangleTexture(50, 50, 10), // Use a custom texture for rounded corners
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
  
      // Function to resize the canvas and update ground dimensions
      const resizeCanvas = () => {
        const ctx = canvas.value.getContext('2d');
        canvas.value.width = window.innerWidth;
        canvas.value.height = window.innerHeight;
        Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight - 10 });
        Matter.Body.setVertices(ground, Matter.Vertices.fromPath(`0 0 ${window.innerWidth} 0 ${window.innerWidth} 20 0 20`));
        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height); // Clear canvas on resize
      };
  
      onMounted(() => {
        // Create renderer for Matter.js
        const render = Matter.Render.create({
          element: canvas.value.parentElement, // Attach renderer to the parent element of canvas
          engine: engine,
          canvas: canvas.value,
          options: {
            width: window.innerWidth,
            height: window.innerHeight,
            wireframes: false, // Use solid colors for bodies
            background: 'transparent' // Make background transparent
          }
        });
  
        Matter.Render.run(render);
        Matter.Runner.run(Matter.Runner.create(), engine); // Start the physics engine
  
        window.addEventListener('resize', resizeCanvas); // Listen for window resize events
        resizeCanvas(); // Set initial canvas size
      });
  
      onUnmounted(() => {
        stopDrawing(); // Stop drawing when the component is unmounted
        window.removeEventListener('resize', resizeCanvas); // Clean up event listener
      });
  
      return { canvas, startDrawing, stopDrawing, updateMousePosition };
    },
  };
  </script>
  
  <style scoped>
  canvas {
    display: flex; /* Enables Flexbox */
  justify-content: center; /* Centers horizontally */
  align-items: center; /* Centers vertically */
  height: 100vh; /* Full height of the viewport */
  width: 100vw; /* Full width of the viewport */
  background-color: #f0f0f0; /* Optional: background color for visibility */
  right: 0;
  
  }

  .canvas {

  }
  </style>
  