import React from "react";

// Render this once in App.js — provides the SVG filter referenced by all glass buttons
export const GlassFilter = () => (
  <svg style={{ display: "none" }} aria-hidden="true">
    <defs>
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="60"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

// Drop these layers inside any position:relative button/anchor to get glass look
export const GlassLayers = ({ tint = "rgba(255,255,255,0.12)" }) => (
  <>
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        borderRadius: "inherit",
        overflow: "hidden",
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        filter: "url(#glass-distortion)",
        isolation: "isolate",
        pointerEvents: "none",
      }}
    />
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        borderRadius: "inherit",
        background: tint,
        pointerEvents: "none",
      }}
    />
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 2,
        borderRadius: "inherit",
        boxShadow:
          "inset 2px 2px 1px rgba(255,255,255,0.5), inset -1px -1px 1px rgba(255,255,255,0.45)",
        pointerEvents: "none",
      }}
    />
  </>
);

// Convenience wrapper for stand-alone glass buttons / links
export const GlassButton = ({
  children,
  href,
  target = "_blank",
  className = "",
  style = {},
  tint,
  onClick,
  ...rest
}) => {
  const base = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 24,
    padding: "12px 28px",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.3)",
    boxShadow: "0 6px 6px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)",
    transition: "all 0.7s cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <>
      <GlassLayers tint={tint} />
      <span style={{ position: "relative", zIndex: 3 }}>{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel="noopener noreferrer" className={className} style={base} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={className} style={base} onClick={onClick} {...rest}>
      {content}
    </button>
  );
};
