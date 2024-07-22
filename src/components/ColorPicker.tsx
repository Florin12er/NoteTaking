import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const ColorPicker = ({ onChange, initialColor }) => {
  const [color, setColor] = useState(initialColor);
  const [showPicker, setShowPicker] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-6 h-6 rounded"
        style={{ backgroundColor: color }}
      />
      {showPicker && (
        <div className="absolute z-10 mt-2">
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

