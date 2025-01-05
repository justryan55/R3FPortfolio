import { useState, useEffect } from "react";
import {
  Text,
  Html,
  ContactShadows,
  PresentationControls,
  Float,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Experience({ isFlat, setIsFlat }) {
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();

  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );

  const handleOnPointerOver = () => {
    setHovered(true);
  };

  const handleOnPointerOut = () => {
    setHovered(false);
  };

  const handleClick = () => {
    setIsFlat(!isFlat);
  };

  useEffect(() => {
    if (isFlat) {
      camera.position.set(0, 0, 5);
      camera.updateProjectionMatrix();
    }
  }, [isFlat, camera]);

  useFrame(() => {
    if (!isFlat) {
      const targetPosition = hovered
        ? new THREE.Vector3(0, 1, 2)
        : new THREE.Vector3(-3, 0.5, 4);

      camera.position.lerp(targetPosition, 0.1);
      const targetLookAt = new THREE.Vector3(0, 1, 0);

      camera.lookAt(targetLookAt);
      camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      {!isFlat ? (
        <>
          <Environment preset="city" />
          <color args={["#241a1a"]} attach="background" />

          <PresentationControls
            global
            rotation={[0.13, 0.1, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          >
            <Float rotationIntensity={0.4}>
              <rectAreaLight
                width={2.5}
                height={1.65}
                intensity={65}
                color={"#000000"}
                rotation={[-0.1, Math.PI, 0]}
                position={[0, 0.55, -1.15]}
              />
              <primitive object={computer.scene} position-y={-0.6}>
                <Html
                  transform
                  wrapperClass="htmlScreen"
                  distanceFactor={0.85}
                  position={[0, 1.56, -1.4]}
                  rotation-x={-0.256}
                >
                  <iframe
                    src="https://portfolio-pi-jade-19.vercel.app/"
                    onPointerOver={handleOnPointerOver}
                    onPointerOut={handleOnPointerOut}
                  ></iframe>
                </Html>
              </primitive>
              <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={1}
                position={[2, 1.25, 0.75]}
                rotation-y={-1.25}
                maxWidth={2}
                // textAlign="center"
              >
                RYAN IRANI
              </Text>
              <Text
                font="./bangers-v20-latin-regular.woff"
                fontSize={0.1}
                position={[2, 0.15, 0.75]}
                rotation-y={-1.25}
                maxWidth={2}
                onClick={handleClick}
                // textAlign="center"
              >
                Click to switch to 2D Mode
              </Text>
            </Float>
          </PresentationControls>

          <ContactShadows
            position-y={-1.4}
            opacity={0.4}
            scale={5}
            blur={2.4}
          />
        </>
      ) : (
        <Html>
          <iframe
            src="https://ryanirani.com"
            style={{
              width: "100vw",
              height: "100vh",
              border: "none",
              borderRadius: "20px",
              background: "#000000",
              position: "absolute",
              top: "0",
              left: "0",
            }}
          />
        </Html>
      )}
    </>
  );
}
