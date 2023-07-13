import MarketItem from "../MarketItem/MarketItem";
const Market = () => {
    let arr = [
        {
            name: 'ВАЗ 2107',
            img: 'vaz_2107.png',
            damage: (Math.random() * 100).toFixed(0),
            mileage: (Math.random() * 100000).toFixed(0),
            startPrice: 5000,
            priceRatio: 100,
            endPrice: null,
        },
        {
            name: 'ВАЗ 2114',
            img: 'vaz_2114.png',
            damage: (Math.random() * 100).toFixed(0),
            mileage: (Math.random() * 100000).toFixed(0),
            startPrice: 25000,
            priceRatio: 200,
            endPrice: null,
        },
        {
            name: 'НЕКСИЯ',
            img: 'nexia.png',
            damage: (Math.random() * 100).toFixed(0),
            mileage: (Math.random() * 100000).toFixed(0),
            startPrice: 50000,
            priceRatio: 400,
            endPrice: null,
        }
    ];
    arr.forEach(e => e.endPrice = e.startPrice + e.damage * e.priceRatio);
    

    return (<>
    Рынок
        {
            
            arr.map((e, index) =>
                <MarketItem
                    car={e}
                    key={index}
                    index={index} />)
        }
    </>);
}

export default Market;