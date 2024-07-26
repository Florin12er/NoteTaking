import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X } from 'lucide-react';

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
    <div className="relative inline-block">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="w-8 h-8 rounded-full border border-gray-300 shadow-sm focus:outline-none"
        style={{ backgroundColor: color }}
      />
      {showPicker && (
        <div className="absolute z-10 mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setShowPicker(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>
          <HexColorPicker color={color} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;

