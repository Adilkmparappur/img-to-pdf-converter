var newImage, showImg, fileName;

function loadFile(event){
    showImg = document.getElementById("showImg");
    showImg.src = URL.createObjectURL(event.target.files[0]);

    newImage = document.createElement("img");
    newImage.src = URL.createObjectURL(event.target.files[0]);
    showImg.onload = function(){
        URL.revokeObjectURL(showImg.src);

    // dipslay the image name
    const fileInput = document.getElementById('uploadImg');
    const file = fileInput.files[0];
    const p = document.getElementById("imgName");

    if (file) {
        fileName = file.name;
        p.innerText=fileName;
        console.log("user uploaded \'"+fileName+"\'"); // Log the file name to the console
        document.getElementById('downloadBtn').style.backgroundColor="var(--dwnlBtnClr)";
    } else {
        p.innerText='No file selected.'
        backgroundColor="var(--not)";
        
    }

    }
}


function pdfDown(){
    console.log("user dowloded \'" + fileName + "\'");
    var doc = new jsPDF();
    // Get the dimensions of the image
    var imgWidth = newImage.width;
    var imgHeight = newImage.height;

    // Calculate the scale factor to fit the image within the PDF page
    var scaleFactor = Math.min(doc.internal.pageSize.width / imgWidth, doc.internal.pageSize.height / imgHeight);

    // Adjust the image dimensions using the scale factor
    var scaledWidth = imgWidth * scaleFactor;
    var scaledHeight = imgHeight * scaleFactor;

    // Add the image to the PDF with the adjusted dimensions and centered
    doc.addImage(newImage, (doc.internal.pageSize.width - scaledWidth) / 2, (doc.internal.pageSize.height - scaledHeight) / 2, scaledWidth, scaledHeight);


    // doc.addImage(newImage, 0, 0);
    doc.save("ImaToPDF.pdf");
}