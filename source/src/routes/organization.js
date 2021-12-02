import React from 'react';
import { useParams, Link } from "react-router-dom";
import { Tab } from '@headlessui/react';

import { useOrganizationContext } from '../components/utilities/context/organization';

const Route = () => {

    const { id } = useParams();
    const { organizations = [] } = useOrganizationContext();

    const organization = organizations.find(o => o.id === id);

    return (
        <div className="grid-container grid grid-cols-4 gap-x-6">
            {organization &&
                <div className="col-span-4 mt-6">
                    <nav className="flex items-center text-gray-500 text-sm sm:space-x-2 whitespace-nowrap mb-6">
                        <Link to="/organizations" className="hidden sm:block hover:text-gray-900">
                            Organizations
                        </Link>
                        <i className="fas fa-chevron-right hidden sm:block flex-none text-gray-300" />
                        <span class="hidden sm:block hover:text-gray-900">
                            {organization.name}
                        </span>
                    </nav>
                    <p className="mb-1 text-sm text-gray-500">{organization.id}</p>
                    <h2 className="text-2xl font-medium leading-6 text-gray-900">{organization.name}</h2>
                </div>
            }
            <Tab.Group vertical>
                <Tab.List as="nav" className="col-span-4 mt-9 lg:col-span-1 shadow overflow-hidden divide-y divide-gray-200 border-b border-gray-200 sm:rounded-lg">
                    <Tab className="block p-3 min-w-full text-left">Access</Tab>
                    <Tab className="block p-3 min-w-full text-left">Keys</Tab>
                    <Tab className="block p-3 min-w-full text-left">Subscription</Tab>
                    <Tab className="block p-3 min-w-full text-left">Settings</Tab>
                </Tab.List>
                <Tab.Panels as="div" className="col-span-4 mt-9 lg:col-span-3">
                    <Tab.Panel>Access</Tab.Panel>
                    <Tab.Panel>Keys</Tab.Panel>
                    <Tab.Panel>Subscription</Tab.Panel>
                    <Tab.Panel>Settings</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
}

export default Route;