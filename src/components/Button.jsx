import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 transition-all duration-300'
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-opacity-90',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white'
  }

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button 