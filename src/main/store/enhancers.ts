import type { StoreEnhancer } from '@reduxjs/toolkit'
import { devToolsEnhancer } from '@redux-devtools/remote'
import { is } from '@electron-toolkit/utils'

const devTools = devToolsEnhancer({
	port: 3001,
	secure: false,
	realtime: is.dev,
	suppressConnectErrors: true,
	hostname: 'localhost',
})

const enhancers: [StoreEnhancer] = [devTools]

export default enhancers