"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface SpaceObject {
  id: number
  type: "asteroid" | "comet"
  x: number
  y: number
  size: number
  speed: number
  rotation: number
}

export function SpaceBackground() {
  const [spaceObjects, setSpaceObjects] = useState<SpaceObject[]>([])

  useEffect(() => {
    // Generate random space objects
    const objects: SpaceObject[] = []
    for (let i = 0; i < 8; i++) {
      objects.push({
        id: i,
        type: Math.random() > 0.5 ? "asteroid" : "comet",
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 50 + 20,
        rotation: Math.random() * 360,
      })
    }
    setSpaceObjects(objects)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {spaceObjects.map((obj) => (
        <motion.div
          key={obj.id}
          className="absolute opacity-20"
          initial={{
            x: `${obj.x}vw`,
            y: `${obj.y}vh`,
            rotate: obj.rotation,
          }}
          animate={{
            x: [`${obj.x}vw`, `${((obj.x + 100) % 200) - 50}vw`],
            y: [`${obj.y}vh`, `${((obj.y + 50) % 150) - 25}vh`],
            rotate: [obj.rotation, obj.rotation + 360],
          }}
          transition={{
            duration: obj.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {obj.type === "asteroid" ? (
            <div
              className="bg-gradient-to-br from-gray-400 to-gray-600 rounded-full shadow-lg"
              style={{
                width: `${obj.size}px`,
                height: `${obj.size}px`,
                boxShadow: "0 0 20px rgba(156, 163, 175, 0.3)",
              }}
            >
              {/* Asteroid surface details */}
              <div className="absolute top-1 left-1 w-2 h-2 bg-gray-500 rounded-full opacity-60"></div>
              <div className="absolute bottom-2 right-1 w-1 h-1 bg-gray-300 rounded-full opacity-80"></div>
            </div>
          ) : (
            <div className="relative">
              {/* Comet head */}
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg"
                style={{
                  width: `${obj.size * 0.6}px`,
                  height: `${obj.size * 0.6}px`,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.4)",
                }}
              ></div>
              {/* Comet tail */}
              <div
                className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-gradient-to-r from-cyan-400/60 to-transparent rounded-full"
                style={{
                  width: `${obj.size * 1.5}px`,
                  height: `${obj.size * 0.3}px`,
                }}
              ></div>
            </div>
          )}
        </motion.div>
      ))}

      {/* Additional cosmic dust particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
          }}
          animate={{
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
