import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white button-glow hover:shadow-cosmic hover:scale-105',
    secondary: 'bg-gradient-to-r from-cosmic-blue to-cosmic-pink text-white hover:shadow-cosmic hover:scale-105',
    outline: 'border border-white/20 text-white hover:bg-white/10 backdrop-blur-lg',
    ghost: 'text-white hover:bg-white/10 backdrop-blur-lg'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;