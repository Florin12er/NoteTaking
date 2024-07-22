
const themes = [
  'a11y-dark', 'a11y-light', 'agate', 'an-old-hope', 'androidstudio', 'arduino-light',
  'arta', 'ascetic', 'atom-one-dark', 'atom-one-light', 'base16', 'color-brewer',
  'darcula', 'dark', 'default', 'docco', 'dracula', 'far', 'foundation', 'github',
  'github-gist', 'gml', 'googlecode', 'gradient-dark', 'grayscale', 'gruvbox-dark',
  'gruvbox-light', 'hopscotch', 'hybrid', 'idea', 'ir-black', 'isbl-editor-dark',
  'isbl-editor-light', 'kimbie.dark', 'kimbie.light', 'lightfair', 'magula', 'mono-blue',
  'monokai', 'monokai-sublime', 'night-owl', 'nnfx-dark', 'nnfx', 'nord', 'obsidian',
  'ocean', 'paraiso-dark', 'paraiso-light', 'pojoaque', 'purebasic', 'qtcreator_dark',
  'qtcreator_light', 'railscasts', 'rainbow', 'routeros', 'school-book', 'shades-of-purple',
  'solarized-dark', 'solarized-light', 'sunburst', 'tomorrow-night-blue', 'tomorrow-night-bright',
  'tomorrow-night-eighties', 'tomorrow-night', 'tomorrow', 'vs', 'vs2015', 'xcode', 'xt256',
  'zenburn'
];

const CodeThemeSelector = ({ onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="code-theme-selector" className="block mb-2 text-sm font-medium text-gray-700">
        Select Code Theme:
      </label>
      <select
        id="code-theme-selector"
        onChange={(e) => onChange(e.target.value)}
        className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CodeThemeSelector;

