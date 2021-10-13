import { StyleSheet } from 'react-native';
import modules from 'modules';

const _styles = StyleSheet.create({
	border: {
		borderBottomColor: modules.BORDER_COLOR,
		borderBottomWidth: 1
	},
	containItems: {
		paddingTop: modules.BODY_HORIZONTAL,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	itemSeparator: {
		height: 1,
		backgroundColor: modules.BORDER_COLOR
	},
	contentModal: {
		backgroundColor: 'white',
		padding: modules.BODY_HORIZONTAL,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 0,
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0
	},
	imgFilter: {
		backgroundColor: 'rgba(0,0,0,.25)',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	flx2: {
		flex: 2
	},
	column: {
		flexDirection: 'column',
		justifyContent: 'center'
	},
	org: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: modules.BODY_HORIZONTAL
	},
	avatar: {
		width: 50,
		height: 50,
		borderColor: '#ebebeb',
		borderWidth: 1,
		borderRadius: 50 / 2
	},
	fake: {
		height: 80
	},
	iconTabContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: modules.SPACE
	},
	TopTabActive: {
		color: modules.WHITE,
		fontSize: 15
	},
	TopTab: {
		fontSize: 15,
		color: modules.WHITE_SUB
	},
	labelTabActive: {
		color: modules.PRIMARY,
		fontSize: 11
	},
	labelTab: {
		fontSize: 11,
		color: modules.PRIMARY_TAB
	},
	body: {
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	bodyIcon: {
		paddingHorizontal: modules.BODY_HORIZONTAL - 10
	},
	containerWhite: {
		flex: 1,
		backgroundColor: modules.WHITE
	},
	containModal: {
		backgroundColor: '#FFF',
		paddingVertical: modules.BODY_HORIZONTAL / 2
	},
	containerPrimary: {
		flex: 1,
		backgroundColor: modules.BACKGROUND_PRIMARY
	},
	containerColorPrimary: {
		flex: 1,
		backgroundColor: modules.BACKGROUND_COLOR
	},
	flx1: {
		flex: 1
	},
	rows: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	centerMode: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: modules.BODY_HORIZONTAL
	},
	center: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	shadow: {
		// backgroundColor:"#FFF",
		shadowColor: 'rgba(0,0,0,.15)',
		shadowOffset: {
			width: 0,
			height: 10
		},
		shadowRadius: 10,
		shadowOpacity: 2,
		elevation: 10
	},
	cardShadow: {
		shadowColor: '#CFCCDC',
		shadowOffset: {
			width: 0,
			height: 15
		},
		shadowRadius: 20,
		shadowOpacity: 0.65,
		elevation: 15
	},
	shadowSmall: {
		shadowColor: '#CFCCDC',
		shadowOffset: {
			width: 0,
			height: 8
		},
		shadowRadius: 8,
		shadowOpacity: 0.5,
		elevation: 8
	},
	statisticContainer: {
		backgroundColor: modules.WHITE,
		marginBottom: modules.BODY_HORIZONTAL / 2,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	bookShadow: {
		shadowColor: 'rgba(0,0,0,.8)',
		shadowOffset: {
			width: 3,
			height: 8
		},
		shadowRadius: 12,
		shadowOpacity: 0.3,
		elevation: 8,
	},
});


export default _styles
