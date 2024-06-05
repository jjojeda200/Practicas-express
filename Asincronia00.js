function crearPromesa(valor, tiempo) {
    return new Promise((resolve, reject) => {
      // Se espera un tiempo determinado antes de resolver la promesa con el valor especificado
      setTimeout(() => {
        console.log("Promesa con valor: ", valor);
        resolve(valor);
      }, tiempo);
      // Se muestra en consola un mensaje indicando la creación de la promesa y sus detalles
      console.log(`Promesa resolviéndose con valor ${valor} después de ${tiempo} milisegundos`);
    });
  }
  
  // Creación de la primera promesa que se resuelve después de 6 segundos
  const promesa1 = crearPromesa(10, 6000);
  
  // Creación de la segunda promesa que se resuelve después de 2 segundos
  const promesa2 = crearPromesa(20, 2000);
  
  // Unión de las dos promesas en un array
  const promesas = [promesa1, promesa2];
  
  // Creación de una promesa que se resuelve cuando todas las promesas en el array se resuelven
  const resultado = Promise.all(promesas);
  
  // Manipulación del resultado cuando todas las promesas se resuelven
  resultado.then((valores) => {
    // Impresión del valor de la primera promesa
    // console.log(valores[0]); // 10
    // Impresión del valor de la segunda promesa
    // console.log(valores[1]); // 20
  });