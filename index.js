// import { PDFDocument } from "pdf-lib"

async function flattenForm() {
    const formUrl = "https://jocason-housing.com/renovation/referral-form/referral-form.pdf"
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());

    const pdfDoc = await PDFLib.PDFDocument.load(formPdfBytes);

    const form = pdfDoc.getForm();

    form.getTextField("fill_10").setText("Some Text Here!!!");

    form.flatten();

    const pdfBytes = await pdfDoc.save();

    const a = Object.assign(document.createElement("a"), {
        href: URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" })),
        download: "flattened_form.pdf"
    });
    a.click();
}

flattenForm().then(() => {
    console.log("PDF Form Flattened and Saved");
}).catch(err => {
    console.error("Error flattening PDF form:", err)
})