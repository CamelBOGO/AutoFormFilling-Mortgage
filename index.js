// import { PDFDocument } from "pdf-lib"

async function flattenForm() {
    // Download the PDF form from the URL.
    const formUrl = "https://jocason-housing.com/renovation/referral-form/referral-form.pdf"
    const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFLib.PDFDocument.load(formPdfBytes);
    // Get the form from the PDF document.
    const form = pdfDoc.getForm();

    // Fill in the form fields with some values.
    form.getTextField("fill_name_e_1").setText(document.getElementById("name_e_1").value);
    form.getTextField("fill_id_1").setText(document.getElementById("hkid_1").value);
    form.getTextField("fill_name_e_2").setText(document.getElementById("name_e_2").value);
    form.getTextField("fill_id_2").setText(document.getElementById("hkid_2").value);
    form.getTextField("fill_mobile").setText(document.getElementById("phone_1").value);

    form.getTextField("fill_flat").setText(document.getElementById("room").value);
    form.getTextField("fill_floor").setText(document.getElementById("floor").value);
    form.getTextField("fill_block").setText(document.getElementById("block").value);
    form.getTextField("fill_building").setText(document.getElementById("building").value);
    form.getTextField("fill_district").setText(document.getElementById("district").value);

    // Get the selected mortgage type value.
    const mortgageType = document.getElementById("mortgage_type").value;
    // Set the corresponding checkbox based on the selected value.
    if (mortgageType === "new_mortgage") {
        form.getCheckBox("toggle_new_purchase").check();
    } else if (mortgageType === "refinance" || mortgageType === "cash_out_refinancing") {
        form.getCheckBox("toggle_others").check();
    }

    form.getTextField("fill_loan_amount").setText(document.getElementById("loan_amount").value);


    // Flatten and save the form to a new PDF file.
    form.flatten();
    const pdfBytes = await pdfDoc.save();

    // Create a auto clicking download link for the new PDF file.
    // This will trigger the browser's download dialog.
    const a = Object.assign(document.createElement("a"), {
        href: URL.createObjectURL(new Blob([pdfBytes], { type: "application/pdf" })),
        download: "referral-form.pdf"
    });
    a.click();
}

// flattenForm().then(() => {
//     console.log("PDF Form Flattened and Saved");
// }).catch(err => {
//     console.error("Error flattening PDF form:", err)
// })