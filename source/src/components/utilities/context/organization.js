import React, { useState, useEffect, createContext, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const initialState = {
    loading: false,
    organizations: [],
    apikeys: [],
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
                audience: process.env.REACT_APP_AUTH_AUDIENCE
            });

            const url = `${process.env.REACT_APP_API_HOST}organizations/`;

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

            setState({ ...state, loading: false, organizations: results, selectedOrganization: selectedOrganization });
        } catch (e) {
            console.log(e.message);
        }
    }

    const fetchApiKeys = async (organizationId) => {
        try {
            setState({ ...state, loading: true });

            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH_AUDIENCE
            });

            const url = `${process.env.REACT_APP_API_HOST}organizations/${organizationId}/apikeys`;

            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { results } = await response.json();

            setState({ ...state, loading: false, apikeys: results });
        } catch (e) {
            console.log(e.message);
        }
    }

    const addApiKey = async (organizationId) => {

        try {
            setState({ ...state, loading: true });

            const accessToken = await getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH_AUDIENCE
            });

            const url = `${process.env.REACT_APP_API_HOST}organizations/${organizationId}/apikeys/generate`;

            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const createdApiKey = await response.json();

            let apikeys = state.apikeys;
            apikeys.push(createdApiKey);

            setState({ ...state, loading: false, apikeys: apikeys });

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
                audience: process.env.REACT_APP_AUTH_AUDIENCE
            });

            const url = `${process.env.REACT_APP_API_HOST}organizations/`;

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
        <OrganizationContext.Provider value={{ ...state, refetch: fetchOrganizations, setOrganization, addOrganization, fetchApiKeys, addApiKey }}>
            {children}
        </OrganizationContext.Provider>
    );
}

export { useOrganizationContext, OrganizationContextProvider };