function unregisterEndpoint() {
  const serverEndpoint =
    "http://webhook-michael.westeurope.cloudapp.azure.com/unregister";

  const endpoint = "https://59f2-89-23-224-111.eu.ngrok.io/bob";
  const data = {endpoint};
  fetch(serverEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({endpoint}),
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
}

function unregisterMyEndpoint() {
  const serverEndpoint = "http://40.113.32.16:8080/webhooks/unregister";
  fetch(serverEndpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      endpoint: "https://59f2-89-23-224-111.eu.ngrok.io/bob",
    }),
  }).then((res) => console.log(res));
}

unregisterEndpoint();
// unregisterMyEndpoint();
