import React from "react";
import { TabGroup } from "../../../components/tab-group";

export const metadata = {
  title: "Incremental Static Regeneration (ISR)",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const ids = [{ id: "bitcoin" }, { id: "ethereum" }, { id: "flow" }];

  return (
    <div className="space-y-9">
      <TabGroup
        path="/isr"
        items={[
          {
            text: "Home",
          },
          ...ids.map((x) => ({
            text: `Post ${x.id}`,
            slug: x.id,
          })),
        ]}
      />

      <div>{children}</div>
    </div>
  );
}
