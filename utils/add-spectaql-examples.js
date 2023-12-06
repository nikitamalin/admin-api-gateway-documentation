const fs = require("fs");

// Specify the file path
const filePath = "./private/index.html";

// Read the HTML file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // Give examples for createdAt, insertedAt, updatedAt, lastTransactionDate, deletedAt, email, etc.

  function replaceStringField(fieldName, value) {
    if (value !== "null") {
      value = `"${value}"`;
    }
    const regex = new RegExp(
      `<span class="hljs-attr">"${fieldName}"<\\/span><span class="hljs-punctuation">:<\\/span> <span class="hljs-string">.*<\\/span><span class="hljs-punctuation">,<\\/span>`,
      "g"
    );
    data = data.replace(
      regex,
      `<span class="hljs-attr">"${fieldName}"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">${value}</span><span class="hljs-punctuation">,</span>`
    );
    const regex2 = new RegExp(
      `<span class="hljs-attr">"${fieldName}"<\\/span><span class="hljs-punctuation">:<\\/span> <span class="hljs-string">".*"<\\/span>\n`,
      "g"
    );
    data = data.replace(
      regex2,
      `<span class="hljs-attr">"${fieldName}"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">${value}</span>\n`
    );
  }

  function replaceNumberField(fieldName, value) {
    const regex = new RegExp(
      `<span class="hljs-attr">"${fieldName}"<\\/span><span class="hljs-punctuation">:<\\/span> <span class="hljs-number">.*<\\/span><span class="hljs-punctuation">,<\\/span>`,
      "g"
    );
    data = data.replace(
      regex,
      `<span class="hljs-attr">"${fieldName}"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">${value}</span><span class="hljs-punctuation">,</span>`
    );
    const regex2 = new RegExp(
      `> <span class="hljs-attr">"${fieldName}"<\\/span><span class="hljs-punctuation">:<\\/span> <span class="hljs-number">.*<\\/span><span class="hljs-punctuation">}<\\/span>\n`,
      "g"
    );
    data = data.replace(
      regex2,
      `> <span class="hljs-attr">"${fieldName}"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">${value}</span><span class="hljs-punctuation">}</span>\n`
    );
  }
  replaceStringField("createdAt", "2023-10-07T01:08:03.420Z");
  replaceStringField("insertedAt", "2023-10-07T01:08:03.420Z");
  replaceStringField("updatedAt", "2023-10-09T01:08:03.420Z");
  replaceStringField("lastTransactionDate", "2023-10-07T01:08:03.420Z");
  replaceStringField("lastTransaction", "2023-10-07T01:08:03.420Z");
  replaceStringField("deletedAt", "2023-10-15T01:08:03.420Z");
  replaceStringField("email", "kevensmith@gmail.com");
  replaceStringField("firstName", "Kevin");
  replaceStringField("middleName", "Alan");
  replaceStringField("lastName", "Smith");
  replaceStringField("fullName", "Kevin Alan Smith");
  replaceStringField("entityId", "a3f2504b-1c57-48ee-997b-4999c3f2a36b");
  replaceNumberField("entityId", "a3f2504b-1c57-48ee-997b-4999c3f2a36b");
  replaceStringField("organizationId", "6f2b9a8d-3d81-4e9c-bd45-ec85f37d6aeb");
  replaceNumberField("organizationId", "6f2b9a8d-3d81-4e9c-bd45-ec85f37d6aeb");
  replaceStringField("brand", "SHELL");
  replaceStringField("brandLabel", "Shell");
  replaceStringField("label", "Shell");
  replaceStringField("dateFrom", "2023-08-031T01:17:00.000Z");
  replaceStringField("dateTo", "2023-09-30T01:16:59.999Z");
  replaceStringField("from", "2023-08-031T01:17:00.000Z");
  replaceStringField("fromDate", "2023-08-031T01:17:00.000Z");
  replaceStringField("toDate", "2023-09-30T01:16:59.999Z");
  replaceStringField("to", "2023-09-30T01:16:59.999Z");
  replaceStringField("date", "2023-08-031T01:17:00.000Z");
  replaceStringField("localTime", "2023-08-030T06:17:00.000Z");
  replaceStringField("fromLocalDate", "2023-08-031T06:17:00.000Z");
  replaceStringField("toLocalDate", "2023-08-030T06:17:00.000Z");

  replaceStringField("utcTimeFrom", "2023-08-031T01:17:00.000Z");
  replaceStringField("utcTimeTo", "2023-09-30T01:16:59.999Z");
  replaceStringField("localTimeFrom", "2023-08-031T06:17:00.000Z");
  replaceStringField("localTimeTo", "2023-09-29T06:16:59.999Z");

  replaceStringField("transactionTime", "2023-08-031T01:17:00.000Z");

  replaceStringField("year", "2023");
  replaceNumberField("year", "2023");
  replaceNumberField("month", "09");

  replaceStringField("make", "Subaru");
  replaceStringField("model", "Outback");
  replaceStringField("odometer", "130056");
  replaceNumberField("odometer", "130056");

  replaceNumberField(
    "organizationIdNumber",
    "6f2b9a8d-3d81-4e9c-bd45-ec85f37d6aeb"
  );
  replaceStringField("externalId", "8a7e5c3f-2d46-4b89-bef8-9d1e70a4c2f7");
  replaceStringField("vin", "2T2ZK1BA0CC083223");
  replaceStringField("fileName", "report.xlsx");
  // data under filename
  replaceStringField("data", "3dvcmtzaGVldHMvc2hlZXQx3LUSNaF7/+ncPj+l5U7U...");
  replaceStringField("phoneNumber", "8005550100");
  replaceStringField("phone_number", "8005550100");
  replaceStringField("username", "kevensmith@gmail.com");
  replaceStringField("password", "?kEv!n999");
  replaceStringField("employeeId", "3b6c31a8-96c0-4e94-8235-fa3abf37e691");
  replaceNumberField("latitude", "37.7749");
  replaceNumberField("longitude", "-122.4194");
  replaceStringField("code", "2803");
  replaceStringField("path", "2801|2803|");
  replaceStringField("parentId", "7591da2e-29c7-4b88-ae9a-560107c023d1");
  replaceNumberField("parentId", "7591da2e-29c7-4b88-ae9a-560107c023d1");
  replaceStringField("customerId", "f5d7a90e-8b1a-4d25-b348-1cfd437d6a2f");
  replaceNumberField("countAffected", "4");
  replaceNumberField("outsideAirTemp", "null");
  replaceNumberField("outsideAirTempRaw", "null");
  replaceNumberField("outsideAirTempRaw", "null");
  replaceNumberField("barometricPressure", "null");
  replaceNumberField("engineOilTemp", "null");
  replaceNumberField("engineCoolantTemp", "null");
  replaceNumberField("transmissionOilTemp", "null");

  replaceStringField("fixStatus", "null");
  replaceNumberField("hdop", "null");
  replaceNumberField("rssi", "null");
  replaceNumberField("satellites", "null");

  replaceStringField("angleId", "89");
  replaceStringField("angleDescription", "Front angle medium view.");
  replaceStringField(
    "midsizePath",
    "//d1ypc8j62c29y8.cloudfront.net/midsize/9/5/f/b36...png"
  );
  replaceStringField(
    "fullsizePath",
    "//d1ypc8j62c29y8.cloudfront.net/fullsize/9/5/f/b36...png"
  );
  replaceStringField(
    "thumbnailPath",
    "//d1ypc8j62c29y8.cloudfront.net/thumbnail/9/5/f/b36...png"
  );

  const regex = new RegExp(
    `<span class="hljs-attr">"countAffected"<\\/span><span class="hljs-punctuation">:<\\/span> <span class="hljs-number">987<\\/span>`,
    "g"
  );
  data = data.replace(
    regex,
    `<span class="hljs-attr">"countAffected"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">4</span>`
  );

  replaceNumberField("deviceVoltage", "null");
  replaceNumberField("engineSpeed", "null");
  replaceNumberField("throttlePosition", "null");
  replaceNumberField("engineOperationalTime", "null");
  replaceNumberField("engineOilLifeRemaining", "null");
  replaceNumberField("fuelFilterLifeRemaining", "null");
  replaceNumberField("distanceSinceCodesCleared", "null");
  replaceNumberField("warmupSinceCodesCleared", "null");
  replaceNumberField("tirePressureRl", "null");
  replaceNumberField("tirePressureRr", "null");
  replaceNumberField("tirePressureFl", "null");
  replaceNumberField("tirePressureFr", "null");

  replaceStringField("policyId", "2e3ab6a4-8c1f-47d9-9df7-5a8b3c2e9c9d");
  replaceStringField("vehicleGroupId", "7a18b6c2-4f65-498d-bb87-3c91a0e2d1d0");
  replaceNumberField("vehicleGroupId", "7a18b6c2-4f65-498d-bb87-3c91a0e2d1d0");
  replaceStringField("id", "9cf12a87-6d8e-4a9a-a8bd-38f2d5a1d6b3");
  replaceNumberField("id", "9cf12a87-6d8e-4a9a-a8bd-38f2d5a1d6b3");
  replaceNumberField("idNumber", "9cf12a87-6d8e-4a9a-a8bd-38f2d5a1d6b3");
  replaceStringField("requestId", "bfb6c1a2-3f6d-4a8e-b1c7-9e5f3a2d1b0f");
  replaceNumberField("requestId", "bfb6c1a2-3f6d-4a8e-b1c7-9e5f3a2d1b0f");
  replaceStringField("transactionId", "bfb6c1a2-3f6d-4a8e-b1c7-9e5f3a2d1b0f");
  replaceNumberField("transactionId", "bfb6c1a2-3f6d-4a8e-b1c7-9e5f3a2d1b0f");
  replaceStringField(
    "paymentProviderId",
    "4e6d7b8a-9c23-4f1e-82d6-1b5c8f3a69d2"
  );
  replaceStringField("access_token", "eyJhbGciOiJSUzI1NiIsInR5cC...");
  replaceNumberField("expires_in", "10000");
  replaceStringField("scope", "openid profile offline_access");
  replaceStringField("token_type", "Bearer");
  replaceStringField("id_token", "eyJhbGciOiJSUzI1NiIsInR5cCI...");
  replaceStringField("refresh_token", "v1.MfhYWxMLMNtVvxNfuRaf7bt4rJVGYTy...");
  replaceStringField("predefinedRule", "");
  replaceStringField("amountPerDay", "125");
  replaceStringField("amountPerTransaction", "100");
  replaceNumberField("noOfTransactions", 5);
  replaceStringField("driverCount", 6);
  replaceNumberField("driverCount", 6);
  replaceNumberField("vehicleCount", 8);
  replaceStringField("licensePlate", "G0C6R1Q");
  replaceStringField("metadataLicensePlate", "G0C6R1Q");
  replaceStringField("licensePlateState", "CA");
  replaceStringField("metadataLicensePlateState", "CA");
  replaceNumberField("driverId", "fd21a54e-c8d9-4d22-b176-8ce4a2a3bdc7");
  replaceNumberField("userId", "a7f38c5e-6a92-4b25-8f09-2d47cbb1437d");
  replaceStringField("vehicleId", "e4a917d3-33f8-46f4-b8a9-6e8cf019fb5b");
  replaceNumberField("vehicleId", "e4a917d3-33f8-46f4-b8a9-6e8cf019fb5b");
  replaceStringField("issuerBin", "123456");
  replaceStringField("client_id", "y72HsQoZpLcRvFk3XnI4aP8bMqU2sWdJ");
  replaceStringField("client_secret", "kR9jE3pW2vN8sT6hA5zG1yL7oC4bQ0uX...");
  replaceStringField(
    "paymentProviderAccountId",
    "67d870f7-5087-4e2c-aebd-8f9af3d6b12b"
  );
  replaceStringField("loginType", "EMAIL");
  replaceStringField("otp", "1234");
  replaceStringField("status", "ONBOARDED");
  replaceStringField("amount", "100");
  replaceStringField("errorDescription", "");
  replaceStringField(
    "serviceProviderId",
    "af2d1b3f-8fb4-4c35-a3c9-7e9f8462a0d8"
  );

  replaceStringField("subtotal", "9.50");
  replaceStringField("tax", "0.50");
  replaceStringField("taxAmount", "0.50");
  replaceStringField("total", "10.00");
  replaceStringField("totalAmount", "10.00");
  replaceStringField("currency", "US");

  replaceStringField("unitPrice", "10.00");
  replaceStringField("units", "7");

  replaceStringField("productName", "Shell");
  replaceStringField("productTier", "REGULAR");

  replaceStringField("wkt", "POINT(37.7749, -122.4194)");
  replaceStringField("entityName", "Entity Name");
  replaceStringField("vehicleGroupNames", "Vehicle Group Names");
  replaceStringField("userStatus", "ONBOARDED");
  replaceStringField("usersCount", "6");
  replaceStringField("vehiclesCount", "8");
  replaceStringField("vehicleGroupName", "Vehicle Group Name");

  replaceStringField("searchText", "query");

  replaceStringField("itemId", "f8b392a6-91b3-4f76-b42f-c3f4dc92897a");
  replaceStringField("displayName", "1e5cfba2-6da1-4a77-9a5e-80e3b58bb0c9");

  replaceStringField("programId", "c9e6b1d8-3e44-4fae-aae0-2c87dabec77a");

  replaceStringField("pdfReceiptUrl", "https://pdf_receipt_url.com");

  function replaceMutationStringReturn(fieldName, value) {
    const regex = new RegExp(
      `<body><pre><code class="hljs language-json"><span class="hljs-punctuation">{<\\/span><span class="hljs-attr">"data"<\\/span><span class="hljs-punctuation">:<\\/span> <span class="hljs-punctuation">{<\\/span><span class="hljs-attr">"${fieldName}"<\\/span><span class="hljs-punctuation">:<\\/span> <span class="hljs-string">".*"<\\/span><span class="hljs-punctuation">}<\\/span><span class="hljs-punctuation">}<\\/span>`,
      "g"
    );
    data = data.replace(
      regex,
      `<body><pre><code class="hljs language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">"data"</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-attr">"${fieldName}"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"${value}"</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">}</span>`
    );
  }

  replaceMutationStringReturn("policyDelete", "Success");
  replaceMutationStringReturn("userDelete", "Success");
  replaceMutationStringReturn("userForgotPassword", "Success");
  replaceMutationStringReturn("userLoginOtpRequest", "Success");
  replaceMutationStringReturn("userOffboard", "Success");
  replaceMutationStringReturn("userSetPassword", "Success");
  replaceMutationStringReturn("vehicleCreate", "Success");
  replaceMutationStringReturn("vehicleGroupDelete", "Success");
  replaceMutationStringReturn("vehicleUpdate", "Success");

  function replaceSingleStringExample(fieldName, value) {
    const regex = new RegExp(
      `<body><pre><code class="hljs language-json"><span class="hljs-punctuation">{<\\/span><span class="hljs-attr">"${fieldName}"<\\/span><span class="hljs-punctuation">:<\\/span> <span class="hljs-string">".*"<\\/span><span class="hljs-punctuation">}<\\/span>`,
      "g"
    );
    data = data.replace(
      regex,
      `<body><pre><code class="hljs language-json"><span class="hljs-punctuation">{</span><span class="hljs-attr">"${fieldName}"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"${value}"</span><span class="hljs-punctuation">}</span>`
    );
  }

  replaceSingleStringExample("access_token", "eyJhbGciOiJSUzI1NiIsInR5cC...");
  replaceSingleStringExample("username", "kevensmith@gmail.com");
  replaceSingleStringExample(
    "policyId",
    "2e3ab6a4-8c1f-47d9-9df7-5a8b3c2e9c9d"
  );
  replaceSingleStringExample("vin", "2T2ZK1BA0CC083223");

  data = data.replace(
    /<div id="logo">\s*<img src="https:\/\/res.cloudinary.com\/dpibqp4rk\/image\/upload\/v1693529188\/CarIQ-Pay-RGB-Spacing-Final_vseszs.png" title="Car IQ API Reference" \/>\s*<\/div>/,
    '<a id="logo" href="/" target="_top">\n  <img\n    src="https://res.cloudinary.com/dpibqp4rk/image/upload/v1693529188/CarIQ-Pay-RGB-Spacing-Final_vseszs.png"\n    title="Car IQ API Reference"\n  />\n</a>'
  );

  fs.writeFile(filePath, data, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("Replacement successful!");
    }
  });
});
