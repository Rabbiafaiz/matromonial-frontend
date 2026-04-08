import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  // Dynamically import the SVG component
  const IconComponent = require(`../../../../../public/images/svg/${name}.svg`).default;

  // Render the imported SVG component
  return <IconComponent {...props} />;
};

export default Icon;