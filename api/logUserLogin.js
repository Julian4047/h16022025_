import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Faltan datos' });
    }

    // Configuración de la base de datos
    const dbConfig = {
      host: 'sql10.freesqldatabase.com',
      user: 'sql10763072',
      password: 'uKYVTNPmwA',
      database: 'sql10763072',
      port: 3306,
    };

    try {
      const connection = await mysql.createConnection(dbConfig);
      const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
      await connection.execute(query, [name, email]);
      await connection.end();

      console.log(`Usuario guardado: ${name}, ${email}`);
      return res.status(200).json({ message: 'Usuario registrado' });
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  return res.status(405).json({ message: 'Método no permitido' });
}
