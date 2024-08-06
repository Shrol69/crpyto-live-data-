// script.js

document.getElementById('searchButton').addEventListener('click', function() {
    const cryptoName = document.getElementById('cryptoName').value.toLowerCase();
    if (cryptoName) {
        fetchCryptoData(cryptoName);
    } else {
        alert('Please enter a cryptocurrency name');
    }
});

async function fetchCryptoData(cryptoName) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName}`);
        if (!response.ok) {
            throw new Error('Cryptocurrency not found');
        }
        const data = await response.json();
        displayCryptoData(data);
    } catch (error) {
        document.getElementById('cryptoData').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayCryptoData(data) {
    const cryptoDataDiv = document.getElementById('cryptoData');
    cryptoDataDiv.innerHTML = `
        <h2>${data.name} (${data.symbol.toUpperCase()})</h2>
        <p>Current Price: $${data.market_data.current_price.usd}</p>
        <p>Market Cap: $${data.market_data.market_cap.usd}</p>
        <p>24h High: $${data.market_data.high_24h.usd}</p>
        <p>24h Low: $${data.market_data.low_24h.usd}</p>
    `;
}
