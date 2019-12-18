var img_a = [];
var cls_a = [];
var class_array = [];
var cont = 0;
var matriz_clases = ["-"];

var entrada = 0;
const webcamElement1 = document.getElementById('webcam');
var entrada2m = 0;
const webcamElement2 = document.getElementById('webcam2m');
var entrada3m = 0;
const webcamElement = document.getElementById('webcam3m');

/*mobilenet.js*/

let base64Image;

$("#image-selector").change(function () {
    let reader = new FileReader();
    reader.onload = function (e) {
        let dataURL = reader.result;
        base64Image = dataURL;
        $('#selected-image').attr("src", dataURL);

        console.log("Image UP");
    }
    reader.readAsDataURL($("#image-selector")[0].files[0]);
})

$("#image-selector3").change(function () {
    let reader = new FileReader();
    reader.onload = function (e) {
        let dataURL = reader.result;

        $('#selected-image3').attr("src", dataURL);

        console.log("Image UP");
    }
    reader.readAsDataURL($("#image-selector3")[0].files[0]);
})
$("#image-selector3m").change(function () {
    let reader = new FileReader();
    reader.onload = function (e) {
        let dataURL = reader.result;

        $('#selected-image3m').attr("src", dataURL);

        console.log("Image UP");

        document.getElementById("texto4m").style.display = "flex";
        document.getElementById("texto4l").style.display = "none";
        document.getElementById("texto4s").style.display = "none";
        $("#texto4m").text("Prediccion");
    }
    reader.readAsDataURL($("#image-selector3m")[0].files[0]);
})
var cont_clases = 0;
$("#image-button").click(function (event) {
    if (entrada == 0) {
        img_a.push(base64Image);
    }
    if (entrada == 1) {
        select1();
        function select1() {
            var imgEl = document.getElementById('selected-image2');
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.drawImage(webcamElement1, 0, 0, 224, 224);
            imgEl.setAttribute('src', c.toDataURL('image/png'));

            img_a.push(c.toDataURL('image/png'));
            base64Image = c.toDataURL('image/png');
        }
    }
    cls_a.push(document.clases_formulario2.clases_f2[document.clases_formulario2.clases_f2.selectedIndex].value);
    class_array.push("new");
    console.log(cls_a);
    console.log(img_a);
    $("#texto2").text(img_a.length);
    $("#lista").append("<li>"
        + '<label for="" class=' + "listtt_2" + ">" + cont_clases + "</label>"
        + '<label for="" class=' + "listtt" + ">" + document.clases_formulario2.clases_f2[document.clases_formulario2.clases_f2.selectedIndex].value + "</label>"
        + '<img src="' + base64Image + '" height="100" width="100"' + '/>'
        + "</li>");
    cont_clases = cont_clases + 1;
})

$("#train-button").click(function (event) {
    cont = 0;
    document.getElementById("e1").style.display = "none";
    document.getElementById("train-button").style.display = "none";
    document.getElementById("e3").style.display = "flex";
    document.getElementById("e4").style.display = "flex";
    document.getElementById("e5").style.display = "none";
    document.getElementById("e6").style.display = "none";

    app("a");

})

$("#predict-button").click(function (event) {
    document.getElementById("texto4").style.display = "none";
    document.getElementById("spinerf").style.display = "flex";
    if (entrada2m == 0) {
        $("#selected-image3").css("display", "flex");
        $("#webcam2m").css("display", "none");
        app("b");
    }
    if (entrada2m == 1) {
        val();
        async function val() {
            $("#selected-image3").css("display", "none");
            $("#webcam2m").css("display", "flex");
            var imgEl = document.getElementById('selected-image3');
            var c = document.getElementById("myCanvas2m");
            var ctx = await c.getContext("2d");
            await ctx.drawImage(webcamElement2, 0, 0, 224, 224);
            await imgEl.setAttribute('src', c.toDataURL('image/png'));
            app("b");
        }

    }

})
$("#predict-buttonm").click(function (event) {

    document.getElementById("texto4m").style.display = "none";
    document.getElementById("spinerfm").style.display = "flex";

    document.getElementById("texto4l").style.display = "none";
    document.getElementById("texto4s").style.display = "none";

    if (entrada3m == 0) {
        $("#selected-image3m").css("display", "flex");
        $("#webcam3m").css("display", "none");
        app("c");
    }
    if (entrada3m == 1) {
        $("#selected-image3m").css("display", "none");
        $("#webcam3m").css("display", "flex");
        app("d");
    }

})

var contc = 0;
$("#agregar_clase").click(function (event) {

    for (l = 0; l < matriz_clases.length; l++) {
        if ($("#class-input").val() == matriz_clases[l]) {
            contc = 1;
        }
        if ($("#class-input").val() == "") {
            contc = 1;
        }
        else if ($("#class-input").val() != matriz_clases[l]) {
            contc = 2;
        }
    }
    if (contc == 2) {
        matriz_clases.push($("#class-input").val());

        document.clases_formulario.clases_f.length = matriz_clases.length;
        document.clases_formulario2.clases_f2.length = matriz_clases.length;
        for (i = 0; i < matriz_clases.length; i++) {
            document.clases_formulario.clases_f.options[i].value = matriz_clases[i];
            document.clases_formulario.clases_f.options[i].text = matriz_clases[i];
            document.clases_formulario2.clases_f2.options[i].value = matriz_clases[i];
            document.clases_formulario2.clases_f2.options[i].text = matriz_clases[i];
        }
        console.log(document.clases_formulario.clases_f[document.clases_formulario.clases_f.selectedIndex].value);
    }
    const matriz_impr = matriz_clases;
    /*matriz_impr.splice(0,1);*/
    console.log(matriz_impr);
    //$("#texto1").text(matriz_impr+",-");  
})

function item_lista() {
    console.log(document.clases_formulario.clases_f[document.clases_formulario.clases_f.selectedIndex].value);
}

$("#borrar_clase").click(function (event) {
    matriz_clases = ["-"];
    document.clases_formulario.clases_f.length = matriz_clases.length;
    document.clases_formulario2.clases_f2.length = matriz_clases.length;
    for (i = 0; i < matriz_clases.length; i++) {
        document.clases_formulario.clases_f.options[i].value = matriz_clases[i];
        document.clases_formulario.clases_f.options[i].text = matriz_clases[i];
        document.clases_formulario2.clases_f2.options[i].value = matriz_clases[i];
        document.clases_formulario2.clases_f2.options[i].text = matriz_clases[i];
    }
    //$("#texto1").text("Nunguna");
})
$("#btn_borrar_ultimo").click(function () {
    img_a.pop();
    cls_a.pop();
    class_array.pop();
    console.log(cls_a);
    console.log(img_a);
    var list = document.getElementById("lista");   // Get the <ul> element with id="myList"
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    if (cont_clases > 0) {
        cont_clases = cont_clases - 1;
    }

    $("#lista").append("<li>"
        + '<label for="" class=' + "listtt_2" + ">" + "#" + "</label>"
        + '<label for="" class="listtt">Clase</label><label for="" class="listtt">Imagen</label>'
        + "</li>");

    var contadorx = 0;
    img_a.forEach(element => {
        $("#lista").append("<li>"
            + '<label for="" class=' + "listtt_2" + ">" + contadorx + "</label>"
            + '<label for="" class=' + "listtt" + ">" + cls_a[contadorx] + "</label>"
            + '<img src="' + img_a[contadorx] + '" height="100" width="100"' + '/>'
            + "</li>");
        contadorx = contadorx + 1;
    });
    contadorx = 0;

});
$("#file-button").click(function (event) {
    entrada = 0;
    $("#image-selector").css("opacity", 1);
    $("#camera-button").css("opacity", 1);
    $("#file-button").css("opacity", 0.2);
    $("#selected-image").css("display", "flex");
    $("#selected-image2").css("display", "flex");
    $("#webcam").css("display", "none");
    stop_camera()
})
$("#camera-button").click(function (event) {
    stop_camera()
    entrada = 1;
    camera();
    async function camera() {
        $("#image-selector").css("opacity", 0.2);
        $("#camera-button").css("opacity", 0.2);
        $("#file-button").css("opacity", 1);
        $("#selected-image").css("display", "none");
        $("#selected-image2").css("display", "none");
        $("#webcam").css("display", "flex");

        await setupWebcam();
        async function setupWebcam() {
            return new Promise((resolve, reject) => {
                const navigatorAny = navigator;
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
                    navigatorAny.msGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({ video: true },
                        stream => {
                            webcamElement1.srcObject = stream;
                            webcamElement1.addEventListener('loadeddata', () => resolve(), false);
                        },
                        error => reject());
                } else {
                    reject();
                }
            });
        }
    }
})
$("#file-button2m").click(function (event) {
    entrada2m = 0;
    $("#image-selector3").css("opacity", 1);
    $("#camera-button2m").css("opacity", 1);
    $("#file-button2m").css("opacity", 0.2);
    $("#selected-image3").css("display", "flex");
    $("#webcam2m").css("display", "none");
    stop_camera()
})
$("#camera-button2m").click(function (event) {
    stop_camera()
    entrada2m = 1;
    camera();
    async function camera() {
        $("#image-selector3").css("opacity", 0.2);
        $("#camera-button2m").css("opacity", 0.2);
        $("#file-button2m").css("opacity", 1);
        $("#selected-image3").css("display", "none");
        $("#webcam2m").css("display", "flex");

        await setupWebcam();
        async function setupWebcam() {
            return new Promise((resolve, reject) => {
                const navigatorAny = navigator;
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
                    navigatorAny.msGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({ video: true },
                        stream => {
                            webcamElement2.srcObject = stream;
                            webcamElement2.addEventListener('loadeddata', () => resolve(), false);
                        },
                        error => reject());
                } else {
                    reject();
                }
            });
        }
    }
})
$("#file-button3m").click(function (event) {
    entrada3m = 0;
    $("#image-selector3m").css("opacity", 1);
    $("#camera-button3m").css("opacity", 1);
    $("#file-button3m").css("opacity", 0.2);
    $("#selected-image3m").css("display", "flex");
    $("#webcam3m").css("display", "none");
    stop_camera()
})
$("#camera-button3m").click(function (event) {
    stop_camera()
    entrada3m = 1;
    camera();
    async function camera() {
        $("#image-selector3m").css("opacity", 0.2);
        $("#camera-button3m").css("opacity", 0.2);
        $("#file-button3m").css("opacity", 1);
        $("#selected-image3m").css("display", "none");
        $("#webcam3m").css("display", "flex");

        await setupWebcam();
        async function setupWebcam() {
            return new Promise((resolve, reject) => {
                const navigatorAny = navigator;
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigatorAny.webkitGetUserMedia || navigatorAny.mozGetUserMedia ||
                    navigatorAny.msGetUserMedia;
                if (navigator.getUserMedia) {
                    navigator.getUserMedia({ video: true },
                        stream => {
                            webcamElement.srcObject = stream;
                            webcamElement.addEventListener('loadeddata', () => resolve(), false);
                        },
                        error => reject());
                } else {
                    reject();
                }
            });
        }
    }
})

function stop_camera() {
    try {
        var track = webcamElement.srcObject.getTracks()[0];
        track.stop();
    } catch (error) {
        console.log("error");
    }
    try {
        var track = webcamElement1.srcObject.getTracks()[0];
        track.stop();
    } catch (error) {
        console.log("error");
    }
    try {
        var track = webcamElement2.srcObject.getTracks()[0];
        track.stop();
    } catch (error) {
        console.log("error");
    }
}