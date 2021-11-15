import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

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
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="hidden">Application Name / Logo goes here.</span>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
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

    const { loading, isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const getOrganizationsForUser = async () => {
            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://api.skewly.io/`
                });

                const userDetailsByIdUrl = `https://api.skewly.io/access/organizations/`;

                const response = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                console.log(response);

                const data = await response.json();

                console.log(data);

                setOrganizations(data);
            } catch (e) {
                console.log(e.message);
            }
        };

        getOrganizationsForUser();
    }, [getAccessTokenSilently, user?.username]);

    if (loading) {
        return (
            <span>Loading...</span>
        );
    }

    return (isAuthenticated && (
        <ul>
            {organizations.map((organization, i) => <li key={i}>{organization.name}</li>)}
            <li><button>Add Organization</button></li>
        </ul>
    ));

}

export default AppHeader;