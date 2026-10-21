import { initialCars } from './MockData';

const STORAGE_KEY = 'auto_catalog_data';

export const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCars));
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCars = async () => {
  await delay(800);
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};


export const addCar = async (newCar) => {
  await delay(500);
  const data = localStorage.getItem(STORAGE_KEY);
  const cars = data ? JSON.parse(data) : [];
  

  const carWithId = { ...newCar, id: Date.now().toString() };
  cars.unshift(carWithId); 
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  return carWithId;
};