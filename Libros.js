const {faker} = require ('@faker-js/faker');
const {MongoClient} = require('mongodb');
require('dotenv').config({path: './.env'});
const uri = process.env.uri; 
async function mostrarDatos() {
    const cliente = new MongoClient(uri);
  
    try {
      await cliente.connect();
  
      const database = cliente.db('BookWare');
      const collection = database.collection('Libros');
  
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

async function registrarLibro(){

const cliente = new MongoClient(uri);
    try {
        await cliente.connect();
        const datosLibros = [];
        for (i=0; i<1995; i++){
    const nombreLi = faker.helpers.arrayElements(['Harry potter y la prieda filosofal','Animales Fantásticos y dónde encontrarlos',
    'Harry Potter y las Reliquias de la Muerte: Parte 1','Harry Potter y el misterio del príncipe','Harry Potter y la orden del fénix',
    'Harry Potter y el cáliz de fuego','cien años de soledad','El gato con botas','biblia',' El diario de Ana Frank',
    'Piense y hágase rico','Lo que el viento se llevó ',"1984","Matar a un ruiseñor","Cien años de soledad","El gran Gatsby",
    "Don Quijote de la Mancha","Orgullo y prejuicio","Ulises","En busca del tiempo perdido","Moby-Dick","El señor de los anillos",
    "Crimen y castigo","Las aventuras de Huckleberry Finn","Hamlet","Anna Karenina","Romeo y Julieta","Orgullo y prejuicio","1984",
    "Matar a un ruiseñor", "Cien años de soledad","El gran Gatsby","Don Quijote de la Mancha","Ulises","En busca del tiempo perdido","Moby-Dick",
    "El señor de los anillos","Crimen y castigo","Las aventuras de Huckleberry Finn","Hamlet","Anna Karenina","Romeo y Julieta","Orgullo y prejuicio","1984"]);
    const nombrelidos = nombreLi[0];
    const genero = faker.helpers.arrayElements(['aventura', 'terror', 'ciencia ficcion',
    "La novela de aventuras",
    "La novela de ciencia ficción",
    "Los cuentos de hadas",
    "La novela gótica",
    "La novela policíaca",
    "El romance paranormal",
    "La novela distópica",
    "La novela fantástica",
'literatura para niños']);
    const generodos=genero[0];
    const estado = faker.helpers.arrayElements(['ACTIVO','INACTIVO']);
    const estadodos = estado[0];
            const datosinsertar={
                idLibro:faker.number.int({min:001,max:4000}),
                isbnLibro:faker.string.alphanumeric(10),
                NombreLibro:nombrelidos,
                generoLibro: generodos,
                autorLibro:faker.person.fullName(),
                descripcionLibro:faker.lorem.sentence(),
                estadoLibro : estadodos,
                cantidadLibro: faker.number.int({min:001,max:10}),
                imagenLibro:faker.image.url()
            }
            datosLibros.push(datosinsertar);
            console.log(`Se han insertado ${i} registros`);

        }
        const resultado = await cliente.db('BookWare').collection('Libros').insertMany(datosLibros);
        if(resultado){
            console.log('a dormir mama guevo');
        }else{
            console.log('suerte pa, siga');
        }
    } catch (e) {
        console.log(e);
    }
    finally { 
        await cliente.close();
    }
}
registrarLibro();


// // Crear conexión con esquema de los libros
// async function crearcoleccion(){
//     const cliente = new MongoClient(uri);
//     try {
//         await cliente.connect();
//         const resultado = await cliente.db('BookWare').createCollection('Libross',{
//             validator:{
//                 $jsonSchema:{
//                     bsonType:'object',
//                     title:'EsquemaLibros',
//                     required:[
//                         'idLibro',
//                         'isbnLibro',
//                         'NombreLibro',
//                         'generoLibro',
//                         'autorLibro',
//                         'descripcionLibro',
//                         'estadoLibro',
//                         'cantidadLibro'

//                     ],
//                     properties:{
//                         idLibro:{bsonType:'int'},
//                         isbnLibro:{bsonType:'string'},
//                         NombreLibro:{bsonType:'string'},
//                         generoLibro:{bsonType:'string'},
//                         autorLibro:{bsonType:'string'},
//                         descripcionLibro:{bsonType:'string'},
//                         estadoLibro:{bsonType:'string'},
//                         cantidadLibro:{bsonType:'int'},
//                         imagenLibro:{bsonType:'string'}
//                     }
//                 }
//             }
//         });
//         if(resultado){
//             console.log('registro existoso');
//         }
//         else{
//             console.log('error care verga');
//         }
//     } catch (e) {
//         console.log(e);
//     }
//     finally{
//         await cliente.close();
//     }
// }
//  crearcoleccion();
// // ELIMINAR COLECCCON
// async function eliminarColeccion() {
// const client = new MongoClient(uri);

//   try {
//     await client.connect();

//     const database = client.db('BookWare');
//     const collection = database.collection('Libros');

//     // Eliminar la colección
//     await collection.drop();

//     console.log(`La colección "Libros" ha sido eliminada exitosamente.`);
//   } catch (error) {
//     console.error('Error al eliminar la colección:', error);
//   } finally {
//     await client.close();
//   }
// }
// eliminarColeccion();
// // ELIMINAR LIBRO 

// async function actualizarDatos() {
//   const client = new MongoClient(uri);
//   const dbName = 'BookWare'; 
//   const collectionName = 'Libros'; 

//   try {
//     await client.connect();

//     const database = client.db(dbName);
//     const collection = database.collection(collectionName);

//     // Actualizar los datos
//     const filtro = { NombreLibro: 'Cien años de soledad' }; // Cambia campo y valor por el campo y valor que deseas utilizar para filtrar los documentos a actualizar
//     const update = { $set: { NombreLibro: 'Diez años de soledad'} }; // Cambia campo y nuevoValor por el campo y el nuevo valor que deseas asignar

//     const resultado = await collection.updateMany(filtro, update);

//     console.log(`${resultado.modifiedCount} documentos actualizados exitosamente.`);
//   } catch (error) {
//     console.error('Error al actualizar los datos:', error);
//   } finally {
//     await client.close();
//   }
// }
// actualizarDatos();
// // Eliminar Dato 
// async function buscarRegistro() {
//   const client = await MongoClient.connect(uri);
//   try {
  
//     const database = client.db('BookWare');
//     const collection = database.collection('Libros');
//     const datobuscar = "Moby-Dick"
//     const registros = await collection.find({},{limit:5},{ NombreLibro:datobuscar }).toArray();

//     if (registros.length > 0) {
//       console.log(`Registros encontrados para el tipo "${datobuscar}":`);
//       registros.forEach((registro) => {
//         console.log(registro);
//       });
//     } else {
//       console.log(`No se encontraron registros para el tipo "${datobuscar}".`);
//     }
    
//     // Cerrar la conexión
//     client.close();
//   } catch (error) {
//     console.error('Error al buscar el registro:', error);
//   }
// }
// buscarRegistro();
async function eliminarRegistro() {
  const client = await MongoClient.connect(uri);
  try {
    const database = client.db('BookWare');
    const collection = database.collection('Libros');
    const datoEliminar = "Moby-Dick"
    const filtro = { NombreLibro:datoEliminar }; 

    const resultado = await collection.deleteOne(filtro);

    if (resultado.deletedCount === 1) {
      console.log('El registro se eliminó correctamente.');
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