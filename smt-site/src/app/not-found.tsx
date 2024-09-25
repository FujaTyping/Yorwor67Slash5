"use client";

import { useRouter } from "next/navigation";
import { Button } from "flowbite-react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="container">
      <h1>404 - Not found</h1>
      <h2>Powered by NEXT.JS with Flowbite</h2>
      <div className="gap-3" style={{ display: "flex" }}>
        <Button color="failure" onClick={() => router.push("/")}>
          Back
        </Button>
      </div>
    </div>
  );
}
