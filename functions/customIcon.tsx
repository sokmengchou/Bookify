import { createIconSet } from 'react-native-vector-icons';
const glyphMap = require(`../assets/customIcon/remixicon.glyphmap.json`);
const RemixIcon = createIconSet(glyphMap, 'remixicon', 'remixicon.ttf');
export default RemixIcon;