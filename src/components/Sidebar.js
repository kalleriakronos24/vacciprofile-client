import React from 'react';

/**
 * Sidebar Component
 *
 * A component that displays a sidebar for selecting manufacturers, products, or pathogens. It supports changing the active tab and handling item selection.
 *
 * @component
 * @namespace Sidebar
 * @param {Object} props - The component accepts various props to handle sidebar functionality.
 * @param {string} props.activeTab - The currently active tab, which can be 'Manufacturer', 'Product', or 'Pathogen'.
 * @param {Function} props.setActiveTab - Function to set the type of details to be displayed ('Manufacturer', 'Product', or 'Pathogen').
 * @param {Array} props.sidebarList - List of items (manufacturers, products, or pathogens) available for selection.
 * @param {Object} props.selectedVaccine - The currently selected product (vaccine).
 * @param {Object} props.selectedPathogen - The currently selected pathogen.
 * @param {Object} props.selectedManufacturer - The currently selected manufacturer.
 * @param {Function} props.setSelectedVaccine - Function to update the selected product (vaccine).
 * @param {Function} props.setSelectedPathogen - Function to update the selected pathogen.
 * @param {Function} props.setSelectedManufacturer - Function to update the selected manufacturer.
 * @param {Function} props.setChangedFrom - Function to set the source of the change triggering the view update.
 * @returns {JSX.Element} The Sidebar component for selecting items and updating the view based on the active tab.
 *
 * @example
 * // Example usage of Sidebar component
 * <Sidebar 
 *    activeTab="Manufacturer"
 *    setActiveTab={(type) => console.log(type)}
 *    sidebarList={[{ name: 'ItemA' }, { name: 'ItemB' }]}
 *    selectedManufacturer={{ name: 'ItemA' }}
 *    selectedVaccine={{ name: 'ItemB' }}
 *    selectedPathogen={{ name: 'ItemC' }}
 *    setSelectedManufacturer={(item) => console.log(item)}
 *    setSelectedVaccine={(item) => console.log(item)}
 *    setSelectedPathogen={(item) => console.log(item)}
 *    setChangedFrom={(source) => console.log(source)}
 * />
 */

const Sidebar = ({ 
    activeTab,
    setActiveTab,
    sidebarList = [],
    selectedVaccine,
    selectedPathogen,
    selectedManufacturer,
    setSelectedVaccine,
    setSelectedPathogen,
    setSelectedManufacturer, 
    setChangedFrom
}) => {
    
    /**
     * Handles the click events for sidebar items based on the active tab.
     * It selects or unselects an item depending on the current selection state.
     * The behavior varies depending on whether the item belongs to the Manufacturer, Product, or Pathogen tab.
     *
     * @param {Object} item - The item object that is clicked.
     */
    const handleClickSidebar = item => {
        // Slide Left Animation
        setChangedFrom('Sidebar');
    
        setTimeout(() => {
            if (activeTab === 'Manufacturer') {
                if (item !== selectedManufacturer) {
                    setSelectedManufacturer(item);
                    setActiveTab('Manufacturer');
                } else {
                    setSelectedManufacturer({});
                }
            } else if (activeTab === 'Product') {
                if (item !== selectedVaccine) {
                    setSelectedVaccine(item);
                    setActiveTab('Product');
                } else {
                    setSelectedVaccine({});
                }
            } else if (activeTab === 'Pathogen') {
                if (item !== selectedPathogen) {
                    setSelectedPathogen(item);
                    setActiveTab('Pathogen');
                } else {
                    setSelectedPathogen({});
                }
            }
            
            setChangedFrom('');
        }, 0);
    };
    

    return <div className='sidebar col-6 col-sm-4 col-lg-3 ps-1 pe-3 slide-right'>
        <div className='Manufacturer-list 2'>
        {sidebarList
            .slice() 
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item, i) => (
                <div 
                    key={i} 
                    className={`sidebar-item bg-light text-dark rounded-3 py-1 mt-1 ${
                        activeTab === 'Manufacturer' && selectedManufacturer === item ? 'active' :
                        activeTab === 'Product' && selectedVaccine === item ? 'active' :
                        activeTab === 'Pathogen' && selectedPathogen === item ? 'active' : 'inactive'
                    }`} 
                    onClick={() => handleClickSidebar(item)}
                >
            {item.name}
                </div>
            ))
        }
        </div>
    </div>
}

export default Sidebar;