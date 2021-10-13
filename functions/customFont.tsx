import { Platform } from 'react-native';

interface Props {
	weight: any;
	family: string;
	familyIOS: string;
}

const font: any = {
	OpenSans: {
		weights: {
			Light: '300',
			Normal: '400',
			SemiBold: '600',
			Bold: '700',
			ExtraBold: '800'
		}
	},
	GoogleSans: {
		weights: {
			Bold: '700',
			SemiBold: '600',
			Normal: '400'
		}
	},
	Moul: {
		weights: {
			Regular: '400'
		}
	},
	Battambang: {
		weights: {
			Regular: '400',
			Bold: '700'
		}
	},
	Georgia: {
		weights: {
			Regular: '400',
			Bold: '700'
		}
	},
	SFProText: {
		weights: {
			Light: '200',
			Regular: '300',
			Medium: '400',
			Semibold: '500',
			Bold: '600',
			Heavy: '700',
		}
	}
};

const fontMaker = (options: any) => {
	let { weight, family, familyIOS }: Props = Object.assign(
		{
			weight: '400',
			family: 'OpenSans',
			familyIOS: 'Open Sans'
		},
		options
	);
	const { weights } = font[family];
	if (Platform.OS === 'android') {
		weight = weights[weight] ? weight : '';
		const suffix = weight;
		return {
			fontFamily: family + (suffix.length ? `-${suffix}` : '')
		};
	} else {
		weight = weights[weight] || weights.Normal;
		return {
			fontFamily: familyIOS,
			fontWeight: weight
		};
	}
};

export const fontLight = fontMaker({ weight: 'Light', family: 'SFProText', familyIOS: 'SFProText-Light' });
export const fontNormal = fontMaker({ weight: 'Regular', family: 'SFProText', familyIOS: 'SFProText-Regular' });
export const fontMedium = fontMaker({ weight: 'Medium', family: 'SFProText', familyIOS: 'SFProText-Medium' });
export const fontSemiBold = fontMaker({ weight: 'Semibold', family: 'SFProText', familyIOS: 'SFProText-Semibold' });
export const fontBold = fontMaker({ weight: 'Bold', family: 'SFProText', familyIOS: 'SFProText-Bold' });
export const fontExtraBold = fontMaker({ weight: 'Heavy', family: 'SFProText', familyIOS: 'SFProText-Heavy' });

export const fontGSans = fontMaker({ weight: 'Normal', family: 'GoogleSans', familyIOS: 'Google Sans' });
export const FontGSansSemiBold = fontMaker({ weight: 'SemiBold', family: 'GoogleSans', familyIOS: 'Google Sans' });
export const FontGSansBold = fontMaker({ weight: 'Bold', family: 'GoogleSans', familyIOS: 'Google Sans' });

export const fontGeorgia = fontMaker({ weight: 'Normal', family: 'Georgia', familyIOS: 'Georgia' });
export const fontGeorgiaBold = fontMaker({ weight: 'Bold', family: 'Georgia', familyIOS: 'Georgia-Bold' });

export const Battambang = fontMaker({ weight: 'Regular', family: 'Battambang', familyIOS: 'Battambang-Regular' });
export const BattambangBold = fontMaker({ weight: 'Bold', family: 'Battambang', familyIOS: 'Battambang-Bold' });

export const Moul = fontMaker({ weight: 'Regular', family: 'Moul', familyIOS: 'Moul' });
