import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { IconType } from 'react-icons'
import { RxPlus, RxPencil2, RxMix, RxFile, RxCamera } from 'react-icons/rx'

const links = [
	{ to: '/counter', text: 'counter', icon: RxPlus },
	{ to: '/to-do', text: 'to do', icon: RxPencil2 },
	{ to: '/ui', text: 'ui', icon: RxMix },
	{ to: '/folder', text: 'folder', icon: RxFile },
	{ to: '/dog', text: 'dog', icon: RxCamera },
	{ to: '/finder', text: 'finder', icon: RxFile },
]

type SidebarLinkProps = {
	to: string
	icon: IconType
	text: ReactNode
}

const SidebarLink = ({ to, icon: Icon, text }: SidebarLinkProps) => {
	const location = useLocation().pathname
	return (
		<Link
			to={to}
			data-current={location === to}
			className='relative group relative lg:w-full mt-0.5 py-2 px-2 h-7 flex items-center justify-center lg:justify-normal lg:rounded hover:bg-slate-6 cursor-pointer data-[current=true]:bg-slate-2'
		>
			<Icon className='icon-size text-sm text-slate-11 group-hover:text-slate-12' />
			<span className='hidden lg:block ml-2 text-slate-12'>{text}</span>
		</Link>
	)
}

const Sidebar = () => (
	<div className='inset-0 relative flex flex-col flex-shrink-0 lg:w-56 font-sans text-sm border-r border-slate-6 dark:border-slate-1 justify-items-start'>
		<div className='drag-region sticky top-0 flex-shrink-0 w-full h-9' />
		<div className='flex flex-col flex-grow-0 flex-shrink-0 py-1 px-5 lg:px-4'>
			<Link to='/' className='group flex items-center justify-between rounded hover:bg-slate-2'>
				<div className='flex items-center p-2'>
					<div className='flex text-sm items-center justify-center rounded-sm w-6 h-6 p-0.5 text-white bg-indigo-10 lg:x2.5'>
						<img src='/images/logo.svg' />
					</div>
					<div className='group-hover:text-slate-12 text-sm font-medium hidden lg:block ml-2'>
						redux-electron
					</div>
				</div>
			</Link>
		</div>

		<div className='flex flex-col flex-shrink flex-grow overflow-y-auto mb-0.5 lg:px-4 lg:py-2'>
			{links.map(x => (
				<SidebarLink key={x.to} {...x} />
			))}
		</div>
	</div>
)

export default Sidebar
