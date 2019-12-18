var classifier = new Object();
var mobilenetModule = new Object();

async function app(cadena) {
    if (cadena == "a") {
        console.log('Loading mobilenet..');
        $("#texto3").text('Inicio entrenamiento...');
        // Create the classifier.
        window.classifier = knnClassifier.create();

        // Load mobilenet.
        mobilenetModule = await mobilenet.load();

        // Add MobileNet activations to the model repeatedly for all classes.
        console.log('Start Tr..');
        for (let cont in class_array) {
            await $('#selected-image2').attr("src", img_a[cont]);

            const img0 = await tf.browser.fromPixels(document.getElementById('selected-image2'));
            const logits0 = await mobilenetModule.infer(img0, 'conv_preds');
            await classifier.addExample(logits0, cls_a[cont]);

            console.log(cont);

            cont = cont + 1;
        }

        console.log(classifier.getClassifierDataset());
        console.log('End mobilenet');

        document.getElementById("e3").style.display = "none";
        document.getElementById("e4").style.display = "none";
        document.getElementById("e5").style.display = "flex";
        document.getElementById("e6").style.display = "flex";
        document.getElementById("train-button").style.display = "flex";
    }
    if (cadena == "b") {
        // Make a prediction.
        const x = tf.browser.fromPixels(document.getElementById('selected-image3'));
        const xlogits = mobilenetModule.infer(x, 'conv_preds');
        console.log('Predictions:');
        const result = await classifier.predictClass(xlogits);
        console.log(result);
        const result2 = await mobilenetModule.classify(x);
        console.log(result2);

        console.log(Object.keys(result.confidences).length);
        console.log(Object.keys(result.confidences));
        console.log(Object.values(result.confidences));
        if (Object.keys(result.confidences).length == 1) {
            document.getElementById("texto4b").style.display = "none";
            document.getElementById("texto4c").style.display = "none";
            $("#texto4").text("Clase: " + Object.keys(result.confidences)[0] + " probabilidad: " + Object.values(result.confidences)[0] * 100 + "%");

        }
        if (Object.keys(result.confidences).length == 2) {
            document.getElementById("texto4b").style.display = "flex";
            document.getElementById("texto4c").style.display = "none";
            $("#texto4").text("Clase: " + Object.keys(result.confidences)[0] + " probabilidad: " + Object.values(result.confidences)[0] * 100 + "%");
            $("#texto4b").text("Clase: " + Object.keys(result.confidences)[1] + " probabilidad: " + Object.values(result.confidences)[1] * 100 + "%");

        }
        if (Object.keys(result.confidences).length >= 3) {
            document.getElementById("texto4b").style.display = "flex";
            document.getElementById("texto4c").style.display = "flex";
            $("#texto4").text("Clase: " + Object.keys(result.confidences)[0] + " probabilidad: " + Object.values(result.confidences)[0] * 100 + "%");
            $("#texto4b").text("Clase: " + Object.keys(result.confidences)[1] + " probabilidad: " + Object.values(result.confidences)[1] * 100 + "%");
            $("#texto4c").text("Clase: " + Object.keys(result.confidences)[2] + " probabilidad: " + Object.values(result.confidences)[2] * 100 + "%");
        }


        document.getElementById("spinerf").style.display = "none";
        document.getElementById("texto4").style.display = "flex";

        //$("#texto4").text("La imagen corresponde a la clase: "+result.label); 
    }
    if (cadena == "c") {
        console.log('Loading mobilenet..');

        // Create the classifier.
        window.classifier = knnClassifier.create();

        // Load mobilenet.
        mobilenetModule = await mobilenet.load();

        // Add MobileNet activations to the model repeatedly for all classes.
        console.log('Start Tr..');
        // Make a prediction.
        const x = tf.browser.fromPixels(document.getElementById('selected-image3m'));
        const xlogits = mobilenetModule.infer(x, 'conv_preds');
        console.log('Predictions M:');
        const result2 = await mobilenetModule.classify(x);
        console.log(result2);
        

        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++");

        document.getElementById("spinerfm").style.display = "none";
        document.getElementById("texto4m").style.display = "flex";
        document.getElementById("texto4l").style.display = "flex";
        document.getElementById("texto4s").style.display = "flex";
        $("#texto4m").text("Clase: " + result2[0].className + " probabilidad: " + result2[0].probability * 100 + "%");
        $("#texto4l").text("Clase: " + result2[1].className + " probabilidad: " + result2[1].probability * 100 + "%");
        $("#texto4s").text("Clase: " + result2[2].className + " probabilidad: " + result2[2].probability * 100 + "%");
    }
    if (cadena == "d") {
        console.log('Loading mobilenet..');

        // Create the classifier.
        window.classifier = knnClassifier.create();

        // Load mobilenet.
        mobilenetModule = await mobilenet.load();

        // Add MobileNet activations to the model repeatedly for all classes.
        console.log('Start Tr..');
        // Make a prediction.
        var imgEl = document.getElementById('selected-image3m');
        var c = document.getElementById("myCanvas3m");
        var ctx = await c.getContext("2d");
        await ctx.drawImage(webcamElement, 0, 0, 224, 224);
        await imgEl.setAttribute('src', c.toDataURL('image/png'));
        console.log(c.toDataURL('image/png'));
        console.log('Predictions M:');
        const result2 = await mobilenetModule.classify(imgEl);
        console.log(result2);

        document.getElementById("spinerfm").style.display = "none";
        document.getElementById("texto4m").style.display = "flex";
        document.getElementById("texto4l").style.display = "flex";
        document.getElementById("texto4s").style.display = "flex";
        $("#texto4m").text("Clase: " + result2[0].className + " probabilidad: " + result2[0].probability * 100 + "%");
        $("#texto4l").text("Clase: " + result2[1].className + " probabilidad: " + result2[1].probability * 100 + "%");
        $("#texto4s").text("Clase: " + result2[2].className + " probabilidad: " + result2[2].probability * 100 + "%");
    }
}