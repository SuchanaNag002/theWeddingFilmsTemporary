"use client"
import React from "react";
import Buffer from "@/client/components/LoadingState/Buffer";
import { useState, useEffect } from "react";
const EditAboutMe = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate loading completion after 0.3 seconds
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);
  return loading ? (
    <Buffer />
  ) : (
    <div className="h-full w-full">EditAboutMe</div>
  );
};

export default EditAboutMe;
