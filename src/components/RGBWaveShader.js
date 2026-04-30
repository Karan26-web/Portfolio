import { useEffect, useRef } from "react";
import * as THREE from "three";

export const RGBWaveShader = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef({
    scene: null, camera: null, renderer: null,
    mesh: null, uniforms: null, animationId: null, visible: true,
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const refs = sceneRef.current;

    const observer = new IntersectionObserver(
      ([e]) => { refs.visible = e.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const vertexShader = `
      attribute vec3 position;
      void main() { gl_Position = vec4(position, 1.0); }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        float d = length(p) * distortion;

        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);

        gl_FragColor = vec4(0.0, g, b, 1.0);
      }
    `;

    refs.scene    = new THREE.Scene();
    refs.renderer = new THREE.WebGLRenderer({
      canvas,
      powerPreference: "low-power",
      antialias: false,
    });
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    refs.renderer.setClearColor(0x000000);
    refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

    refs.uniforms = {
      resolution: { value: [canvas.offsetWidth || 800, canvas.offsetHeight || 400] },
      time:       { value: 0.0 },
      xScale:     { value: 1.0 },
      yScale:     { value: 0.65 },
      distortion: { value: 0.08 },
    };

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-1,-1,0, 1,-1,0, -1,1,0, 1,-1,0, -1,1,0, 1,1,0]),
        3
      )
    );

    refs.mesh = new THREE.Mesh(
      geometry,
      new THREE.RawShaderMaterial({
        vertexShader, fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })
    );
    refs.scene.add(refs.mesh);

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return;
      const w = canvas.offsetWidth  || window.innerWidth;
      const h = canvas.offsetHeight || 400;
      refs.renderer.setSize(w, h, false);
      refs.uniforms.resolution.value = [w, h];
    };
    handleResize();

    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      if (!refs.visible) return;
      refs.uniforms.time.value += 0.008;
      refs.renderer.render(refs.scene, refs.camera);
    };
    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(refs.animationId);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      refs.mesh.geometry.dispose();
      refs.mesh.material.dispose();
      refs.renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};
