"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NotFoundClient = () => {
  const router = useRouter();

  useEffect(() => {
    // Редірект через 3 секунди
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>You will be redirected to the Home page soon</p>
    </div>
  );
};

export default NotFoundClient;
