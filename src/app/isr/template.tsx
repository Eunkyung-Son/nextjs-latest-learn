import React from "react";
import { Boundary } from "../../../components/boundary";

export default function Template({ children }: { children: React.ReactNode }) {
  return <Boundary>{children}</Boundary>;
}
