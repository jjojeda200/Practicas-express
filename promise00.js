const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Operación exitosa');
  }, 2000);
});

promise
  .then((result) => {
    console.log(result); // 'Operación exitosa'
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Operación completa'); // Siempre se ejecuta
  });
