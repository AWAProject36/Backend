CREATE TABLE users (
  idUsers SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(45),
  role VARCHAR(45),
  address VARCHAR(255),
  email VARCHAR(45),
  password VARCHAR(255),
  phone VARCHAR(255),
  UNIQUE(email, phone)
);

CREATE TABLE products (
  idProducts SERIAL PRIMARY KEY NOT NULL,
  idCategories INT NOT NULL,
  name VARCHAR(45),
  description VARCHAR(255),
  price DECIMAL,
  img VARCHAR(255)
);

CREATE TABLE categories (
  idCategories SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(45),
  idRestaurant INT NOT NULL
);

CREATE TABLE orders (
  idOrders SERIAL PRIMARY KEY NOT NULL,
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  state VARCHAR(255) NOT NULL,
  idRestaurant INT NOT NULL,
  idUsers INT NOT NULL
);

CREATE TABLE orders_products (
  idOrders INT NOT NULL,
  idProducts INT NOT NULL
);

CREATE TABLE restaurants (
  idRestaurant SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(45),
  address VARCHAR(45),
  opening VARCHAR(45),
  closing VARCHAR(45),
  img VARCHAR(255),
  type VARCHAR(45),
  pricelvl VARCHAR(45),
  ownerUserID INT NOT NULL
);

CREATE TABLE menu (
  idRestaurant INT NOT NULL,
  idProducts INT NOT NULL,
  PRIMARY KEY (idRestaurant, idProducts)
);

ALTER TABLE categories ADD CONSTRAINT categories_restaurants FOREIGN KEY (idRestaurant) REFERENCES restaurants (idRestaurant);

ALTER TABLE products ADD CONSTRAINT products_categories FOREIGN KEY (idCategories) REFERENCES categories (idCategories);

ALTER TABLE restaurants ADD CONSTRAINT users_restaurant FOREIGN KEY (ownerUserID) REFERENCES users (idUsers);

ALTER TABLE orders ADD CONSTRAINT restaurants_orders FOREIGN KEY (idRestaurant) REFERENCES restaurants (idRestaurant);

ALTER TABLE orders ADD CONSTRAINT users_orders FOREIGN KEY (idUsers) REFERENCES users (idUsers);

ALTER TABLE orders_products ADD CONSTRAINT op_orders FOREIGN KEY (idOrders) REFERENCES orders (idOrders);

ALTER TABLE orders_products ADD CONSTRAINT op_products FOREIGN KEY (idProducts) REFERENCES products (idProducts);

ALTER TABLE menu ADD CONSTRAINT menu_restaurant FOREIGN KEY (idRestaurant) REFERENCES restaurants (idRestaurant);

ALTER TABLE menu ADD CONSTRAINT menu_product FOREIGN KEY (idProducts) REFERENCES products (idProducts);

ALTER TABLE users ADD CONSTRAINT email_unique UNIQUE (email);

