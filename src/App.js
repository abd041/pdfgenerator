import "./App.css";
import { jsPDF } from "jspdf";
import { useState } from "react";
function App() {
  const [text, setText] = useState("");

  const handletextChange = (e) => {
    setText(e.target.value);
  };
  const generatePDF = () => {
    const doc = new jsPDF("landscape");

    var splitTitle = doc.splitTextToSize(text, 270);
    var pageHeight = doc.internal.pageSize.height;
    var y = 15;
    for (var i = 0; i < splitTitle.length; i++) {
      if (y > 250) {
        y = 15;
        doc.addPage();
      }
      doc.text(splitTitle[i], 7, y);
      y = y + 10;
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
