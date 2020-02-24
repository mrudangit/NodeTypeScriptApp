console.log('Hello Node TypeScript');
import {Client} from 'amps';
import {MarketData} from './MarketData';
console.log('Amps Client Version : ', Client.version());


const ampsClient = new Client('TraderWorkStationClient');

ampsClient.connect('ws://localhostL9090/amps/json').then(value => {
    console.log('Connected...');
    const md = new MarketData();
    md.Cusip = '10Y';
    md.Price = 100.12;
    md.Yield = 3;
    console.log('Publishing Market Data : ', md);
    ampsClient.publish('TraderWorkstation/BenchMarkMarketData', md);
});

setInterval(()=> {
    publishBenchMarketData('10Y');
},5000);


setInterval(()=> {
    publishBondMarketData('IBM');
    publishBondMarketData('AAPL');

    publishBondMarketDataInternal('IBM');
    publishBondMarketDataInternal('AAPL');
},1000);


function publishBondMarketData(symbol: string) {
    const md = new MarketData();
    md.Cusip = symbol;
    md.Price = 200 + Math.random();
    md.Yield = 4 + Math.random();
    md.BenchMarkCusip = '10Y';
    ampsClient.publish('TraderWorkstation/BondMarketData', md);
}



function publishBenchMarketData(symbol: string) {
    const md = new MarketData();
    md.Cusip = symbol;
    md.Price = 100.12;
    md.Yield = 3 + Math.random();
    ampsClient.publish('TraderWorkstation/BenchMarkMarketData', md);
}


function publishBondMarketDataInternal(symbol: string) {
    const md = new MarketData();
    md.Cusip = symbol;
    md.Price = 200 + Math.random();
    md.Yield = 4 + Math.random();
    md.BenchMarkCusip = '10Y';
    ampsClient.publish('TraderWorkstation/BondMarketDataInternal', md);
}
