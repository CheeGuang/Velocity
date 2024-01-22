// Importin Dependencies
const vision = require("@google-cloud/vision");
const express = require("express");
const path = require("path");
const app = express();
const port = 5500; // Port you want the server to listen on

// Serve static files from the directory containing your HTML file
app.use(express.static(__dirname + "/FED_Velocity_website/html"));

// Setting up Google Service Account
const CREDENTIALS = {
  type: "service_account",
  project_id: "eng-charge-411917",
  private_key_id: "e088e1e925b0fe62b0dcda993e162ac4a516ab03",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2paADd9yzQp51\ndzFa7GFi01kV3tuxnqf5yykfLAZqFymg30YlVMYe2pn5waqV1Sv+wQwzqxd8sBM1\nzOwJq19/+BqfN5oxjscBVaRRBRdtZHLQHFYmxPIjA61xKwPExyPj5W7Nsdx+3IWh\nUs8Dx47IKDRB/nG0HJJzPu5bC0ZzoYDdWvn9z8aChbgJH9w52Pyq9KwvjVpXGsuK\naLcRaZkUHGxgko/KExCvTEtsXvROKRazFY66a+C6qHX9CMv44fnIdJhJeVlQgqdA\nf3MyKezepR3nS40MgJ5kNiPfyl/vi3hnFAdN+XbvXse0AGgyjmVjNlrzR7UqcI0e\nr6OWNcyhAgMBAAECggEAMum7T4wveMbGvg7CMsq2oOIyMI8FZZ9IyrBPn7FZfmRD\nheUHPCvD6GDeUAkkwIyCLYrpmFOGggrg5/veBhn/zn++CAjrUgovPhd97NnC/Irm\nGE310+vNZWZGiEfJzqYGQqY3e14rjS9yjpQzQaX0jqXqX0UKs/7M8hQmRDnB40Q2\ntPliagfdOWPmGJs9kozn62tcA2niP9jQcXUXj60WJV4UetIFUw9FUsCgvs10hArz\npYu5SRZtlTcjmkgAbHqkdWizbmrkwt0Gbxn4xqwD6TyQs9DXVx8nNl4iXHbbn2Bt\nbmYHlTeDlnAh5NLB/TBdHsDW3regt3w7fMWw9KKGewKBgQDfqms8tqly+QBZFR0I\nhXRk9sbFf0jmmRJDDMGA3TuXf1VCZNcIJTNy+IUHjZwT0USawHn0VRGK64oyn65i\ns/iAntiCoDWGsBzjdFVs2hnozc4Fv8WfaURVIC7QTlRXCCVSOQqGRWOff1UOUAPM\nWMT880eIaNElc9cSq4Ej2LDLGwKBgQDRDSfXvjdFjjMdGRz+fWfNUhxvQ6jatwv/\nU25RYrq+P5h7LyWdXQT/dnHKq8kSwp2YhUdZ5VUVuYccxgCR29GzZpCaYOOl0NZM\n9PU3wKORDlUJ7PfqmOhpnWn2S4ZxaTdujauzMoLtLgaYNwfCSFwiwUexPqbb2GoA\ng5pDpa0m8wKBgQDRjp9YzB+pLCkqTcDdCgTKz/fedOp9u69DiQEH1sANqmzcfxSF\nei1hK/2f3Qr9+lUX1PyucsGz8gmScs/1hH9xKuLaSHa+EeWPKqEbEqGx4JmGA26K\ndBtk0nlqC+mzfVtSVUVKFltHxgqQFWHppMYz5VABO4uxVn6M7IlbZ5wFPwKBgEmE\nDdnh68ALJNB7z2VzpnhfAt7h9VSNAKwWo/n89V0IMlBHoTu4xZQtDBFQ3hI53IAR\nhqkHbCeKqgglXXftzM4BKKMRpZzfVy2TC1VC6oKNfrxR2FFo2nqhv+y8XJgvfy3i\nploLTl2oTOtkltbs6XHTdKnRNY6kiYqKvUpCziSfAoGAEzQ6FxekAMfA7l6ApHqV\n0ugdY5fY2RmlLGRcf17LyTJw12gFct+3ayBaJOC6cl8Vx7uMSQIqiWsP5MAKWyyY\nCkl7gf92iOTJKMW06VWki/lShvidVPcjNozyU3T/pvqpD169QYrHnsvFlDM5CL3T\nAjWqit41srh2Wmnf2frhsN8=\n-----END PRIVATE KEY-----\n",
  client_email: "jeffrey@eng-charge-411917.iam.gserviceaccount.com",
  client_id: "113446379298199313379",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/jeffrey%40eng-charge-411917.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
const CONFIG = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

// Creates a client
const client = new vision.ImageAnnotatorClient(CONFIG);

const detectProduct = async (file_path) => {
  const [labelDetection] = await client.labelDetection(
    // "C:/Users/Jeffr/Downloads/Telegram Desktop/photo_2023-04-23_22-59-19.jpg"
    path.join(__dirname, "../images/image-search-shoe1.png")
  );
  const [imageProperties] = await client.imageProperties(
    path.join(__dirname, "../images/image-search-shoe1.png")
  );
  const labels = labelDetection.labelAnnotations;
  const colors =
    imageProperties.imagePropertiesAnnotation.dominantColors.colors;
  result = [labels, colors];
  return result;
};

// Sending HTML to Front-End
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../FED_Velocity_website/html/image-search.html")
  );
});

// Send Product details JSON to Front-End
app.get("/api/imageSearch", (req, res) => {
  detectProduct().then((details) => res.json(details));
});

// Display Message saying server is up
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
