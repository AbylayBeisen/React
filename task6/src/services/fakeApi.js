import { API_CONFIG, DATA_KEY } from "./settings.js";
import { initialDataSample } from "./initial-data-sample.js";

function fakeRequest(operation, options = {}) {
  const {
    minDelay = API_CONFIG.minDelay,
    maxDelay = API_CONFIG.maxDelay,
    errorChance = API_CONFIG.errorChance,
  } = options;

  return new Promise((resolve, reject) => {
    const delayMS = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    setTimeout(() => {
      if (Math.random() < errorChance) {
        reject(new Error("Simulated server Error"));
        return;
      }

      try {
        resolve(operation());
      } catch (error) {
        reject(error);
      }
    }, delayMS);
  });
}

function initializeDatabase() {
  if (!localStorage.getItem(DATA_KEY)) {
    localStorage.setItem(DATA_KEY, JSON.stringify(initialDataSample));
  }
}

function readData() {
  return JSON.parse(localStorage.getItem(DATA_KEY) || "[]");
}

function writeData(items) {
  localStorage.setItem(DATA_KEY, JSON.stringify(items));
}

initializeDatabase();

export async function getItemsList(query = "") {
  return fakeRequest(() => {
    const params = new URLSearchParams(query);
    const search = params.get("search");
    const category = params.get("category");
    const sort = params.get("sort") || "default";
    const page = Number(params.get("page")) || 1;
    const limit = Number(params.get("limit")) || 10;

    let items = readData();

    if (search) {
      const lowerSearch = search.toLowerCase();
      items = items.filter(
        (item) =>
          (item.brand && item.brand.toLowerCase().includes(lowerSearch)) ||
          (item.model && item.model.toLowerCase().includes(lowerSearch))
      );
    }

    if (category && category !== "All") {
      items = items.filter((item) => item.category === category);
    }

    items = [...items].sort((a, b) => {
      switch (sort) {
        case "speedDesc":
          return b.topSpeed - a.topSpeed;
        case "speedAsc":
          return a.topSpeed - b.topSpeed;
        case "yearDesc":
          return b.year - a.year;
        case "yearAsc":
          return a.year - b.year;
        default:
          return 0;
      }
    });

    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  });
}

export async function getItem(id) {
  return fakeRequest(() => {
    const items = readData();
    const item = items.find((item) => String(item.id) === String(id));

    if (!item) {
      throw new Error("Item not found");
    }

    return item;
  });
}

export async function createItem(data) {
  return fakeRequest(() => {
    const items = readData();
    const nextId = items.length > 0 ? Math.max(...items.map((item) => Number(item.id))) + 1 : 1;
    
    const newItem = {
      id: nextId,
      ...data
    };

    writeData([newItem, ...items]);
    return newItem;
  });
}

export async function updateItem(id, changes) {
  return fakeRequest(() => {
    const numericId = Number(id);
    const items = readData();
    const exists = items.some((item) => Number(item.id) === numericId);

    if (!exists) {
      throw new Error("Item not found");
    }

    const updatedItems = items.map((item) =>
      Number(item.id) === numericId ? { ...item, ...changes, id: numericId } : item
    );

    writeData(updatedItems);
    return updatedItems.find((item) => Number(item.id) === numericId);
  });
}

export async function deleteItem(id) {
  return fakeRequest(() => {
    const numericId = Number(id);
    const items = readData();
    const exists = items.some((item) => Number(item.id) === numericId);

    if (!exists) {
      throw new Error("Item not found");
    }

    const updatedItems = items.filter((item) => Number(item.id) !== numericId);
    writeData(updatedItems);

    return {
      success: true,
      id: numericId,
    };
  });
}