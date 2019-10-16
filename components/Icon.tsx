import decamelize from 'decamelize';

interface IconProps {
  icon: string;
}

const Icon = (props: IconProps): JSX.Element => {
  const { icon } = props;
  const separator: string = '_';

  // The icon name from react-icons library is a camelcase string.
  // Decamelization will format icon name from 'FaJs' to 'fa_js'
  const decamelizedIcon = decamelize(icon, separator);
  // Make an array from decamelized string and
  // get the first key as an icon library name shortname (fa, io, md, ...).
  const [iconLibrary] = decamelizedIcon.split(separator);

  // By default load Puzzle like icon.
  let LinkIcon = require('react-icons/fa').FaPuzzlePiece;

  // Load each icon library within switch statement,
  // since dynamic require paths are not supported by JavaScript.
  switch (iconLibrary) {
    // Font Awesome.
    case 'fa':
      LinkIcon = require('react-icons/fa')[icon];
      break;
    // Ionicons.
    case 'io':
      LinkIcon = require('react-icons/io')[icon];
      break;
    // Material Design icons.
    case 'md':
      LinkIcon = require('react-icons/md')[icon];
      break;
    // Typicons.
    case 'ti':
      LinkIcon = require('react-icons/ti')[icon];
      break;
    // Github Octicons icons.
    case 'go':
      LinkIcon = require('react-icons/go')[icon];
      break;
    // Feather.
    case 'fi':
      LinkIcon = require('react-icons/fi')[icon];
      break;
    // Game Icons.
    case 'gi':
      LinkIcon = require('react-icons/gi')[icon];
      break;
    // Weather Icons.
    case 'wi':
      LinkIcon = require('react-icons/wi')[icon];
      break;
    // Devicons.
    case 'di':
      LinkIcon = require('react-icons/di')[icon];
      break;
  }

  return <LinkIcon />;
};

export default Icon;
