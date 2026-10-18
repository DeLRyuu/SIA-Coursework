import React, { useEffect, useState } from "react";
import promoImg from "../assets/bai-one-tik-one.jpg";

interface PromoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PromoModal({ isOpen, onClose }: PromoModalProps): JSX.Element | null {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`promo-bg ${isOpen ? "promo-show" : "promo-hide"}`}
      style={{ backgroundImage: `url(${promoImg})` }}
      onClick={onClose}
    />
  );
}