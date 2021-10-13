import React, { Component } from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import FillUpInformationScreen from './FillUpInformationScreen'
import { GENDER_LIST } from 'dummy';
import ActionSheet from 'react-native-action-sheet';
import modules from 'modules';
import { inject, observer } from 'mobx-react';
import { AuthStore } from 'stores/auth.store';

interface Props extends NavigationV5Props {
    auth: AuthStore
}

interface State {
    firstName: string
    lastName: string
    phone: string
    place: any
    gender: any
    birthDate: any
    email: string
}

@inject('auth')
@observer
export default class FillUpInformationContainer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const { user } = this.props.auth

        this.state = {
            firstName: "",
            lastName: "",
            phone: "",
            place: null,
            gender: GENDER_LIST[0],
            birthDate: null,
            email: user?.email ?? ""
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

    _onCreateAccount = () => {
        // FIXME: add validate field before create
        // const { lastName, firstName, birthDate, phone, place, gender, email } = this.state
        const { user } = this.props.auth
        // ...params prev params pass from prev screen
        const { nextScreen, ...params } = this.props.route.params || {}
        console.log('nextScreen :>> ', this.props.route);
        if (user) {
            // this.state in parameter cuz same field name
            this.props.auth.createProfile(user, this.state, (status) => {
                if (status) {
                    if (!nextScreen) {
                        this.props.navigation.navigate('HOME_STACK')
                    } else {
                        this.props.navigation.navigate(nextScreen, params)
                    }
                }
            })
        }
    }

    render() {
        const { loading } = this.props.auth
        const { lastName, firstName, birthDate, phone, place, gender, email } = this.state
        return (
            <FillUpInformationScreen
                onGoBack={() => this.props.navigation.goBack()}
                onPressDone={() => { this._onCreateAccount() }}
                dateOfBirth={birthDate}
                onDateBirthChange={this.callbackSelectedBirthDate}
                firstName={firstName}
                onFirstName={(text) => this.setState({ firstName: text })}
                gender={gender}
                onGender={this.onGenderOptions}
                lastName={lastName}
                onLastName={(text) => this.setState({ lastName: text })}
                phone={phone}
                onPhone={(text) => this.setState({ phone: text.replace(/[^0-9]/g, '') })}
                place={place}
                onPlace={this._onSelectLocation}
                email={email}
                onEmail={(text) => this.setState({ email: text })}
            />
        )
    }
}
