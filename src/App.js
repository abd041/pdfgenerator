import "./App.css";
import { jsPDF } from "jspdf";
import { useState } from "react";
import { AmiriRegular } from "./fonts";

function App() {
  const [text, setText] = useState("");

  const handletextChange = (e) => {
    setText(e.target.value);
  };
  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "landscape",
      filters: ["ASCIIHexEncode"],
    });
    doc.addFileToVFS("Amiri-Regular.ttf", AmiriRegular);
    doc.addFont("Amiri-Regular.ttf", "Amiri", "normal");

    doc.setFont("Amiri"); // set font
    doc.setFontSize(18);

    var splitTitle = doc.splitTextToSize(text, 270);
    var pageHeight = doc.internal.pageSize.height;
    var y = 7;
    for (var i = 0; i < splitTitle.length; i++) {
      if (y > 250) {
        y = 15;
        doc.addPage();
      }
      doc.text(splitTitle[i], 7, y);
      y = y + 15;
    }
    doc.save("my.pdf");
  };
  return (
    <div className="App">
      <div className="Text_area">
        <textarea
          value={text}
          onChange={handletextChange}
          id="generatePdf"
          name="generatePdf"
          rows="8"
          cols="50"
        />
      </div>
      <button onClick={generatePDF} id="generatePdfBtn">
        Download Pdf
      </button>
    </div>
  );
}

export default App;
