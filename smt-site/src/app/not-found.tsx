"use client";

import { useRouter } from "next/navigation";
import SideNavbar from "./components/navbar";
import { Button } from "@nextui-org/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="container">
      <SideNavbar />
      <h1>404 - Not found</h1>
      <h2>Powered by NEXT.JS with NEXTUI</h2>
      <Button onClick={() => router.push("/")}>Home</Button>
    </div>
  );
}
