import React from 'react';

export const FeatureCard = ({ icon: Icon, number, title, description }) => {
  return (
    <div className="relative bg-canvas hairline-border rounded-brand p-8 h-full">
      {/* Corner Motif */}
      <div className="corner-motif corner-motif-br"></div>

      <div className="flex flex-col h-full">
        {/* Icon or Number Section */}
        <div className="mb-6 text-brand-green">
          {Icon ? (
            <Icon className="w-10 h-10" strokeWidth={1.5} />
          ) : number ? (
            <span className="text-display-lg font-bold">{number}</span>
          ) : null}
        </div>

        {/* Content Section */}
        <div className="flex-grow">
          <h3 className="text-ink-main text-heading-md mb-3">{title}</h3>
          <p className="text-ink-body text-body-md">{description}</p>
        </div>
      </div>
    </div>
  );
};
