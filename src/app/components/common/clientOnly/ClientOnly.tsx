'use client';
import React, { useEffect, useState } from 'react';

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark the component as mounted once it reaches the client
    setMounted(true);
  }, []);

  // Render nothing while it's mounting to avoid server-side rendering issues
  if (!mounted) return null;

  return <>{children}</>;
};

export default ClientOnly;
