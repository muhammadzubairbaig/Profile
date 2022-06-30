import {
    MenuIcon,
} from '@heroicons/react/outline'
import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { routeConstantsService } from '../../Routes/Routes'
import { CogIcon } from '@heroicons/react/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export const Topbar = ({ currentKey, setCurrentKey, children }) => {
    /**
 * @Variables and @Hooks
 */
    const navigate = useNavigate();


    /**
* @Functions
*/
    const onNavActive = (key) => {
        setCurrentKey(key.href);
        navigate(key.href);
    };

    return (
        <>
            <Popover as='header' className='pb-24 bg-gradient-to-r from-sky-800 to-cyan-600'>
                {({ open }) => (
                    <>
                        <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
                            <div className='relative flex flex-wrap items-center justify-end'>
                                <div className='hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5'>
                                    {/* Profile dropdown */}
                                    <Menu as='div' className='relative flex-shrink-0'>
                                        <div>
                                            <Menu.Button className=' flex-shrink-0 p-1 text-cyan-200 rounded-full hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white'>
                                                <CogIcon width={'20px'} />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            leave='transition ease-in duration-75'
                                            leaveFrom='transform opacity-100 scale-100'
                                            leaveTo='transform opacity-0 scale-95'
                                        >
                                            <Menu.Items className='origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                                                {routeConstantsService.navigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <div
                                                                key={item.name}
                                                                onClick={() =>
                                                                    onNavActive(
                                                                        item)
                                                                }
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </div>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>

                                <div className='w-full py-5 lg:border-t lg:border-white lg:border-opacity-20'>
                                    <div className='lg:grid lg:gap-8 lg:items-center'>

                                        <div className='hidden lg:block lg:col-span-2'>
                                            <nav className='flex space-x-4'>
                                                {routeConstantsService.navigation.map((item) => (
                                                    <div
                                                        key={item.name}
                                                        onClick={() =>
                                                            onNavActive(
                                                                item)
                                                        }
                                                        className={classNames(
                                                            item.href === currentKey ? 'text-white border-2' : 'text-cyan-100',
                                                            'cursor-pointer text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                                                        )}>
                                                        {item.name}
                                                    </div>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu button */}
                                <div className='absolute right-0 flex-shrink-0 lg:hidden'>
                                    {/* Mobile menu button */}
                                    <Popover.Button className='bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white'>
                                        {open ? (
                                            <XIcon className='block h-6 w-6' aria-hidden='true' />
                                        ) : (
                                            <MenuIcon className='block h-6 w-6' aria-hidden='true'
                                            />
                                        )}
                                    </Popover.Button>
                                </div>
                            </div>
                        </div>
                        <Transition.Root as={Fragment}>
                            <div className='lg:hidden' >
                                <Transition.Child
                                    as={Fragment}
                                    enter='duration-150 ease-out'
                                    enterFrom='opacity-0'
                                    enterTo='opacity-100'
                                    leave='duration-150 ease-in'
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                >
                                    <Popover.Overlay className='z-20 fixed inset-0 bg-black bg-opacity-25' />
                                </Transition.Child>

                                <Transition.Child
                                    as={Fragment}
                                    enter='duration-150 ease-out'
                                    enterFrom='opacity-0 scale-95'
                                    enterTo='opacity-100 scale-100'
                                    leave='duration-150 ease-in'
                                    leaveFrom='opacity-100 scale-100'
                                    leaveTo='opacity-0 scale-95'
                                >
                                    <Popover.Panel
                                        focus
                                        className='z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top'
                                    >
                                        <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200'>
                                            <div className='pt-3 pb-2'>
                                                <div className='flex items-center justify-between px-4'>
                                                    <div>
                                                        <img
                                                            className='h-8 w-auto'
                                                            src='https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg'
                                                            alt='Workflow'
                                                        />
                                                    </div>
                                                    <div className='-mr-2'>
                                                        <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500'>
                                                            <XIcon className='h-6 w-6' aria-hidden='true' />
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                                <div className='mt-3 px-2 space-y-1'>
                                                    {routeConstantsService.navigation.map((item) => (
                                                        <div
                                                            key={item.name}
                                                            onClick={() =>
                                                                onNavActive(
                                                                    item)
                                                            }
                                                            className='cursor-pointer block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800'
                                                        >
                                                            {item.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Popover.Panel>
                                </Transition.Child>
                            </div>
                        </Transition.Root>
                    </>
                )}
            </Popover>
            {/* Here we are passing a children components */}
            {children}

        </>
    )
}
