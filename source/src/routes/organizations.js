import React, { useState } from 'react';

import { useOrganizationContext } from '../components/utilities/context/organization';

const Route = () => {

    const { addOrganization } = useOrganizationContext();
    const [name, setName] = useState('');

    const onCreate = () => {
        addOrganization(name);
        setName('');
    }

    return (
        <div className="grid-container grid grid-cols-5">
            <div className="col-span-4">
                Manage Organization(s)
            </div>
            <div className="col-span-1">
                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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