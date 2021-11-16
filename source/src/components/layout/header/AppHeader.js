import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { useAuth0 } from '@auth0/auth0-react';

import { useOrganizationContext } from '../../utilities/context/organization';

const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
}

const AppHeader = () => {

    const { isAuthenticated } = useAuth0();
    const [showMobileNavigation, setShowMobileNavigation] = useState(false);

    if (isAuthenticated !== true) {
        return null;
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" onClick={() => setShowMobileNavigation(!showMobileNavigation)}>
                            <span className="sr-only">Open main menu</span>
                            {showMobileNavigation ?
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>

                                :
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            }
                        </button>
                    </div>
                    <div className="flex-1 flex items-stretch justify-between">
                        <div className="flex-none flex items-center">
                            <span className="hidden">Application Name / Logo goes here.</span>
                        </div>
                        <div className="flex-grow flex items-center">
                            <Link to="organizations" className="text-base font-medium text-gray-300 hover:text-white">Organizations</Link>
                        </div>
                        <div className="flex-none flex items-center">
                            <OrganizationSelector />
                        </div>
                    </div>
                </div>
            </div>
            {showMobileNavigation &&
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <a href="#" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>

                        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>

                        <button className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</button>
                    </div>
                </div>
            }
        </nav>
    );
}

const OrganizationSelector = () => {

    const { loading, organizations, selectedOrganization, setOrganization } = useOrganizationContext();

    const onSelected = (selected) => {
        setOrganization(selected);
    }

    if (loading) {
        return (
            <span>Loading...</span>
        );
    }

    return (
        <div className="flex items-center justify-center">
            {selectedOrganization !== undefined ?
                <Listbox value={selectedOrganization} onChange={onSelected}>
                    {({ open }) => (
                        <>
                            <Listbox.Label className="block text-sm font-medium text-gray-300 mr-3"><i className="fas fa-sitemap" /><span className="sr-only">Organization Selector</span></Listbox.Label>
                            <div className="mt-1 relative">
                                <Listbox.Button className="relative w-full bg-gray-900 border border-gray-500 text-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <span className="flex items-center">
                                        <span className="block truncate">{selectedOrganization?.name ?? 'Choose Organization'}</span>
                                    </span>
                                    <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <i className="fas fa-sort" aria-hidden="true" />
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    show={open}
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-gray-900 shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                        {organizations && organizations.map((organization) => (
                                            <Listbox.Option
                                                key={organization.id}
                                                className={({ active }) =>
                                                    classNames(
                                                        active ? 'text-white bg-indigo-600' : 'text-white',
                                                        'cursor-default select-none relative py-2 pl-3 pr-9'
                                                    )
                                                }
                                                value={organization}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <div className="flex items-center">
                                                            <span
                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}
                                                            >
                                                                {organization.name}
                                                            </span>
                                                        </div>
                                                        {selected ? (
                                                            <span
                                                                className={classNames(
                                                                    active ? 'text-white' : 'text-indigo-600',
                                                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <i className="fas fa-check" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </>
                    )}
                </Listbox>
                :
                <Link to="organization" className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">Create an Organization</Link>
            }
        </div>
    )
}

export default AppHeader;