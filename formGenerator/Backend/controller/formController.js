const FormResponse = require("../Models/FormResponse");

exports.submitForm = async (req, res) => {
  try {
    let { steps } = req.body;
    try {
      console.log("Received body:", req.body); 
    }
    catch(e)
    {
      console.log(e);
    }
    // Handle raw JSON schema upload
    if (!steps && req.body.title && req.body.fields) {
      steps = [
        {
          stepTitle: req.body.title,
          data: Object.fromEntries(
            req.body.fields
              .filter(field => field.type !== "repeatable") // ignore repeatables without initial data
              .map((field) => [field.name, field.value || null])
          ),
        },
      ];
    }

    const saved = await FormResponse.insertMany(steps);
    res.status(201).json({ message: "Form submitted successfully", data: saved });
  } catch (error) {
    console.error("Submission error:", error);
    res.status(500).json({ message: "Error saving form data", error });
  }
};

exports.getAllResponses = async (req, res) => {
  try {
    const responses = await FormResponse.find();
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching responses", error });
  }
};