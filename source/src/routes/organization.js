import React from 'react';
import { useParams, Link, Outlet } from "react-router-dom";

import { useOrganizationContext } from '../components/utilities/context/organization';

const Route = () => {

    const { id } = useParams();
    const { organizations = [] } = useOrganizationContext();

    const organization = organizations.find(o => o.id === id);

    return (
        <div className="grid-container grid grid-cols-3 gap-x-6">
            {organization &&
                <div className="col-span-3 pt-6">
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
            <div className="col-span-3 lg:col-span-1 pt-6">
                NAV
            </div>
            <div className="col-span-3 lg:col-span-2 pt-6">
                <Outlet />
            </div>
        </div>
    );
}

export default Route;