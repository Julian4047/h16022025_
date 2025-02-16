import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { email } = req.query;

  try {
    const connection = await mysql.createConnection({
      host: 'sql10.freesqldatabase.com',
      user: 'sql10763072',
      password: 'uKYVTNPmwA',
      database: 'sql10763072',
      port: 3306
    });

    const [rows] = await connection.execute('SELECT name FROM users WHERE email = ?', [email]);
    connection.end();

    if (rows.length > 0) {
      res.status(200).json({ name: rows[0].name });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}
