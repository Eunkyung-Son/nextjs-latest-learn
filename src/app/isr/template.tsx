"use client";

import React, { useEffect } from "react";
import { Boundary } from "../../../components/boundary";
import { onTTFB } from "web-vitals";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    onTTFB(console.log);
  }, []);

  return <Boundary>{children}</Boundary>;
}
