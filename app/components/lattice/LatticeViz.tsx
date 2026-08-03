import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  size: number;
  color: string;
  glow: boolean;
}

export function LatticeViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Create geometric lattice pattern
    const nodes: Node[] = [];
    const gridSize = 4;
    const spacing = Math.min(width, height) / (gridSize + 1);

    // Generate nodes in geometric pattern
    for (let i = 1; i <= gridSize; i++) {
      for (let j = 1; j <= gridSize; j++) {
        const angle = (i + j) * (Math.PI / 4);
        const radius = spacing * 0.3;

        nodes.push({
          x: i * spacing + Math.cos(angle) * radius,
          y: j * spacing + Math.sin(angle) * radius,
          size: Math.sin((i + j) * Math.PI / gridSize) * 4 + 3,
          color: `hsl(${(i * 60 + j * 30) % 360}, 70%, 50%)`,
          glow: (i + j) % 2 === 0,
        });
      }
    }

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      ctx.strokeStyle = 'rgba(100, 150, 220, 0.2)';
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const distance = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          if (distance < spacing * 1.2) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node, index) => {
        const pulse = Math.sin(time + index * 0.5) * 0.3 + 1;

        if (node.glow) {
          // Draw glow
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3);
          gradient.addColorStop(0, node.color + '60');
          gradient.addColorStop(1, node.color + '00');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.size * 3 * pulse, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Draw outline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * pulse, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-48 md:h-64 bg-gradient-to-b from-slate-900 to-slate-950 rounded-lg"
    />
  );
}