import React, { Component } from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import { GENDER_LIST } from 'dummy';
import ActionSheet from 'react-native-action-sheet';
import modules from 'modules';
import EditInformationScreen from './EditInformationScreen';
import { inject, observer } from 'mobx-react';
import { AuthStore } from 'stores/auth.store';

interface Props extends NavigationV5Props {
    auth: AuthStore
}

interface State {
    firstName: string
    lastName: string
    place: any
    gender: any
    birthDate: any
    photo: string
}

@inject('auth')
@observer
export default class EditInformationContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { account } = this.props.auth
        this.state = {
            firstName: account?.firstName ?? "",
            lastName: account?.lastName ?? "",
            place: account?.province?.NameKh ?? null,
            gender: account?.gender ?? null,
            birthDate: account?.dateOfBirth ?? "",
            photo: account?.photoUrl ?? ""
        }
    }

    selectedHandler = (item: any) => {
        this.setState({ place: item })
    }

    _onSelectLocation = () => {
        const params: any = {
            title: "រាជធានីខេត្ត",
            field: "location_cities",
            callback: this.selectedHandler,
            requiredField: null,
            requiredKey: null,
        }
        this.props.navigation.navigate("GEO_SELECTOR", params)
    }

    onGenderOptions = () => {
        const DESTRUCTIVE_INDEX = 10;
        const CANCEL_INDEX = 3;
        ActionSheet.showActionSheetWithOptions({
            options: GENDER_LIST.map(m => m.text),
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX,
            tintColor: modules.PRIMARY,
        },
            (buttonIndex: number) => {
                if (buttonIndex === GENDER_LIST.length - 1 || (!buttonIndex && buttonIndex != 0)) return;
                this.setState({ gender: GENDER_LIST[buttonIndex] }, () => console.log(`this.state.gender`, this.state.gender))
            });

    }

    callbackSelectedBirthDate = (event: any, date: any) => {
        date ? this.setState({ birthDate: date }) : null
    }

    _onChangePhoto = () => {
        this.props.auth.onChagePhoto()
    }

    _onPressDone = () => {
        const { user } = this.props.auth
        if (user) {
            // this.state in parameter cuz same field name
            const { prevScreen, ...params } = this.props.route.params || {}
            this.props.auth.updateProfile(user, this.state, (status) => {
                if (status) {
                    this.props.navigation.navigate(prevScreen, params)
                }
            })
        }
    }
    render() {
        const { lastName, firstName, birthDate, photo, place, gender } = this.state

        return (
            <EditInformationScreen
                onGoBack={() => this.props.navigation.goBack()}
                onPressDone={() => this._onPressDone()}
                dateOfBirth={birthDate}
                onDateBirthChange={this.callbackSelectedBirthDate}
                firstName={firstName}
                onFirstName={(text) => this.setState({ firstName: text })}
                gender={gender}
                onGender={this.onGenderOptions}
                lastName={lastName}
                onLastName={(text) => this.setState({ lastName: text })}
                place={place}
                onPlace={this._onSelectLocation}
                photo={photo}
                onPhoto={() => this._onChangePhoto()}
            />
        )
    }
}
