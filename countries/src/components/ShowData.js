import React from 'react'
import Weather from './Weather'

const showInfo = (props) => {
    const langs = props.languages.map(lang => lang.name)
    alert(`${props.name}\ncapital ${props.capital}\npopulation ${props.population}\nlanguages ${langs}`)
}

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
                <h3>languages</h3>
                <ul>
                    {languages.map(lang =>
                        <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flag} alt={`flag of ${country.name}`} height='100' />
                <Weather country={country} />
            </div>
        )
    } else {
        return (
            <div>
                {showAll.map(country => 
                    <p key={country.alpha2Code}>
                        {country.name}
                        <button type='submit' key={country.alpha3Code} onClick={() => showInfo(country)}>
                            show
                        </button>
                    </p>
                )}
            </div>
        )
    }
}

export default ShowData
