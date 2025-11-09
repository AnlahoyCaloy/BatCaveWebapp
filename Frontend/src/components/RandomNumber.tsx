// RandomNumber.tsx
"use client"
import React from "react";
import { useEffect, useState } from "react";

interface Props {
  number1?: number | undefined ; // optional to prevent runtime error
}

const RandomNumber: React.FC<Props> = ({ number1 }) => {
  const [randomNumber, setRandomNumber] = useState<number>()

  useEffect(() => {
      setRandomNumber((Math.random() * 100) + number1)
  }, [])
  
  return <span>{(randomNumber ?? 0).toFixed(2)}</span>; // format number
};

export default RandomNumber;
