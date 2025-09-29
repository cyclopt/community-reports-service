const numberFormatter = (x, tz = "en-US") => ((x) ? Intl.NumberFormat(tz).format(x) : "0");

export default numberFormatter;
