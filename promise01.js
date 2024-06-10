const firstTask = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Primera tarea completa');
    }, 1000);
  });
  
  const secondTask = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Segunda tarea completa');
    }, 1000);
  });
  
  firstTask
    .then((result) => {
      console.log(result);
      return secondTask;
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });