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

    const { loading, user, getAccessTokenSilently } = useAuth0();
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

            const userDetailsByIdUrl = `https://api.skewly.io/access/organizations/`;

            const response = await fetch(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const data = await response.json();

            // Should ensure that existing selections are still in the organizations array
            let selectedOrganization = state.selectedOrganization

            if (selectedOrganization !== undefined) {

                let matches = data.filter(org => org.id === selectedOrganization?.id);

                if (matches.length > 0) {
                    selectedOrganization = matches[0];
                }
            } else {
                if (data.length > 0) {
                    selectedOrganization = data[0];
                }
            }

            setState({ loading: false, organizations: data, selectedOrganization: selectedOrganization });
        } catch (e) {
            console.log(e.message);
        }
    }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    const addOrganization = (organizationName) => {

        let organization = {
            name: organizationName,
            subscription: 'free'
        };

        // simulate PUT operation
        organization.id = uuidv4();

        // simulate GET operation
        let orgs = state.organizations;
        orgs.push(organization);

        setState({ ...state, organizations: orgs, selectedOrganization: organization });
    }

    useEffect(() => {
        fetchOrganizations();
    }, [getAccessTokenSilently, user?.username]);

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