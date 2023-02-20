const date = new Date();
console.log(date);
console.log(date.getTime());
console.log();

/* Region specific */
console.log("======== Region specific =========");
const enDate = new Intl.DateTimeFormat("en-US").format(date);
const daDate = new Intl.DateTimeFormat("da-DK").format(date);

console.log(enDate);
console.log(daDate);
