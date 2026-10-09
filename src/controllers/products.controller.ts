import { pool } from "../conf/dbConnection";

export const getAllProducts = async (req: any, res: any) => {
  try {
    const [rows]: any = await pool.query(
      "SELECT * FROM products WHERE active = TRUE",
    );
    res.status(200).json(rows);
  } catch (error: any) {
    res.status(500).json({ error: "Error en el servidor de base de datos" });
  }
};

export const getProductById = async (req: any, res: any) => {
  try {
    const id: any = parseInt(req.params.id);
    if (isNaN(id) || id <= 0)
      return res.status(400).json({ error: "ID invalido" });

    const [rows]: any = await pool.query(
      "SELECT * FROM products WHERE id = ? AND active = TRUE",
      [id],
    );

    if (rows.length === 0) {
      return res
        .status(200)
        .json({ message: "Producto no encontrado o inactivo" });
    }
    res.status(200).json(rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: "Error en el servidor de base de datos" });
  }
};

export const createProduct = async (req: any, res: any) => {
  try {
    const { name, price, stock, description, brand, img }: any = req.body;

    const priceNum: any = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res
        .status(400)
        .json({ error: "Precio invalido (Debe ser mayor a 0)." });
    }

    const [result]: any = await pool.query(
      "INSERT INTO products (name, price, stock, description, brand, img) VALUES (?, ?, ?, ?, ?, ?)",
      [name, priceNum, stock, description, brand, img],
    );
    res.status(201).json({ message: "Producto creado", id: result.insertId });
  } catch (error: any) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const updateProduct = async (req: any, res: any) => {
  try {
    const id: any = parseInt(req.params.id);
    if (isNaN(id) || id <= 0)
      return res.status(400).json({ error: "ID invalido" });

    const { name, price, stock, description, brand, img }: any = req.body;
    const priceNum: any = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      return res.status(400).json({ error: "Precio invalido" });
    }

    const [result]: any = await pool.query(
      "UPDATE products SET name=?, price=?, stock=?, description=?, brand=?, img=? WHERE id=? AND active=TRUE",
      [name, priceNum, stock, description, brand, img, id],
    );

    if (result.affectedRows === 0) {
      return res
        .status(200)
        .json({ message: "Producto no encontrado o inactivo" });
    }
    res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al actualizar" });
  }
};

export const deleteProduct = async (req: any, res: any) => {
  try {
    const id: any = parseInt(req.params.id);
    if (isNaN(id) || id <= 0)
      return res.status(400).json({ error: "ID invalido" });

    const [result]: any = await pool.query(
      "UPDATE products SET active = FALSE WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      return res.status(200).json({ message: "Producto no encontrado" });
    }
    res.status(200).json({ message: "Baja logica exitosa" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al eliminar" });
  }
};

export const changePrice = async (req: any, res: any) => {
  try {
    const id: any = parseInt(req.params.id);
    if (isNaN(id) || id <= 0)
      return res.status(400).json({ error: "ID invalido" });

    const price: any = parseFloat(req.body.price);
    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ error: "Precio invalido (Debe ser mayor a 0)." });
    }

    const [result]: any = await pool.query(
      "UPDATE products SET price = ? WHERE id = ? AND active = TRUE",
      [price, id],
    );

    if (result.affectedRows === 0) {
      return res
        .status(200)
        .json({ message: "Producto no encontrado o inactivo" });
    }
    res.status(200).json({ message: "Precio actualizado correctamente" });
  } catch (error: any) {
    res.status(500).json({ error: "Error al cambiar el precio" });
  }
};
