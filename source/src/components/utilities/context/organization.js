import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const initialState = {
    loading: false,
    organizations: [],
    selectedOrganization: undefined
};

const OrganizationContext = createContext(initialState);

const useOrganizationContext = () => {
    return useContext(OrganizationContext);
}

const OrganizationContextProvider = ({ children }) => {

    const { loading, getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState(initialState);

    const setOrganization = (organization) => {

        let newState = { ...state, selectedOrganization: organization };

        setState(newState);
    }

    const fetchOrganizations = async () => {
        try {
            setState({ ...state, loading: true });

            const accessToken = await getAccessTokenSilently({
                audience: `https://api.skewly.io/`
            });

            const url = `https://api.skewly.io/access/organizations/`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { results } = await response.json();

            // Should ensure that existing selections are still in the organizations array
            let selectedOrganization = state.selectedOrganization

            if (selectedOrganization !== undefined) {

                let matches = results.filter(org => org.id === selectedOrganization?.id);

                if (matches.length > 0) {
                    selectedOrganization = matches[0];
                }
            } else {
                if (results.length > 0) {
                    selectedOrganization = results[0];
                }
            }

            setState({ loading: false, organizations: results, selectedOrganization: selectedOrganization });
        } catch (e) {
            console.log(e.message);
        }
    }

    const addOrganization = async (organizationName) => {

        let organization = {
            name: organizationName
        };

        try {
            setState({ ...state, loading: true });

            const accessToken = await getAccessTokenSilently({
                audience: `https://api.skewly.io/`
            });

            const url = `https://api.skewly.io/access/organizations/`;

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(organization),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const createdOrganization = await response.json();

            let orgs = state.organizations;
            orgs.push(createdOrganization);

            setState({ ...state, loading: false, organizations: orgs, selectedOrganization: createdOrganization });

        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => {
        fetchOrganizations();
    }, [getAccessTokenSilently]);

    if (loading) {
        return (
            <span>Loading...</span>
        );
    }

    return (
        <OrganizationContext.Provider value={{ ...state, refetch: fetchOrganizations, setOrganization, addOrganization }}>
            {children}
        </OrganizationContext.Provider>
    );
}

export { useOrganizationContext, OrganizationContextProvider };