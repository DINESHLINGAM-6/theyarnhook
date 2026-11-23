import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface PromoBannerProps {
  text: string;
  badge: string;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ text, badge }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const pulse = Math.sin(frame / 10) * 0.05 + 1;

  const barSlide = interpolate(frame, [0, 30], [-100, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1A1613",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FAF7F2",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          transform: `translateY(${barSlide}px) scale(${enter})`,
          padding: "30px 60px",
          backgroundColor: "#2B241E",
          borderRadius: 999,
          border: "1px solid rgba(201, 162, 39, 0.3)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
        }}
      >
        <span
          style={{
            backgroundColor: "#C9A227",
            color: "#1A1613",
            fontWeight: 700,
            fontSize: 16,
            padding: "8px 18px",
            borderRadius: 999,
            letterSpacing: "0.15em",
            transform: `scale(${pulse})`,
          }}
        >
          {badge}
        </span>
        <span
          style={{
            fontSize: 28,
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          {text}
        </span>
      </div>
    </AbsoluteFill>
  );
};
