import React from 'react';
import { StringKeyOf } from 'type-fest';
import { THEME_OPTIONS } from '../themes';

interface Props {
  image?: string;
  name: string;
  id: StringKeyOf<typeof THEME_OPTIONS>;
  isActive?: boolean;
  onCheck: (id: StringKeyOf<typeof THEME_OPTIONS>) => void;
}

export const SlideThemeOption = ({ image, name, id, isActive, onCheck }: Props) => {
  const onClick = () => {
    onCheck(id);
  };
  return (
    <div className={`slide-option ${isActive ? 'active' : ''}`} onClick={onClick}>
      {image ? <img src={image} alt={name} /> : <div className="no-image" />}
      <label className="form-check-label">{name}</label>
    </div>
  );
};

export default SlideThemeOption;
