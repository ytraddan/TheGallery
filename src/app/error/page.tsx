"use client";

import { useEffect } from "react";

export default function ErrorTest() {
  useEffect(() => {
    throw new Error("This is a test error message");
  }, []);

  return null;
}
