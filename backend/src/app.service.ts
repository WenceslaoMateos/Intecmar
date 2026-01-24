import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm'; // <--- Importar DataSource

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {} // <--- Inyectar la conexión

  getHello(): string {
    return 'Hello World!';
  }

  // Creamos una función nueva para probar la DB
  async getDbTest() {
    // Ejecutamos una consulta SQL simple
    // Esto debería devolver algo como [{ resultado: 2 }]
    const result = await this.dataSource.query('SELECT * from prueba');
    
    return {
      mensaje: '¡Conexión exitosa con MySQL!',
      prueba_matematica: result,
    };
  }
}