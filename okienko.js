window.g.loadQueue.push({
fun() {
    //okienko
    const okienko = document.createElement("span");
    okienko.id = "main";
    if (!localStorage.getItem("windowPosition")) localStorage.setItem("windowPosition", JSON.stringify([0,0]));
    const POSITION = JSON.parse(localStorage.getItem("windowPosition"));
    okienko.style = `
        position: absolute;
        display: block;
        z-index: 500;
        width: 200px;
        height: 100px;
        background: blue;
        border: 5px solid;
        border-image-source: repeating-linear-gradient(45deg, #3f87a6, #ebf8e1 15%, #f69d3c 20%);
        border-image-repeat: round;
        border-image-slice: 20;
        top: ${POSITION[0]}px;
        left: ${POSITION[1]}px;
        user-select: none;
    `;
    document.body.append(okienko);
    const dragWindow = e => {
        window.g.lock.add("okienko");
        let x = e.clientX;
        let y2 = e.clientY;
        document.onmousemove = e => {
            okienko.style.top = (parseInt(okienko.style.top) + (e.clientY - y2)) + "px";
            y2 = e.clientY;
            okienko.style.left = (parseInt(okienko.style.left) + (e.clientX - x)) + "px";
            x = e.clientX;
        }
    }

    okienko.addEventListener("mousedown", dragWindow);
    okienko.addEventListener("mouseup", () => {
        document.onmousemove = null;
        localStorage.setItem("windowPosition", JSON.stringify([parseInt(okienko.style.top), parseInt(okienko.style.left)]));
        window.g.lock.remove("okienko");
    });

    //ukrycie okienka
    const hide = document.createElement("button");
    hide.id="windowHide";
    hide.style = `
    position: absolute;
    display: block;
    z-index: 500;
    width: 50px;
    height: 50px;
    background: blue;
    border-radius: 50%;
    border: 3px solid red;
    top: 0px;
    left: 0px;
    `;
    window.panel.append(hide);
    const display = () => okienko.style.display = okienko.style.display === "block" ? "none" : "block";
    hide.addEventListener("click", display);
}
})