import React, { useState } from 'react';
import immich_logo from '../resources/immich_logo.png';
import google_photos_logo from '../resources/google_photos_logo.png'
import FileUpload from './FileUpload';

function InteractiveForm() {
    const [step, setStep] = useState(0);
    const [error, setError] = useState(null);
    const [years, setYears] = useState(null);
    
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData
    // }

    const chooseGooglePhotos = () => {
        setStep(1);
    };
    const chooseImmich = () => {
        setStep(2);
    };
    const upload = () => {
        setStep(2);
    };
    const backToStart = () => {
        setStep(0);
    };

    const handleImmichSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        let data = {}
        formData.forEach((value, key) => data[key] = value);
        console.log(data);

        fetch("/api/immich/initial", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
      .then((response) => {
        console.log(response.statusText);
        if (response.ok) return response.json();
        else return response.text().then(text => { throw new Error(text); })
      }).then((data) => {
            console.log("Good")
            console.log(data);
            setError(null);
            setYears(data);

            setStep(4);
      }).catch((error) => {
            setError(error);
        });
    };

    const handleGoogleSubmit = (e) => {
        e.preventDefault();
        setStep(4);
    };

    const handleYearSelection = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            {error && (
                <>
                <div className="border-l-4 text-red-700 p-2 border-red-500 bg-red-100 mb-2" role="alert">
                    <p className="font-bold">Error</p>
                    <p>{error.message}</p>
                </div>
                </>
            )}

            {step == 0 && (
                <>
                    <h1>Choose Your Photo Hosting Provider</h1>
                    <button type="button" className="text-white bg-[#3b5998] focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 cursor-pointer" onClick={chooseGooglePhotos}>
                        <img src={google_photos_logo} className="w-10 pr-2" />
                        Google Photos
                    </button>
                    <button type="button" className="text-white bg-[#3b5998] focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 cursor-pointer" onClick={chooseImmich}>
                        <img src={immich_logo} className="w-10 pr-2" />
                        Immich
                    </button>
                </>
            )}

            {step == 1 && (
                <>
                    Google Photos
                    <ol className="list-decimal">
                        <li>Navigate to <a href="https://takeout.google.com" target="_blank">Google Takeout</a></li>
                        <li>Click Deselect All</li>
                        <li>Scroll down until you see Google Photos and check it</li>
                        <li>Click Next Step and choose .zip as File Type and 2GB as File Size</li>
                        <li>Click Create Export and wait until you receive an email</li>
                        <li>Download the files from the email to your computer and upload all of them to the form below</li>
                    </ol>
                    <FileUpload/>
                    <button type="button" className="text-white bg-[#3b5998] focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 cursor-pointer" onClick={backToStart}>Back</button>
                </>
            )}

            {step == 2 && (
                <>
                    Immich
                    <ol className="list-decimal">
                        <li>Navigate to your installation of Immich</li>
                        <li>Go to Account Settings &gt; API Keys &gt; New API Key</li>
                        <li>Select <span className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto langauge-html">asset.read</span> permission and click Create</li>
                        <li>Enter your Immich base URL and API Key as the Token below</li>
                        <li>Delete API Key when done</li>
                    </ol>
                    <form onSubmit={handleImmichSubmit} className="flex justify-center items-center">
                        <div className="w-64 border border-gray-300 p-4 rounded">
                            <div>
                                <label htmlFor="baseUrl">Base URL</label>
                                <input type="text" id="baseUrl" name="baseUrl" className="w-full border border-gray-300 rounded p-2"></input>
                            </div>
                            <div>
                                <label htmlFor="token">Token</label>
                                <input type="text" id="token" name="token" className="w-full border border-gray-300 rounded p-2"></input>
                            </div>
                            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Submit
                            </button>
                        </div>
                    </form>
                    <button type="button" className="text-white bg-[#3b5998] focus:outline-none font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 cursor-pointer" onClick={backToStart}>Back</button>
                </>
            )}

            {step == 3 && (
                <>
                    Loading...
                </>
            )}

            {step == 4 && (
                <>
                    <form onSubmit={handleYearSelection} className="flex justify-center items-center">
                        <div className="w-64 border border-gray-300 p-4 rounded">
                            <div>
                                <label htmlFor="year">What year do you want your Media Travel Recap to be for?</label>
                                <select id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    {years.map(year => <option value="{year}">{year}</option>)}
                                </select>
                            </div>
                            <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                                Submit
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}

export default InteractiveForm;