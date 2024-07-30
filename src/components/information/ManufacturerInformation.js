import React from 'react';

/**
 * ManufacturerInformation Component
 *
 * @component
 * @namespace Manufacturer
 * @param {Object} props - The component accepts selectedManufacturer and convertCamelCaseToReadable as props.
 * @param {Object} props.selectedManufacturer - The manufacturer information object.
 * @param {string} props.selectedManufacturer.name - The name of the manufacturer.
 * @param {string} props.selectedManufacturer.description - The description of the manufacturer.
 * @param {Object} props.selectedManufacturer.information - Additional information about the manufacturer.
 * @param {Object[]} props.selectedManufacturer.information.sources - List of sources related to the manufacturer.
 * @param {Function} props.convertCamelCaseToReadable - Function that converts camel case strings to a readable format.
 * @returns {JSX.Element} The Manufacturer Information component.
 *
 * @example
 * // Render the ManufacturerInformation component with dummy data and function
 * <ManufacturerInformation 
 *   selectedManufacturer={{
 *     name: 'Manufacturer X',
 *     description: 'A leading manufacturer in the industry.',
 *     information: {
 *       type: 'Biotechnology',
 *       country: 'USA',
 *       sources: [
 *         { title: 'Source 1', link: 'http://source1.com', lastUpdated: '2024-01-01' },
 *         { title: 'Source 2', link: 'http://source2.com', lastUpdated: '2024-02-01' }
 *       ]
 *     }
 *   }}
 *   convertCamelCaseToReadable={key => key.replace(/([A-Z])/g, ' $1').toLowerCase()}
 * />
 */

const ManufacturerInformation = ({ 
    selectedManufacturer, 
    convertCamelCaseToReadable
}) => {
    return <div className=''>
    <h4 className='report-heading'>{selectedManufacturer.name}</h4> 
    <p>{selectedManufacturer.description}</p>
    {selectedManufacturer.information ? <><div className='table-responsive'>
        <table className='table table-light w-100 m-0'>
            <thead>
                <tr>
                    <th className='text-center' colSpan={2}>Information</th>
                </tr>
            </thead>
            <tbody>
                {Object.entries(selectedManufacturer.information).map(([attributeKey, attributeValue], index) => {
                    return attributeKey !== "sources" && attributeKey !== "lastUpdated" ? <tr key={index}>
                        <td className='text-center text-capitalize' style={{ width: '50%' }}>{convertCamelCaseToReadable(attributeKey)}</td>
                        <td className='text-center'>{attributeValue}</td>
                    </tr> : <></> ;
                })}
            </tbody>
        </table>
    </div>
    <span className='sources-list'>Source(s): {selectedManufacturer.information.sources.map((source, index)=><span key={index}>
        <a className='manufacturer-table-source' href={`${source.link}`} target="_blank" rel="noopener noreferrer">{source.title}</a>
        <span> ({source.lastUpdated}){selectedManufacturer.information.sources.length>1 && index<selectedManufacturer.information.sources.length-1 ? ', ' : ''}</span></span>)}
    </span></> : <></>}
</div>
}

export default ManufacturerInformation;