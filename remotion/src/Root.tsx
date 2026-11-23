import React from "react";
import { Composition, Folder } from "remotion";
import { LogoReveal } from "./compositions/LogoReveal";
import { CollectionTitleCard } from "./compositions/CollectionTitleCard";
import { PromoBanner } from "./compositions/PromoBanner";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Brand">
        <Composition
          id="LogoReveal"
          component={LogoReveal}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="PromoBanner"
          component={PromoBanner}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            text: "New colours just landed in Desire & Souffle",
            badge: "NEW DYE LOTS",
          }}
        />
      </Folder>

      <Folder name="Collections">
        <Composition
          id="TitleCard-Desire"
          component={CollectionTitleCard}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            collectionName: "DESIRE",
            tagline: "Desire what you make.",
            bgColor: "#4A1024",
            accentColor: "#F4DCE2",
            textColor: "#FFF6F8",
          }}
        />
        <Composition
          id="TitleCard-Milka"
          component={CollectionTitleCard}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            collectionName: "MILKA",
            tagline: "Slow mornings, soft stitches.",
            bgColor: "#3A2716",
            accentColor: "#E7D8BF",
            textColor: "#FFFBF4",
          }}
        />
        <Composition
          id="TitleCard-Souffle"
          component={CollectionTitleCard}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            collectionName: "SOUFFLE",
            tagline: "Light as a whisk.",
            bgColor: "#9A4A16",
            accentColor: "#FBE3CC",
            textColor: "#FFF8F0",
          }}
        />
        <Composition
          id="TitleCard-PlushLuxe"
          component={CollectionTitleCard}
          durationInFrames={120}
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{
            collectionName: "PLUSH LUXE",
            tagline: "Midnight, but make it soft.",
            bgColor: "#1B0E26",
            accentColor: "#C9A227",
            textColor: "#F7F1FF",
          }}
        />
      </Folder>
    </>
  );
};
