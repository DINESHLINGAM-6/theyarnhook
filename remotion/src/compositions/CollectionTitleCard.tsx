import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface CollectionTitleCardProps {
  collectionName: string;
  tagline: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
}

export const CollectionTitleCard: React.FC<CollectionTitleCardProps> = ({
  collectionName,
  tagline,
  bgColor,
  accentColor,
  textColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80, mass: 1 },
  });

  const titleOpacity = interpolate(frame, [0, 25], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineOpacity = interpolate(frame, [25, 55], [0, 0.9], {
    extrapolateRight: "clamp",
  });

  const accentRingScale = interpolate(frame, [0, 90], [0.8, 1.15], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: textColor,
        fontFamily: "'Fraunces', Georgia, serif",
        overflow: "hidden",
      }}
    >
      {/* Background radial accent element */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          border: `2px dashed ${accentColor}`,
          opacity: 0.25,
          transform: `scale(${accentRingScale}) rotate(${frame * 0.2}deg)`,
        }}
      />

      {/* Collection Title */}
      <div
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 16,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: accentColor,
            display: "block",
            marginBottom: 20,
          }}
        >
          Collection
        </span>
        <h1
          style={{
            fontSize: 110,
            fontWeight: 400,
            letterSpacing: "0.08em",
            margin: 0,
            lineHeight: 1,
            color: textColor,
          }}
        >
          {collectionName}
        </h1>
        <p
          style={{
            opacity: taglineOpacity,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 34,
            marginTop: 24,
            color: accentColor,
          }}
        >
          {tagline}
        </p>
      </div>
    </AbsoluteFill>
  );
};
