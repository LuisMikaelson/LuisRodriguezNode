const {faker} = require ('@faker-js/faker');
const {MongoClient} = require('mongodb');
require('dotenv').config({path: './.env'});
const uri = process.env.uri; 

async function crearcoleccion(){
    const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const resultado = await cliente.db('BookWare').createCollection('Reservas',{
            validator:{
                $jsonSchema:{
                    bsonType:'object',
                    title:'EsquemaLibros',
                    required:[
                        'idreserva',
                        'idLibro',
                        'idUsurio',
                        'Fechareserva',
                        'Fechaentrega',
                        'Fechamaximaentrega',

                    ],
                    properties:{
                        idreserva:{bsonType:'int'},
                        idLibro:{bsonType:'int'},
                        idUsuario:{bsonType:'int'},
                        Fechareserva:{bsonType:'date'},
                        Fechaentrega:{bsonType:'date'},
                        Fechamaximaentrega:{bsonType:'date'}
                    }
                }
            }
        });
        if(resultado){
            console.log('registro existoso');
        }
        else{
            console.log('error care verga');
        }
    } catch (e) {
        console.log(e);
    }
    finally{
        await cliente.close();
    }
}
 crearcoleccion();
async function ingresarReserva() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const datosReserva = [];
    for (i=0; i<1999; i++){
        const datosinsertar = {
            idreserva: parseInt(faker.number.int({ min: 1, max: 4000 })),
            idLibro: parseInt(faker.number.int({ min: 1, max: 4000 })),
            idUsurio: parseInt(faker.number.int({ min: 1, max: 4000 })),
            Fechareserva: new Date(faker.date.recent()),
            Fechaentrega: new Date(faker.date.recent()),
            Fechamaximaentrega: new Date(faker.date.recent()),
          }
        datosReserva.push(datosinsertar);
        console.log(`Se han insertado ${i} registros`);
    }
    const resultado = await client.db('BookWare').collection('Reservas').insertMany(datosReserva);
    if(resultado){
        console.log('a dormir mama guevo');
    }else{
        console.log('suerte pa, siga');
    }
    } catch (e) {
        console.log(e);
    }
    finally { 
        await client.close();
    }
}
ingresarReserva();
async function mostrarDatos() {
    const cliente = new MongoClient(uri);
    try {
      await cliente.connect();
  
      const database = cliente.db('BookWare');
      const collection = database.collection('Reservas');
  
      // Obtener los documentos de la colección
      const documentos = await collection.find({},{limit:5}).toArray();
  
      // Mostrar los datos
      documentos.forEach((documento) => {
        console.log(documento);
      });
    } catch (error) {
      console.error('Error al mostrar los datos:', error);
    } finally {
      await cliente.close();
    }
  }
  
  mostrarDatos();
async function actualizarDatos() {
    const client = new MongoClient(uri);
    const dbName = 'BookWare'; 
    const collectionName = 'Reservas'; 
  
    try {
      await client.connect();
  
      const database = client.db(dbName);
      const collection = database.collection(collectionName);
  
      // Actualizar los datos
      const filtro = { idLibro: 1409 }; 
      const update = { $set: { idreserva:1111 } }; 
  
      const resultado = await collection.updateMany(filtro, update);
  
      console.log(`${resultado.modifiedCount} documentos actualizados exitosamente.`);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    } finally {
      await client.close();
    }
  }
  actualizarDatos();
  async function buscarRegistro() {
    const client = await MongoClient.connect(uri);
    try {
      const database = client.db('BookWare');
      const collection = database.collection('Reservas');
      const idLibroBuscar = 1409;
      const filtro = { idLibro: idLibroBuscar };
  
      const registros = await collection.find(filtro).toArray();
  
      if (registros.length > 0) {
        console.log(`Registros encontrados para el idLibro "${idLibroBuscar}":`);
        registros.forEach((registro) => {
          console.log(registro);
        });
      } else {
        console.log(`No se encontraron registros para el idLibro "${idLibroBuscar}".`);
      }
      
      // Cerrar la conexión
      client.close();
    } catch (error) {
      console.error('Error al buscar el registro:', error);
    }
  }
  
  buscarRegistro();
async function eliminarRegistro() {
    const client = await MongoClient.connect(uri);
    try {
      const database = client.db('BookWare');
      const collection = database.collection('Reservas');
      const datoEliminar = 1409
      const filtro = { idLibro:datoEliminar }; 
  
      const resultado = await collection.deleteOne(filtro);
  
      if (resultado.deletedCount === 1) {
        console.log('La reserva se eliminó correctamente.');
      } else {
        console.log('No se encontró ningún registro con el ID especificado.');
      }
  
      // Cerrar la conexión
      client.close();
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
    }
  }
  eliminarRegistro();
  