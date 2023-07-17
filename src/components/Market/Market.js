import MarketItem from "../MarketItem/MarketItem";
const Market = () => {
    let arr = [
        {
            name: 'ВАЗ 2107',
            img: 'vaz_2107.png',
            damage: (Math.random() * 100).toFixed(0),
            mileage: (Math.random() * 100000).toFixed(0),
            startPrice: 5000,
            ratio: 100,
            endPrice: null,
            status: false,
        },
        {
            name: 'ВАЗ 2114',
            img: 'vaz_2114.png',
            damage: (Math.random() * 100).toFixed(0),
            mileage: (Math.random() * 100000).toFixed(0),
            startPrice: 40000,
            ratio: 200,
            endPrice: null,
            status: false,
        },
        {
            name: 'НЕКСИЯ',
            img: 'nexia.png',
            damage: (Math.random() * 100).toFixed(0),
            mileage: (Math.random() * 100000).toFixed(0),
            startPrice: 60000,
            ratio: 300,
            endPrice: null,
            status: false,
        }
    ];
    arr.forEach(e => e.endPrice = e.startPrice + e.damage * e.ratio);
    

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