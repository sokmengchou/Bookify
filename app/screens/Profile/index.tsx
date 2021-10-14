import useScreenFocus, { IStatus } from 'hooks/useScreenFocus'
import { inject, observer } from 'mobx-react'
import React, { Component, useEffect } from 'react'
import { NavigationV5Props } from 'routes/RouteFun'
import { AuthStore } from 'stores/auth.store'
import { BookStore } from 'stores/book.store'
import ProfileScreen from './ProfileScreen'

interface Props extends NavigationV5Props {
  auth: AuthStore
  focus: IStatus
  book: BookStore
}

interface State {

}

@inject('auth', 'book')
@observer
export default class ProfileContainer extends Component<Props, State> {

  componentDidMount() {
    const { user } = this.props.auth
    if (user) {
      this.props.book.fetchAmountOfReadBook(false, user.uid)
    }
    // const { account } = this.props.auth
    // console.log('account :>> ', account);
    // if (!account) {
    //   this.props.navigation.navigate('FILL_UP_INFO')
    // }
  }

  _onSignOut = () => {
    this.props.auth.signOut()
  }

  _onFavorite = () => {
    this.props.navigation.navigate("LIST_AUDIO", { fromProfile: true, fromProfileType: "MY_AUDIO", title: "My Favorite" })

  }

  _onHistory = () => {
    this.props.navigation.navigate("LIST_AUDIO", { fromProfile: true, fromProfileType: "HISTORY", title: "History" })
  }

  render() {
    const { account } = this.props.auth
    const { numberOfReadBook } = this.props.book
    return (
      <ProfileScreen
        onPressEdit={() => this.props.navigation.navigate('EDIT_INFO', { prevScreen: "PROFILE" })}
        onLogOut={() => this._onSignOut()}
        account={account}
        onFavorite={() => this._onFavorite()}
        onHistory={() => this._onHistory()}
        numberOfReadBook={numberOfReadBook}
      />
    )
  }
}
