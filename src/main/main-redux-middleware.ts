/* eslint global-require: off */
// utility to plug redux functions onto main ipc
// this adds the subscribe and dispatch messages
import { IpcMain } from 'electron'
import type { Store } from 'redux'
import mainWindow from 'main/main-window/main-window'
import tray from 'main/tray/tray'

type MainReduxMiddleware = {
	<S extends Store>(ipcMain: IpcMain, store: S): { unsubscribe: () => void }
}

const mainReduxMiddleware: MainReduxMiddleware = (ipcMain, store) => {
	mainWindow.setDispatch(store.dispatch)
	tray.setDispatch(store.dispatch)
	tray.setState(store.getState())

	ipcMain.on('dispatch', (_, action: Parameters<typeof store.dispatch>[0]) =>
		store.dispatch(action),
	)

	const unsubscribe = store.subscribe(() => {
		const state = store.getState()
		tray.setState(state)
		ipcMain.emit('subscribe', state)
	})

	return { unsubscribe }
}

export default mainReduxMiddleware
