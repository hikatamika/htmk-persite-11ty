// HTML Minifier
import htmlmin from "html-minifier-terser";

// lodash
import lodash from "lodash";

// Luxon
import { DateTime } from "luxon";
// See https://moment.github.io/luxon/#/zones?id=specifying-a-zone
const TIME_ZONE = "America/Los_angeles";

export const config = {
  dir: {
    // What goes into 11ty
    input: "src"
  }
};

export default function (eleventyConfig) {
  // Copy assets
  {
    eleventyConfig.addPassthroughCopy("src/src/css/**/*.min.css");
    eleventyConfig.addPassthroughCopy("src/src/fonts");
    eleventyConfig.addPassthroughCopy("src/src/img");
    eleventyConfig.addPassthroughCopy("src/src/js/**/*.min.js");
    eleventyConfig.addPassthroughCopy("src/src/fontawesome");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
  }

  /* ==========
     Custom Taxonomy
     ========== */
  eleventyConfig.addFilter("taxonomy", (arr, path, value) => {

    value = lodash.deburr(value).toLowerCase();

    return arr.filter((item) => {
      let pathValue = lodash.get(item, path);
      pathValue = lodash.deburr(pathValue).toLowerCase();
      return pathValue.includes(value);
    });

  });

  /* ==========
     Date Parsing
     ========== */
  eleventyConfig.addDateParsing(function (dateValue) {
    let localDate;
    if (dateValue instanceof Date) { // and YAML
      localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true });
    } else if (typeof dateValue === "string") {
      localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
    }
    if (localDate?.isValid === false) {
      throw new Error(`Invalid \`date\` value (${dateValue}) is invalid for ${this.page.inputPath}: ${localDate.invalidReason}`);
    }
    return localDate;
  });

  /* ==========
     Filters
     ========== */
  eleventyConfig.addFilter(
    "date",
    (date, format, locale = "en") =>
      DateTime.fromISO(date).setLocale(locale).toFormat(format)
  )

  eleventyConfig.addFilter(
    "fullDateToYear", (date) => DateTime.fromJSDate(date).toFormat('kkkk')
  )

  // HTML Minify
  eleventyConfig.addTransform("htmlmin", function (content) {
    if ((this.page.outputPath || "").endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      return minified;
    }

    // If not an HTML output, return content as-is
    return content;
  });
}