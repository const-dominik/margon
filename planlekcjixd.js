(() => {
    const guzik = document.createElement("button");
    guzik.style = "position: fixed; background-color: blue; top: 0px; left: 0px; width: 18px; height: 18px; z-index: 30000; border-radius: 50%";
    document.body.append(guzik)

    const schedule = {
        mon: ["1. włoski", "2. matma", "3. wf", "4. fizyka", "5. polski", "6. his", "7. angielski", "8. angielski"],
        tue: ["1. matma", "2. angielski", "3. angielski", "4. informatyka", "5. informatyka", "6. fizyka", "7. fizyka", "8. religia"],
        wed: ["1. fizyka", "2. włoski", "3. matematyka", "4. matematyka", "5. polski", "6. polski", "7. angielski"],
        thu: ["1. angielski", "2. angielski", "3. wf", "4. wf", "5. matma", "6. religia"],
        fri: ["1. polski", "2. matma", "3. fizyka", "4. informatyka", "5. angielski", "6. his", "7. wychowawcza"]
    }

    const getDay = () => {
        const x = new Date().getDay();
        switch (x) {
            case 0:
                return "mon";
            case 1:
                return "tue";
            case 2: 
                return "wed";
            case 3:
                return "thu";
            case 4:
            case 5:
            case 6:
                return "fri";
        }
    }

    guzik.addEventListener("click", () => alert(schedule[getDay()].join("\n")));
})()