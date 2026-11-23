import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the hook mark
  const hookScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
  });

  // Stroke drawing progress (0 to 1)
  const strokeProgress = interpolate(frame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Wordmark opacity and slide
  const textOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const textTranslateY = interpolate(frame, [30, 60], [20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Tagline reveal
  const taglineOpacity = interpolate(frame, [50, 75], [0, 0.85], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FAF7F2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "'Fraunces', Georgia, serif",
      }}
    >
      {/* Animated Crochet Hook and Yarn Strand */}
      <div
        style={{
          transform: `scale(${hookScale})`,
          marginBottom: 32,
        }}
      >
        <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
          {/* Yarn loop */}
          <path
            d="M 25 70 C 15 50, 20 25, 45 25 C 70 25, 80 45, 65 65 C 50 85, 30 75, 55 50"
            stroke="#C9A227"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={200}
            strokeDashoffset={200 * (1 - strokeProgress)}
          />
          {/* Crochet hook stem */}
          <line
            x1="30"
            y1="85"
            x2="70"
            y2="15"
            stroke="#1A1613"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={120}
            strokeDashoffset={120 * (1 - strokeProgress)}
          />
          {/* Hook tip */}
          <path
            d="M 70 15 Q 75 10, 73 18"
            stroke="#1A1613"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Brand Title */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textTranslateY}px)`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 76,
            fontWeight: 500,
            color: "#1A1613",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          TheYarnHook
        </h1>
        <p
          style={{
            opacity: taglineOpacity,
            fontFamily: "sans-serif",
            fontSize: 20,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#6B5E51",
            marginTop: 14,
          }}
        >
          Tactile Luxury · Thoughtful Stitches
        </p>
      </div>
    </AbsoluteFill>
  );
};
