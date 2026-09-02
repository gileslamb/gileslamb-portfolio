import type { Metadata } from "next";
import InvisibleThreadsClient from "./InvisibleThreadsClient";

export const metadata: Metadata = {
  title: "Invisible Threads — Giles Lamb",
  description:
    "Invisible Threads — a listening room. In memory of those lost.",
};

export default function InvisibleThreadsPage() {
  return <InvisibleThreadsClient />;
}
