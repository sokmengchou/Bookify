import { inject, observer } from 'mobx-react'
import React from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import LoginContainer from 'screens/Auth/Login'
import { AuthStore } from 'stores/auth.store'
import ProfileContainer from './index'

interface Props extends NavigationV5Props {
    auth: AuthStore
}

const ProfileController = ({ auth, ...props }: Props) => {

    if (!auth.user) return React.createElement(LoginContainer, props as any)
    else return React.createElement(ProfileContainer, props as any)
}

export default inject('auth')(observer(ProfileController))