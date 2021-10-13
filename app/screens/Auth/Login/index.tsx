import React, { Component } from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import { googleLogin } from 'services/socialAuth.service'
import LoginScreen from './LoginScreen'
import { AuthStore } from 'stores/auth.store';
import { inject, observer } from 'mobx-react';

interface Props extends NavigationV5Props {
    auth: AuthStore

}

interface State {
}
@inject("auth")
@observer
export default class LoginContainer extends Component<Props, State> {
    _onGooglePress = () => {
        googleLogin().then(credential => {
            if (credential) {
                this.props.auth.onSignInWithCredential(credential, (user) => {
                    if (!user) return
                    this.props.auth.checkProfile(user, account => {
                        const { nextScreen, ...params } = this.props?.route?.params || {}
                        if (account) {
                            // this user already create account so move to home or profile screen
                            if (!params) {
                                this.props.navigation.navigate('HOME_STACK')
                            } else {
                                this.props.navigation.navigate(nextScreen, params)
                            }
                        } else {
                            // this user not yet create account so move to create account
                            this.props.navigation.navigate('FILL_UP_INFO')

                        }
                    })
                    // if (user.khmer_first_name && user.khmer_last_name) {
                    //     const { navigationTo, selectedSubject, selectedClass } = this.props.route?.params || {}
                    //     this.props.navigation.navigate(navigationTo, { isSelection: true, selectedSubject, selectedClass })
                    // } else {
                    //     const { navigationTo, selectedSubject, selectedClass } = this.props.route?.params || {}
                    //     this.props.navigation.navigate("UPDATE_PROFILE", { navigationTo, selectedSubject, selectedClass })
                    // }
                })
            }
        }).catch(e => console.log('e', e))
    }

    render() {


        return (

            <LoginScreen
                goBack={() => this.props.navigation.goBack()}
                onPress={() => this._onGooglePress()}
                // onPress={() => this.props.auth.signOut()}
            />
        )
    }
}
