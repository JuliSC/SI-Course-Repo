import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// Functions
const login = async () => {
  const response = await fetch(`${ROOT_URL}/login`, {
    method: "POST",
    body: formData,
  });

  const res = await response.json();
  api_key = res.user_api_key;
  console.log("Logged in and got API_KEY = ", api_key);
};

const sendSMS = async (message, phone) => {
  try {
    const smsData = await initFormData({
      user_api_key: api_key,
      sms_message: message,
      sms_to_phone: phone,
    });

    const res = await fetch(`${ROOT_URL}/send-sms`, {
      method: "POST",
      body: smsData,
    });

    if (res.status !== 200) {
      throw new Error("Error occurred while sending SMS");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  return {message, phone};
};

const initFormData = async (obj) => {
  return new Promise((resolve) => {
    const formData = new FormData();
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        formData.append(key, obj[key]);
      }
    }
    resolve(formData);
  });
};

// Init
const ROOT_URL = "https://fiotext.com";
let api_key = "";
const formData = await initFormData({
  user_email: "juli252k@stud.kea.dk",
  user_password: "Password!234",
});
const app = express();

app.use(cors());
app.use(bodyParser.json());

await login();

// Endpoints
app.post("/send-sms", async (req, res) => {
  const {message, phone} = req.body;
  try {
    await sendSMS(message, phone);
    res.status(200).send({message: "SMS sent successfully!"});
  } catch (error) {
    if (error) {
      console.log("Error occurred while sending SMS, trying to login again...");
      await login();
      await sendSMS(message, phone);
      res.status(200).send({message: "SMS sent successfully!"});
    }
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
