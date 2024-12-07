import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flight.css';

const FlightSearch = () => {
  const [airports, setAirports] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedAirport, setSelectedAirport] = useState<any | null>(null); // State for selected airport
  const [flightDetails, setFlightDetails] = useState<any | null>(null); // State for flight details

  const searchAirports = async (query: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${query}&locale=en-US`,
        {
          headers: {
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            'x-rapidapi-key': '2939c44888mshcc32b7d45a5c305p125171jsn43425e8c97cd',
          },
        }
      );
      setAirports(response.data.data);
    } catch (err) {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const fetchFlightDetails = async (origin: string, destination: string, date: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails?legs=[{"origin":"${origin}","destination":"${destination}","date":"${date}"}]&adults=1&currency=USD&locale=en-US&market=en-US&countryCode=US`,
        {
          headers: {
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            'x-rapidapi-key': '2939c44888mshcc32b7d45a5c305p125171jsn43425e8c97cd',
          },
        }
      );
      console.log('Flight Details Response:', response.data); // Log the response to check its structure
      setFlightDetails(response.data.data);
    } catch (err) {
      setError('Error fetching flight details');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchQuery.length >= 3) {
      searchAirports(searchQuery);
    } else {
      setAirports([]);
    }
  }, [searchQuery]);

  const handleAirportClick = (airportCode: string) => {
    // Set the selected airport and fetch the flight details
    setSelectedAirport(airportCode);
    fetchFlightDetails(airportCode, 'LON', '2024-04-11'); // Sample destination and date
  };

  return (
    <div className="header flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Airport Details */}
        <div className="space-y-4">
          {airports.length > 0 && (
            <ul className="space-y-4">
              {airports.map((airport) => (
                <li
                  key={airport.entityId}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition-all cursor-pointer"
                  onClick={() => handleAirportClick(airport.presentation.title)} // Assuming title is the airport code
                >
                  <h2 className="text-lg font-semibold text-gray-800">{airport.presentation.title}</h2>
                  <p className="text-gray-600">{airport.presentation.subtitle}</p>
                </li>
              ))}
            </ul>
          )}
          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>

        {/* Right Side - Search Box */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Flight Search</h1>
          <input
            type="text"
            placeholder="Search for airports..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />
          {loading && <p className="text-gray-500 text-center">Loading...</p>}
        </div>
      </div>

      {/* Flight Details Section */}
      {flightDetails && (
        <div className="flight-details mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Flight Details</h2>
          {/* Render the flight details here */}
          {flightDetails ? (
            <div>
              <pre className="text-gray-600">{JSON.stringify(flightDetails, null, 2)}</pre>
            </div>
          ) : (
            <p>No flight details available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
