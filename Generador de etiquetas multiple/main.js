$(document).ready(() => {

    ElevatorVisible(false)

});

var boolElevator = false;
const checkbox1 = document.getElementById('chbox1');
const checkbox2 = document.getElementById('chbox2');
const checkbox3 = document.getElementById('chbox3');

async function obtenerDatos() {

    const config = {
        method: 'GET',
    }
    const res = await fetch('barcodes.JSON', config);
    const data = await res.json();
    crearEtiquetas(data)
}

function crearEtiquetas(codigos) {

    codigos.forEach(element => {
        var div = document.createElement("div");
        div.classList.add("boxEtiqueta")
        div.innerHTML = `<img class="logo" src="Recursos/TuLogoAqui.png">
        <br>
        <h2 class="titleEtiqueta" style="color: #000; ">${element.barcode}</h2>
        <img class="barcode"
        jsbarcode-format="auto"
        jsbarcode-width="2"
        jsbarcode-value="${element.barcode}">
        <div id="diviconos">
        <img class="iconos" src="/iconos/Arriba.jpg">
        <img class="iconos" src="/iconos/Cuidado.jpg">
        <img class="iconos" src="/iconos/Fragil.jpg">
        <img class="iconos" src="/iconos/Seco.jpg">
        </div>
        <div id="footerEtiqueta">
        <h3 class="descriptionFooter" style="color: #000; ">Télefono: 662 172 6042</h3>
        <h3 class="descriptionFooter" style="color: #000; ">github.com/MXavierK</h3>
        </div>`;
        var myDiv = document.getElementById("ContenidoCodigos");
        myDiv.appendChild(div);
        //Generamos los CB de las etiquetas
        JsBarcode(".barcode").init();
    });
    $('#btnsHeader').clone().appendTo('#ContenidoCodigos')
    ElevatorVisible(true)
}

function descargarImagenes() {
    const elementos = document.querySelectorAll('.boxEtiqueta');
    const elementosPorGrupo = 150; // O N cantidad, según prefieras
    const totalGrupos = Math.ceil(elementos.length / elementosPorGrupo);
    const maxTiempo = 30000;
    let grupoActual = 0;
    let descargarSiguienteGrupo = () => {
        if (grupoActual >= totalGrupos) {
            console.log('Se han descargado todas las imágenes');
            return;
        }

        const inicio = grupoActual * elementosPorGrupo;
        const fin = Math.min(inicio + elementosPorGrupo, elementos.length);
        const elementosGrupo = Array.from(elementos).slice(inicio, fin);

        // Convertir los elementos del grupo en imágenes
        const promises = [];
        for (let j = 0; j < elementosGrupo.length; j++) {
            promises.push(html2canvas(elementosGrupo[j]));
        }

        // Esperar a que se completen todas las conversiones de imágenes
        Promise.all(promises).then((canvases) => {
            // Crear un archivo ZIP para cada grupo de imágenes
            const zip = new JSZip();
            for (let j = 0; j < canvases.length; j++) {
                canvases[j].toBlob((blob) => {
                    zip.file(`Codigo-de-barra-${inicio + j}.jpg`, blob);
                    if (j === canvases.length - 1) {
                        // Descargar el archivo ZIP para cada grupo de imágenes
                        zip.generateAsync({ type: 'blob' }).then((zipBlob) => {
                            saveAs(zipBlob, `Codigos-${inicio}-${fin}.zip`);
                        });
                    }
                });
            }
            grupoActual++;
            setTimeout(descargarSiguienteGrupo, 5000); // Descargar el siguiente grupo después de 5 segundos
        });
    };

    descargarSiguienteGrupo();

    // Establecer un límite de tiempo para todo el proceso
    setTimeout(() => {
        console.log('El proceso ha tardado demasiado');
    }, maxTiempo);
}

function Elevator() {
    $('body, html').animate({
        scrollTop: '0px'
    })
}

function ElevatorVisible(enable) {
    const elevatorUp = document.getElementById('btnElevator');
    if (enable) {
        elevatorUp.classList.remove("none");
    } else {
        elevatorUp.classList.add("none");
    }
}

checkbox1.addEventListener('change', function () {
    const link = document.getElementById('estilos');

    if (this.checked) {
        link.href = 'Medidas/styles_10x10.css';
    }

});

checkbox2.addEventListener('change', function () {
    const link = document.getElementById('estilos');

    if (this.checked) {
        link.href = 'Medidas/styles_8x6.css';
    }

});

checkbox3.addEventListener('change', function () {
    const link = document.getElementById('estilos');

    if (this.checked) {
        link.href = 'Medidas/styles_8x6.css';
    }

});