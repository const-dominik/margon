(async () => {
    const chmurka = await fetch("https://dog.ceo/api/breed/samoyed/images/random");
    const data = await chmurka.json();
    if (data.status === "success") {
        document.querySelector("#loading").style.background = `black url(${data.message}) no-repeat center 30%`;
    }
})()