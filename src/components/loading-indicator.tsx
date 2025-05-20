"use client";

import React from "react";
import { RotatingLines } from "react-loader-spinner";

type LegacySizeOption = "small" | "middle" | "large";
type SizeOption = "xsmall" | "small" | "medium" | "large" | LegacySizeOption;
type Variant = "light" | "dark";

type LoadingIndicatorProps = {
  visible?: boolean;
  size?: SizeOption;
  contained?: boolean;
  strokeColor?: string;
  strokeWidth?: string;
  animationDuration?: string;
  variant?: Variant; // New prop
};

const sizeMap: Record<Exclude<SizeOption, "middle">, number> = {
  xsmall: 16,
  small: 24,
  medium: 32,
  large: 48,
};

const normalizeSize = (size: SizeOption): keyof typeof sizeMap => {
  if (size === "middle") return "medium";
  return size as keyof typeof sizeMap;
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  visible = true,
  size = "small",
  contained = false,
  strokeColor,
  strokeWidth = "3",
  animationDuration = "0.75",
  variant = "light", // Default variant
}) => {
  if (!visible) return null;

  const normalizedSize = normalizeSize(size);

  const fallbackStrokeColor = variant === "dark" ? "#d1d1d6" : "#555";
  const overlayBackground =
    variant === "dark"
      ? "rgba(0, 0, 0, 0.85)"
      : "rgba(255, 255, 255, 0.7)";

  const wrapperStyle: React.CSSProperties = contained
    ? {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    : {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: overlayBackground,
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      };

  return (
    <div style={wrapperStyle}>
      <RotatingLines
        strokeColor={strokeColor || fallbackStrokeColor}
        strokeWidth={strokeWidth}
        animationDuration={animationDuration}
        width={sizeMap[normalizedSize].toString()}
        visible={visible}
        ariaLabel="rotating-lines-loading"
      />
    </div>
  );
};

export default LoadingIndicator;
