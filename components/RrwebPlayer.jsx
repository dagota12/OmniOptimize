"use client";
import React, { useEffect, useRef } from "react";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

export const RrwebPlayer = ({ events, autoPlay = true }, ref) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Only initialize if we have events
    if (!events || events.length === 0) {
      return;
    }

    // Cleanup previous player
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current = null;
    }

    // Reset container
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    try {
      // Initialize new player with rrweb events
      const player = new rrwebPlayer({
        target: containerRef.current,
        props: {
          width: 500,
          height: 320,
          events: events,
          skipInactive: true,
          speedOption: [1, 2, 4, 8],
          autoPlay: autoPlay,
          showController: true,
        },
      });

      playerRef.current = player;
    } catch (error) {
      console.error("Failed to initialize rrweb player:", error);
    }

    // Cleanup function
    return () => {
      if (playerRef.current) {
        playerRef.current.pause();
        playerRef.current.innerHTML = "";
      }
    };
  }, [events, autoPlay]);

  return (
    <div
      ref={containerRef || ref}
      className="w-full h-full border-blue-500 border"
    />
  );
};

RrwebPlayer.displayName = "RrwebPlayer";
