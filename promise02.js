async function main() {
    const promesa1 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(10);
            console.log("Resolución promesa1");
        }, 6000);
        console.log("promesa1");
    });

    const promesa2 = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(20);
            console.log("Resolución promesa2");
        }, 2000);
        console.log("promesa2");
    });

    try {
        const valor1 = await promesa1;
        const valor2 = await promesa2;

        console.log(valor1); // 10
        console.log(valor2); // 20
    } catch (error) {
        console.log(error);
    }
}

main();