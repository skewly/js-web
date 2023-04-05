import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useOrganizationContext } from '../components/utilities/context/organization';

const Route = () => {

    const { organizations, selectedOrganization, addOrganization } = useOrganizationContext();
    const [name, setName] = useState('');

    const onCreate = () => {
        addOrganization(name);
        setName('');
    }

    return (
        <div className="grid-container grid grid-cols-3 gap-x-6">
            <div className="col-span-3 pt-6">
                <h2 className="text-2xl font-medium leading-6 text-gray-900">Organizations</h2>
                <p className="mt-2 text-sm text-gray-600">Manage your organization(s). Configure access for users, change your subscription, and generate API keys etc.</p>
            </div>
            <div className="col-span-3 lg:col-span-2 pt-6">
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Active
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Name / ID
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Subscription
                                            </th>
                                            <th scope="col" className="relative px-6 py-3">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {organizations.map((organization) => (
                                            <tr key={organization.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    {organization.id === selectedOrganization.id &&
                                                        <i className="fas fa-check" />
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex flex-wrap items-center">
                                                        <div className="text-sm font-medium text-gray-900 mr-3">{organization.name}</div>
                                                        <div className="text-xs text-gray-500">{organization.id}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {organization.subscription}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link to={organization.id} className="text-indigo-600 hover:text-indigo-900">
                                                        Manage
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-3 lg:col-span-1 pt-6">
                <div className="inline-block w-full p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Create Organization
                    </h3>
                    <div className="mt-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" for="name">
                            Name
                        </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                            onClick={() => onCreate()}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Route;