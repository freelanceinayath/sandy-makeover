import React from 'react';
import { Button } from './Button';

export const PropertyCard = ({ image, title, location, price, onAction }) => {
  return (
    <div className="relative bg-canvas hairline-border rounded-brand overflow-hidden group">
      {/* Corner Motif */}
      <div className="corner-motif corner-motif-tl"></div>

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="mb-4">
          <p className="text-ink-muted text-caption-sm uppercase tracking-wider mb-2">{location}</p>
          <h3 className="text-ink-main text-card-title mb-1">{title}</h3>
          <p className="text-ink-main text-body-strong">{price}</p>
        </div>

        <Button variant="ghost" onClick={onAction} className="mt-2">
          View Property
        </Button>
      </div>
    </div>
  );
};
