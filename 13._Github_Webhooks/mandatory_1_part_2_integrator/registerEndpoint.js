// For Michael's server
function registerEndpoint() {
  const serverEndpoint =
    "http://webhook-michael.westeurope.cloudapp.azure.com/register";

  const type = "payment";
  const endpoint = "https://59f2-89-23-224-111.eu.ngrok.io/bob";
  const webhookName = "bob";
  const data = {type, endpoint, webhookName};
  fetch(serverEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

// For my server
function registerMyEndpoint() {
  const serverEndpoint = "http://40.113.32.16:8080/webhooks/register";
  fetch(serverEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      eventType: "bob",
      endpoint: "https://59f2-89-23-224-111.eu.ngrok.io/bob",
    }),
  }).then((res) => console.log(res));
}

registerEndpoint();
// registerMyEndpoint();
