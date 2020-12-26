import React from 'react'

const ShowData = ({ showAll }) => {
    if(showAll.length > 11) {
        return (
            <div>
                <p>Too many countries</p>
            </div>
        )
    } else if(showAll.length === 1) {
        const country = showAll[0]
        const languages = country.languages.map(lang =>
            lang['name'])
        return (
            <div>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>languages</h2>
                <ul>
                    {languages.map(lang =>
                        <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flag} alt={`flag of ${country.name}`} height='100' />
            </div>
        )
    } else {
        return (
            <div>
                {showAll.map(country => 
                    <p key={country.alpha2Code}>{country.name}</p>
                )}
            </div>
        )
    }
}

export default ShowData
