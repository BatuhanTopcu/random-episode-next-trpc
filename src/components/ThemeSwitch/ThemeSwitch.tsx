import React from "react";
import { toggleTheme, themes } from "@utils/hooks/useTheme";

export default function ThemeSwitch() {
  return (
    <div className="theme-switch">
      <h1 className="theme-switch__title">Themes</h1>
      <div className="theme-switch__container">
        {themes.map((theme) => (
          <div
            className="theme-info"
            key={theme.name}
            onClick={() => toggleTheme(theme.name)}
          >
            <h1>{theme.title}</h1>
            <div className="colors">
              {theme.colors.map((color) => (
                <ColorBall key={color} color={color} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const ColorBall = ({ color }: { color: string }) => {
  return (
    <div
      data-color={color}
      className="color-ball"
      style={{ backgroundColor: color }}
    ></div>
  );
};
