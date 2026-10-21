export default function VehicleCard({car, onClick}) {
    return(
        <div onClick={() => onClick(car)}
        style = {{border: '1px solid #ccc', padding: '15px', borderRadius: '8px'}}>
            <h3 style = {{marginTop: 0}}>{car.brand} {car.model}</h3>
            <p>Год: {car.year}</p>
            <p>Категория: {car.category}</p>
            <p>Скорость: {car.topSpeed} км/ч</p>
            <p>Мощность: {car.hp} л.с</p>
        </div>
    );
}