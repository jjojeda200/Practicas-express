
function eventManager(fn) {
    let events = [];
    let executing = false; 
    
    return async () => {
      events.push(fn);
    
      if(!executing){
        executing = true;
        while(events.length){
          await events.shift()();
        }
        executing = false; 
      }
    }
  }
  
  const manager = eventManager(async ()=>{
    const proccess = crypto.randomUUID();
    console.log('Inicio ' + proccess);
    
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log('Finaliza ' + proccess);
            resolve();
        },2000);
    });
  });
  
  const managerURL = eventManager(async ()=>{
    const num = Math.floor(Math.random() * 100 + 1);
    console.log('Inicio ' + num);
    const json = await fetch("https://jsonplaceholder.typicode.com/todos/"+num)
      .then(response => response.json())
      .then(json => json);
      console.log('Finaliza '+num);
      console.log(json);
  });
  
  for (let i = 0; i <= 10; i++) {
  manager();
  managerURL();
  }

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

