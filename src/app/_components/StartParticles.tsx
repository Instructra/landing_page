import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadStarShape } from "@tsparticles/shape-star";
import { OutMode, type Engine } from "@tsparticles/engine";

export default function StarParticles() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    (
      initParticlesEngine as (
        cb: (engine: Engine) => Promise<void>,
      ) => Promise<void>
    )(async (engine: Engine) => {
      await loadSlim(engine);
      await loadStarShape(engine);
    })
      .then(() => setInitialized(true))
      .catch((err) => {
        console.error("Failed to initialize particles engine:", err);
      });
  }, []);

  const options = useMemo(() => {
    return {
      background: { color: { value: "transparent" } },
      particles: {
        number: { value: 500, density: { enable: true, area: 1000 } },
        color: { value: "#fff" },
        shape: { type: "star", options: { star: { sides: 5, inset: 2 } } },
        opacity: { value: 0.8 },
        size: { value: { min: 0.3, max: 0.5 } },
        move: { enable: true, speed: 0.1, outModes: { default: OutMode.out } },
      },
      detectRetina: true,
    };
  }, []);

  return initialized ? <Particles id="star-bg" options={options} /> : null;
}
