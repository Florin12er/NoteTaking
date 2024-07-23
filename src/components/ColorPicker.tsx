import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
  onChange: (color: string) => void;
  initialColor: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ onChange, initialColor }) => {
  const [color, setColor] = useState<string>(initialColor);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const handleColorChange = (newColor: string) => {
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

