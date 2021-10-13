import React from 'react'

const RouteContext = React.createContext<any | null>(null)

export const RouteProvider = RouteContext.Provider
export const RouteConsumer = RouteContext.Consumer

export default RouteContext
