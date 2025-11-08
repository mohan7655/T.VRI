"use client";
import * as React from "react";
import SvgIcon from "@mui/material/SvgIcon";

import dhammaSvg from "../../../public/leaf.svg";
import vipassanaSvg from "../../../public/wheel.svg";

export function VipassanaIcon(props) {
  return <SvgIcon component={vipassanaSvg} inheritViewBox {...props} />;
}
export function DhammaIcon(props) {
  return <SvgIcon component={dhammaSvg} inheritViewBox {...props} />;
}
