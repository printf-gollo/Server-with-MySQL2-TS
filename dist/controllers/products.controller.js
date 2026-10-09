"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePrice = exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const dbConnection_1 = require("../conf/dbConnection");
const getAllProducts = async (req, res) => {
    try {
        const [rows] = await dbConnection_1.pool.query("SELECT * FROM products WHERE active = TRUE");
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor de base de datos" });
    }
};
exports.getAllProducts = getAllProducts;
const getProductById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0)
            return res.status(400).json({ error: "ID inválido" });
        const [rows] = await dbConnection_1.pool.query("SELECT * FROM products WHERE id = ? AND active = TRUE", [id]);
        if (rows.length === 0) {
            // Se responde 200 aunque no exista por requerimiento especial de la asignación
            return res
                .status(200)
                .json({ message: "Producto no encontrado o inactivo" });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ error: "Error en el servidor de base de datos" });
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const { name, price, stock, description, brand, img } = req.body;
        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            return res
                .status(400)
                .json({ error: "Precio inválido. Debe ser mayor a 0." });
        }
        const [result] = await dbConnection_1.pool.query("INSERT INTO products (name, price, stock, description, brand, img) VALUES (?, ?, ?, ?, ?, ?)", [name, priceNum, stock, description, brand, img]);
        res.status(201).json({ message: "Producto creado", id: result.insertId });
    }
    catch (error) {
        res.status(500).json({ error: "Error al crear el producto" });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0)
            return res.status(400).json({ error: "ID inválido" });
        const { name, price, stock, description, brand, img } = req.body;
        const priceNum = parseFloat(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            return res.status(400).json({ error: "Precio inválido" });
        }
        const [result] = await dbConnection_1.pool.query("UPDATE products SET name=?, price=?, stock=?, description=?, brand=?, img=? WHERE id=? AND active=TRUE", [name, priceNum, stock, description, brand, img, id]);
        if (result.affectedRows === 0) {
            return res
                .status(200)
                .json({ message: "Producto no encontrado o inactivo" });
        }
        res.status(200).json({ message: "Producto actualizado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0)
            return res.status(400).json({ error: "ID inválido" });
        const [result] = await dbConnection_1.pool.query("UPDATE products SET active = FALSE WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            return res.status(200).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Baja lógica exitosa" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};
exports.deleteProduct = deleteProduct;
const changePrice = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0)
            return res.status(400).json({ error: "ID inválido" });
        const price = parseFloat(req.body.price);
        if (isNaN(price) || price <= 0) {
            return res
                .status(400)
                .json({ error: "Precio inválido. Debe ser mayor a 0." });
        }
        const [result] = await dbConnection_1.pool.query("UPDATE products SET price = ? WHERE id = ? AND active = TRUE", [price, id]);
        if (result.affectedRows === 0) {
            return res
                .status(200)
                .json({ message: "Producto no encontrado o inactivo" });
        }
        res.status(200).json({ message: "Precio actualizado correctamente" });
    }
    catch (error) {
        res.status(500).json({ error: "Error al cambiar el precio" });
    }
};
exports.changePrice = changePrice;
