"use client";

import React from "react";
import { Maximize, Minus, Plus } from "lucide-react";
import {
  useViewport,
  useStore,
  useReactFlow,
  type PanelProps,
} from "@xyflow/react";

export default function ZoomSlider({
  className = "",
  orientation = "horizontal",
  ...props
}: Omit<PanelProps, "children"> & {
  orientation?: "horizontal" | "vertical";
}) {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();
  const minZoom = useStore((state) => state.minZoom);
  const maxZoom = useStore((state) => state.maxZoom);

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={`
        bg-base-300 text-base-content flex gap-1 rounded-md p-1
        ${isHorizontal ? "flex-row" : "flex-col"}
        ${className}
      `}
      {...props}
    >
      <div
        className={`
          flex gap-1
          ${isHorizontal ? "flex-row" : "flex-col-reverse"}
        `}
      >
        <button
          className="btn btn-ghost btn-s"
          onClick={() => zoomOut({ duration: 300 })}
        >
          <Minus className="h-4 w-4" />
        </button>

        <input
          type="range"
          className={`
            range-sm range-primary
            ${isHorizontal ? "w-[140px]" : "h-[140px]"}
          `}
          min={minZoom}
          max={maxZoom}
          step={0.01}
          value={zoom}
          onChange={(e) => zoomTo(Number(e.target.value))}
        />

        <button
          className="btn btn-ghost btn-s"
          onClick={() => zoomIn({ duration: 300 })}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <button
        className={`
          btn btn-ghost tabular-nums
          ${isHorizontal ? "w-[80px]" : "h-[40px] w-[40px]"}
        `}
        onClick={() => zoomTo(1, { duration: 300 })}
      >
        {(zoom * 100).toFixed(0)}%
      </button>

      <button
        className="btn btn-ghost btn-s"
        onClick={() => fitView({ duration: 300 })}
      >
        <Maximize className="h-4 w-4" />
      </button>
    </div>
  );
}
