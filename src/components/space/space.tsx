import { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import "./space.sass";

const Space: React.FC = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    // console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      particles: {
        groups: {
          z5000: {
            number: {
              value: 70,
            },
            zIndex: {
              value: 500,
            },
          },
          z7500: {
            number: {
              value: 30,
            },
            zIndex: {
              value: 75,
            },
          },
          z2500: {
            number: {
              value: 50,
            },
            zIndex: {
              value: 25,
            },
          },
          z1000: {
            number: {
              value: 40,
            },
            zIndex: {
              value: 10,
            },
          },
        },
        number: {
          value: 300,
          density: {
            enable: false,
            value_area: 1000,
          },
        },
        color: {
          value: "#fff",
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 1,
          random: false,
        },
        size: {
          value: 1,
        },
        links: {
          enable: false,
          distance: 100,
          color: "#ffffff",
          opacity: 0.4,
          width: 1,
        },
        zIndex: {
          value: 5,
          opacityRate: 0.5,
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
    />
  );
};

export default Space;
