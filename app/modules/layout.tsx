import { Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const layout = {
	GRID_SPACING: 8,
	BODY_HORIZONTAL: 15,
	BODY_HORIZONTAL_24: 24,
	BODY_HORIZONTAL_ACTION: 30,
	BODY_HORIZONTAL_18: 18,
	BODY_HORIZONTAL_12: 12,
	PADDING: 15,
	SPACE: 4,
	SPACE5: 5,
	BIG_SPACE: 6,
	RADIUS: 6,
	RADIUS_BUTTON: 50,
	VIEW_PORT_WIDTH: viewportWidth,
	VIEW_PORT_HEIGHT: viewportHeight,
	PADDING_BAR: 45,
	HEADER_ICON_BUTTON: 40,
	CARD_HEADER: 120,
	AVATAR_LIST: 38,
	AVATAR_GRID: 65,
	START_LINE_GRADIENT: { x: 0.25, y: 0 },
	END_LINE_GRADIENT: { x: 0.5, y: 0.5 },
	START_LINE_GRADIENT_V: { x: 0, y: 0.1 },
	END_LINE_GRADIENT_V: { x: 1, y: 0.9 },
	START_LINE_GRADIENT_V2: { x: 1, y: 0.5 },
	END_LINE_GRADIENT_V2: { x: 1, y: 0 },
	CARD: 350,
	CARD_RADIUS: 12,
	CARD_PENDING: 20,
	FONT_H1: 34,
	FONT_H2: 28,
	FONT_H3: 22,
	FONT_H4: 20,
	FONT_H5: 17,
	FONT_H6: 16,
	FONT_H7: 16,
	FONT_P: 13,
	FONT_S: 12,
	SMALL: 11,
	FONT: 15
};

export default layout
