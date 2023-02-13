// encode a string to base64
const str = "Hello World";

const encodedStr = Buffer.from(str).toString("base32");
console.log(encodedStr);

const decoded = Buffer.from(encodedStr, "base64").toString("utf8");
console.log(decoded);
