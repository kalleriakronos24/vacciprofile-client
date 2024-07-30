import React, { useState, useEffect } from 'react';
import './App.scss';
import './assets/animations/animations.css';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import InformationView from './components/InformationView.js';
import AlphabetsNavigation from './components/AlphabetsNavigation.js';

import manufacturers from './assets/data/manufacturers.json';
import viruses from './assets/data/viruses.json';
import vaccines from './assets/data/vaccines.json';
import scientificNames from './assets/scientificNames';

/**
 * Main application component for the vaccine profile page.
 *
 * @component
 *
 * @description 
 * This is the main component of the vaccine profile application. It manages the state of selected items, 
 * handles user interactions, and renders the Header, Sidebar, InformationView, and AlphabetsNavigation components.
 *
 * @returns {JSX.Element} The main application component containing all sub-components and logic.
 *
 * @example
 * // Example usage of App component
 * <App />
 */

const App = () => {
    const [activeFilters, setActiveFilters] = useState({
        firstAlphabet: '',
        searchKeyword: ''
    })
    const [selectedVirus, setSelectedVirus] = useState({});
    const [selectedVaccine, setSelectedVaccine] = useState({});
    const [selectedManufacturer, setSelectedManufacturer] = useState({});
    const [selectedAccreditation, setSelectedAccreditation] = useState("")
    const [detailsType, setDetailsType] = useState("");
    const [manufacturersList, setManufacturersList] = useState(manufacturers);
    const [changedFrom, setChangedFrom] = useState('');

    /**
     * Handles the search input change.
     *
     * @param {string} keyword - The search keyword.
     */

    const handleSearch = keyword => {
        setActiveFilters({...activeFilters, 
            searchKeyword: keyword
        })
    };

    /**
     * Handles selecting a virus.
     *
     * @param {object} virus - The selected virus object.
     */

    const handleSelectVirus = virus => {
        const vaccine = vaccines.find(vaccine => vaccine.vaccineId === virus.vaccines[0].vaccineId);
        setSelectedVaccine(vaccine);
        setSelectedVirus(virus);
        setDetailsType("Virus");
        setActiveFilters({...activeFilters, firstAlphabet: ''});
    };

    /**
     * Handles selecting a vaccine.
     *
     * @param {object} vx - The selected vaccine object.
     */

    const handleSelectVaccine = vx => {
        const vaccine = vaccines.find(vaccine => vaccine.name === vx.name);
        setSelectedVaccine(vaccine);
        setDetailsType("Vaccine");
    };

    /**
     * Handles selecting a manufacturer.
     *
     * @param {object} manufacturer - The selected manufacturer object.
     */

    const handleSelectManufacturer = manufacturer => {
        setSelectedManufacturer(manufacturer);
        setDetailsType("Manufacturer");
    };

    /**
     * Handles selecting an accreditation.
     *
     * @param {string} accreditation - The selected accreditation.
     */

    const handleSelectAccreditation = accreditation => {
        setSelectedAccreditation(accreditation);
        setDetailsType("Accreditation");
    }

    /**
     * Retrieves a vaccine by its ID.
     *
     * @param {string} vaccineId - The ID of the vaccine.
     * @returns {object} The vaccine object.
     */

    const getVaccineById = vaccineId => {
        return vaccines.find(vaccine => vaccine.vaccineId === vaccineId);
    };

    /**
     * Retrieves the virus associated with a vaccine.
     *
     * @param {object} vaccine - The vaccine object.
     * @returns {object} The virus object.
     */

    const getVirusByVaccine = vaccine => {
        return viruses.find(virus => virus.virusId === vaccine.virusId);
    };

     /**
     * Retrieves the countries associated with a vaccine.
     *
     * @param {object} vx - The vaccine object.
     * @returns {string} Comma-separated list of countries.
     */

    const getCountriesByVaccine = vx => {
        const vaccine = getVaccineById(vx.vaccineId);
        return vaccine.countries.join(', ');
    };    

    /**
     * Retrieves the recommendation associated with a vaccine.
     *
     * @param {object} vx - The vaccine object.
     * @returns {string} The recommendation.
     */

    const getRecommendationByVaccine = vx => {
        return vx.recommendation;
    };

    /**
     * Retrieves vaccines by accreditation.
     *
     * @returns {Array} List of vaccines with the selected accreditation.
     */

    const getVaccinesByAccreditation = () => {
        return vaccines.filter(vaccine => vaccine.accreditation.includes(selectedAccreditation));
    }

    /**
     * Retrieves vaccines by manufacturer.
     *
     * @returns {Array} List of vaccines from the selected manufacturer.
     */

    const getVaccinesByManufacturer = () => {
        return vaccines.filter(vaccine => vaccine.manufacturerId === selectedManufacturer.manufacturerId);
    }

     /**
     * Converts camel case strings to readable format.
     *
     * @param {string} string - The camel case string.
     * @returns {string} The readable string.
     */

    const convertCamelCaseToReadable = string => {
        return string==="ceo" ? "CEO" : string.replace(/([A-Z])/g, ' $1')
    };

    /**
     * Italizes scientific names in a given text.
     *
     * @param {string} text - The text containing scientific names.
     * @returns {JSX.Element} The text with scientific names italicized.
     */

    const italizeScientificNames = text => {
        const parts = text.split(new RegExp(`(${scientificNames.join('|')})`, 'gi'));
    
        return (
            <span>
                {parts.map((part, index) => {
                    const isScientificName = part && scientificNames.some(name => name.toLowerCase() === part.toLowerCase());
                    return isScientificName ? (
                        <i key={index}>{part}</i>
                    ) : (
                        part
                    );
                })}
            </span>
        );
    };

    useEffect(() => {
        const filterManufacturersList = () => {
            let filteredManufacturersList;
            if (activeFilters.searchKeyword) {
                filteredManufacturersList = manufacturers.filter(manufacturer =>
                    manufacturer.name.toLowerCase().includes(activeFilters.searchKeyword.toLowerCase()) ||
                    manufacturer.description.toLowerCase().includes(activeFilters.searchKeyword.toLowerCase())
                );
            } else {
                filteredManufacturersList = manufacturers;
            }

            if (activeFilters.firstAlphabet) {
                filteredManufacturersList = filteredManufacturersList.filter(manufacturer =>
                    manufacturer.name.startsWith(activeFilters.firstAlphabet)
                );
            }
            setManufacturersList(filteredManufacturersList);
        };

        filterManufacturersList();
    }, [activeFilters]);
    
    return (
        <div className='vacciprofile-page'>
            <div className='container'>
                <Header/>
                <div className='row py-4'>
                    <Sidebar
                        manufacturersList={manufacturersList}
                        selectedManufacturer={selectedManufacturer}
                        setSelectedManufacturer={setSelectedManufacturer}
                        handleSelectManufacturer={handleSelectManufacturer}
                        handleSearch={handleSearch}
                        setChangedFrom={setChangedFrom}
                        changedFrom={changedFrom}
                        setDetailsType={setDetailsType}
                    />
                    <InformationView
                        activeFilters={activeFilters}
                        setActiveFilters={setActiveFilters}
                        manufacturersList={manufacturersList}
                        selectedVirus={selectedVirus}
                        selectedVaccine={selectedVaccine}
                        selectedManufacturer={selectedManufacturer}
                        selectedAccreditation={selectedAccreditation}
                        detailsType={detailsType}
                        handleSelectVirus={handleSelectVirus}
                        handleSelectVaccine={handleSelectVaccine}
                        handleSelectManufacturer={handleSelectManufacturer}
                        handleSelectAccreditation={handleSelectAccreditation}
                        getVirusByVaccine={getVirusByVaccine}
                        getCountriesByVaccine={getCountriesByVaccine}
                        getVaccinesByManufacturer={getVaccinesByManufacturer}
                        getVaccinesByAccreditation={getVaccinesByAccreditation}
                        getRecommendationByVaccine={getRecommendationByVaccine}
                        italizeScientificNames={italizeScientificNames}
                        convertCamelCaseToReadable={convertCamelCaseToReadable}
                        changedFrom={changedFrom}
                    />
                    <AlphabetsNavigation 
                        activeFilters={activeFilters} 
                        setActiveFilters={setActiveFilters}
                        setSelectedManufacturer={setSelectedManufacturer}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
