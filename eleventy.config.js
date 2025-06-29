// HTML Minifier
import htmlmin from "html-minifier-terser";

// lodash
import lodash from "lodash";

// Luxon
import { DateTime } from "luxon";
// See https://moment.github.io/luxon/#/zones?id=specifying-a-zone
const TIME_ZONE = "America/Los_Angeles";

// 11ty RSS
import pluginRss from "@11ty/eleventy-plugin-rss";

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
     RSS
     ========== */
  eleventyConfig.addPlugin(pluginRss);

  /* ==========
     Custom Global Data
     ========== */
  eleventyConfig.addGlobalData('lastBuildDate', () => {
    const now = DateTime.now();
    let nowISO = now.toISO();
    return nowISO;
  });
  
  /* ==========
  Date Parsing
  ========== */
  eleventyConfig.addDateParsing(function(dateValue) {
		let localDate;
		if(dateValue instanceof Date) { // and YAML
			localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true });
		} else if(typeof dateValue === "string") {
			localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
		}
		if (localDate?.isValid === false) {
			throw new Error(`Invalid \`date\` value (${dateValue}) is invalid for ${this.page.inputPath}: ${localDate.invalidReason}`);
		}
		return localDate;
	});

  /* ==========
    Custom Collections
    ========== */
	// Unsorted items (in whatever order they were added)
	// Sort with `Array.sort`
	eleventyConfig.addCollection("allSorted", function (collectionsApi) {
		return collectionsApi.getAll().sort(function (a, b) {
			//return a.date - b.date; // sort by date - ascending
			return b.date - a.date; // sort by date - descending
			//return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
			//return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
		});
	});

  /* ==========
    Shortcodes
    ========== */
  //Email Link
  eleventyConfig.addShortcode("emailLink", async function emailLink(email) {
    return `<a href="mailto:${email}">${email}</a>`
  }
  );
  eleventyConfig.addShortcode("emailLinkPair", async function emailLink(email) {
    return `<a href="mailto:${email}">`
  }
  );
  eleventyConfig.addShortcode("endEmailLinkPair", async function emailLink() {
    return `</a>`
  }
  );

  //External Link
  eleventyConfig.addShortcode("extLink", async function extLink(linkText, linkURL) {
    return `<a href="${linkURL}" target="_blank">${linkText}</a>`
  }
  );
  eleventyConfig.addShortcode("extLinkPair", async function extLink(linkURL) {
    return `<a href="${linkURL}" target="_blank">`
  }
  );
  eleventyConfig.addShortcode("endExtLinkPair", async function extLink(linkText, linkURL) {
    return `</a>`
  }
  );

  //Internal Link
  eleventyConfig.addShortcode("intLink", async function extLink(linkText, linkURL) {
    return `<a href="${linkURL}">${linkText}</a>`
  }
  );
  eleventyConfig.addShortcode("intLinkPair", async function extLink(linkURL) {
    return `<a href="${linkURL}">`
  }
  );
  eleventyConfig.addShortcode("endIntLinkPair", async function extLink(linkText, linkURL) {
    return `</a>`
  }
  );

  //Link Button Set
  eleventyConfig.addShortcode("linkButtonSet", async function linkButtonSet() {
    return `<div class="link-buttons">`
  });
  eleventyConfig.addShortcode("linkButtonSetColumn", async function linkButtonSet() {
    return `<div class="link-buttons link-buttons-column">`
  });
  eleventyConfig.addShortcode("linkButtonSetFw", async function linkButtonSet() {
    return `<div class="link-buttons link-buttons-fw">`
  });
  eleventyConfig.addShortcode("linkButton", async function linkButton(linkBtnLabel, linkBtnLink) {
    return `<a href="${linkBtnLink}" target="_blank"><button>${linkBtnLabel}</button></a>`
  });
  eleventyConfig.addShortcode("linkButtonSetGrow", async function linkButtonSetGrow() {
    return `<div class="link-buttons link-buttons-grow">`
  });
  eleventyConfig.addShortcode("endLinkButtonSet", async function endLinkButtonSet() {
    return `</div>`
  });
  
  /* ==========
  Filters
  ========== */
  /* Custom Taxonomy */
  eleventyConfig.addFilter("taxonomy", (arr, path, value) => {

    value = lodash.deburr(value).toLowerCase();

    return arr.filter((item) => {
      let pathValue = lodash.get(item, path);
      pathValue = lodash.deburr(pathValue).toLowerCase();
      return pathValue.includes(value);
    });

  });
  eleventyConfig.addFilter(
    "date",
    (date, format, locale = "en") =>
      DateTime.fromISO(date).setLocale(locale).toFormat(format)
  )

  eleventyConfig.addFilter(
    "fullDateToYear", (date) => DateTime.fromJSDate(date).toFormat('kkkk')
  )
  eleventyConfig.addFilter(
    "JStoDateTimeMed", (date) => DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_MED)
  )
  eleventyConfig.addFilter(
    "ISOtoDateTimeMed", (date) => DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)
  )
  eleventyConfig.addFilter(
    "JStoTimezone", (date) => DateTime.fromJSDate(date).toFormat('ZZZZ')
  )
  eleventyConfig.addFilter(
    "ISOtoTimezone", (date) => DateTime.fromISO(date).toFormat('ZZZZ')
  )
  eleventyConfig.addFilter(
    "JStoRelative", (date) => DateTime.fromJSDate(date).toRelative()
  )
  eleventyConfig.addFilter(
    "ISOtoRelative", (date) => DateTime.fromISO(date).toRelative()
  )

  eleventyConfig.addFilter(
    "makeTitleCase", function (input) {
      return lodash.startCase(input);
    });

  eleventyConfig.addFilter('log', value => {
    console.log(value)
  });

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