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

import {
  labProgressList, labProgressBar, labCheckList, labCheckItem
} from "./src/pages/the-lab.js";

export const config = {
  dir: {
    // What goes into 11ty
    input: "src",
    output: "public_html"
  }
};

export default function (eleventyConfig) {
  // Don't follow GitIgnore
  eleventyConfig.setUseGitIgnore(false);

  // Copy assets
  {
    // Server
    eleventyConfig.addPassthroughCopy("src/.htaccess");
    // Assets
    eleventyConfig.addPassthroughCopy("src/src/css/**/*.min.css");
    eleventyConfig.addPassthroughCopy("src/src/css/vendor/**/*.min.css");
    eleventyConfig.addPassthroughCopy("src/src/fonts");
    eleventyConfig.addPassthroughCopy("src/src/img");
    eleventyConfig.addPassthroughCopy("src/src/js/**/*.min.js");
    eleventyConfig.addPassthroughCopy("src/src/js/vendor/**/*.min.js");
    eleventyConfig.addPassthroughCopy("src/src/fontawesome");
    eleventyConfig.addPassthroughCopy("src/src/swiper");
    // Robots
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    // Favicons
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/android-chrome-192x192.png");
    eleventyConfig.addPassthroughCopy("src/android-chrome-512x512.png");
    eleventyConfig.addPassthroughCopy("src/apple-touch-icon.png");
    eleventyConfig.addPassthroughCopy("src/favicon-16x16.png");
    eleventyConfig.addPassthroughCopy("src/favicon-32x32.png");
    eleventyConfig.addPassthroughCopy("src/mstile-150x150.png");
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
	// eleventyConfig.addDateParsing(function(dateValue) {
	// 	let localDate;
	// 	if(dateValue instanceof Date) { // and YAML
	// 		localDate = DateTime.fromJSDate(dateValue, { zone: "utc" }).setZone(TIME_ZONE, { keepLocalTime: true });
	// 	} else if(typeof dateValue === "string") {
	// 		localDate = DateTime.fromISO(dateValue, { zone: TIME_ZONE });
	// 	}
	// 	if (localDate?.isValid === false) {
	// 		throw new Error(`Invalid \`date\` value (${dateValue}) is invalid for ${this.page.inputPath}: ${localDate.invalidReason}`);
	// 	}
	// 	return localDate;
	// });

  /* ==========
    Custom Collections
    ========== */
	// Unsorted items (in whatever order they were added)
	// Sort with `Array.sort`
	eleventyConfig.addCollection("allSorted", function (collectionsApi) {
		return collectionsApi.getAll().sort(function (a, b) {
			return a.date - b.date; // sort by date - ascending
			// return b.date - a.date; // sort by date - descending
			//return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
			//return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
		});
	});

  eleventyConfig.addCollection("blogTagList", async function(collectionsApi) {
    const blogTagSet = new Set();

    collectionsApi.getAll().map( item => {
      if (item.data.blogTags) { // handle pages that don't have tags
          item.data.blogTags.map( tag => blogTagSet.add(tag))
      };
    });

    const blogTagArray = Array.from(blogTagSet).sort(async function(a,b) {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if(a == b) return 0;
      return a < b ? -1 : 1;
    });

    // console.log(blogTagSet);
    console.log(blogTagArray);

    return blogTagArray;
  });

  eleventyConfig.addCollection("blogCategList", async function(collectionsApi) {
    const blogCategSet = new Set();

    collectionsApi.getAll().map( item => {
      if (item.data.blogCategs) { // handle pages that don't have tags
          item.data.blogCategs.map( tag => blogCategSet.add(tag))
      };
    });

    const blogCategArray = Array.from(blogCategSet).sort(async function(a,b) {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if(a == b) return 0;
      return a < b ? -1 : 1;
    });

    // console.log(blogCategSet);
    console.log(blogCategArray);

    return blogCategArray;
  });
  // Marco!!
  eleventyConfig.addCollection("noteTagList", async function(collectionsApi) {
    const noteTagSet = new Set();

    collectionsApi.getAll().map( item => {
      if (item.data.noteTags) { // handle pages that don't have tags
          item.data.noteTags.map( tag => noteTagSet.add(tag))
      };
    });

    const noteTagArray = Array.from(noteTagSet).sort(async function(a,b) {
      a = a.toLowerCase();
      b = b.toLowerCase();
      if(a == b) return 0;
      return a < b ? -1 : 1;
    });

    // console.log(noteTagSet);
    console.log(noteTagArray);

    return noteTagArray;
  });

  /* ==========
    Shortcodes
    ========== */
  eleventyConfig.addPairedShortcode("labProgressList", labProgressList);
  eleventyConfig.addShortcode("labProgressBar", labProgressBar);
  eleventyConfig.addPairedShortcode("labCheckList", labCheckList);
  eleventyConfig.addShortcode("labCheckItem", labCheckItem);

  // Mini NavList
  eleventyConfig.addPairedShortcode("miniNav", async function miniNav(content) {
    return `<ul class="mininav">${content}</ul>`
  }
  );
  eleventyConfig.addShortcode("miniNavItem", async function miniNavItem(label, link) {
    return `<li><a href="${link}">${label}</a></li>`
  }
  );

  // ButtonRoll
  eleventyConfig.addPairedShortcode("buttonRoll", async function buttonRoll(content) {
    return `<ul class="button-roll block-spaced">${content}</ul>`
  }
  );
eleventyConfig.addPairedShortcode("buttonRollCenter", async function buttonRollCenter(content) {
    return `<ul class="button-roll block-spaced block-item-center">${content}</ul>`
  }
  );

  // LinkRoll
  eleventyConfig.addPairedShortcode("linkRoll", async function linkRoll(content) {
    return `<ul class="link-roll block-spaced">${content}</ul>`
  }
  );
  eleventyConfig.addPairedShortcode("linkRollCenter", async function linkRollCenter(content) {
    return `<ul class="link-roll block-spaced block-item-center">${content}</ul>`
  }
  );
  
  // Email Link
  eleventyConfig.addShortcode("emailLink", async function emailLink(email) {
    return `<a href="mailto:${email}">${email}</a>`
  }
  );
  eleventyConfig.addPairedShortcode("emailLinkPair", async function emailLink(content, email) {
    return `<a href="mailto:${email}">${content}</a>`
  }
  );

  //External Link
  eleventyConfig.addShortcode("extLink", async function extLink(linkText, linkURL) {
    return `<a href="${linkURL}" target="_blank">${linkText}</a>`
  }
  );
  eleventyConfig.addPairedShortcode("extLinkPair", async function extLink(content, linkURL) {
    return `<a href="${linkURL}" target="_blank">${content}</a>`
  }
  );

  //Internal Link
  eleventyConfig.addShortcode("intLink", async function extLink(linkText, linkURL) {
    return `<a href="${linkURL}">${linkText}</a>`
  }
  );
  eleventyConfig.addPairedShortcode("intLinkPair", async function extLink(content, linkURL) {
    return `<a href="${linkURL}">${content}</a>`
  }
  );

  //Link Button Set
  eleventyConfig.addShortcode("linkButtonSet", async function linkButtonSet() {
    return `<div class="link-buttons block-spaced">`
  });
  eleventyConfig.addShortcode("linkButtonSetRow", async function linkButtonSet() {
    return `<div class="link-buttons link-buttons-row block-item-center block-spaced">`
  });
  eleventyConfig.addShortcode("linkButtonSetColumn", async function linkButtonSet() {
    return `<div class="link-buttons link-buttons-column block-item-center block-spaced">`
  });
  eleventyConfig.addShortcode("linkButtonSetFw", async function linkButtonSet() {
    return `<div class="link-buttons link-buttons-fw block-spaced">`
  });
  eleventyConfig.addShortcode("linkButtonSetGrow", async function linkButtonSetGrow() {
    return `<div class="link-buttons link-buttons-grow block-spaced">`
  });

  eleventyConfig.addShortcode("gallWeblinkButton", async function gallWeblinkButton(linkBtnIcon, linkBtnLink) {
    if (linkBtnIcon == 'bluesky' || linkBtnIcon == 'instagram' || linkBtnIcon == 'mastodon' || linkBtnIcon == 'pixelfed' || linkBtnIcon == 'pixiv' || linkBtnIcon == 'reddit' || linkBtnIcon == 'threads'  || linkBtnIcon == 'tiktok' || linkBtnIcon == 'tumblr' || linkBtnIcon == 'youtube') {
      return `<a href="${linkBtnLink}" target="_blank"><button class="gall-weblink-btn"><i class="fa-brands fa-${linkBtnIcon} fa-fw"></i></button></a>`
    }
    if (linkBtnIcon == 'artfol' ||  linkBtnIcon == 'cara' || linkBtnIcon == 'cohost' || linkBtnIcon == 'foriio' || linkBtnIcon == 'kofi' || linkBtnIcon == 'pillowfort' || linkBtnIcon == 'sheezyart' || linkBtnIcon == 'yt-shorts') {
      return `<a href="${linkBtnLink}" target="_blank"><button class="gall-weblink-btn"><img class="gall-weblink-icon" src="/src/img/socmed-icon/${linkBtnIcon}.svg" alt="${linkBtnIcon} icon"></button></a>`
    }
    if (linkBtnIcon == 'inkblot') {
      return ``
    }
  });
  eleventyConfig.addShortcode("gallSupportButton", async function gallSupportButton(linkBtnIcon, linkBtnLabel, linkBtnLink) {
    if (linkBtnIcon == 'kofi') {
      return `<a href="${linkBtnLink}" target="_blank"><button><img class="gall-weblink-icon gall-supportlink-icon btn-engage-icon" src="/src/img/socmed-icon/${linkBtnIcon}.svg" alt="${linkBtnIcon} icon"><span class="gall-supportlink-btn">${linkBtnLabel}</span></button></a>`
    }
  });

  eleventyConfig.addShortcode("extLinkButton", async function extLinkButton(linkBtnLabel, linkBtnLink) {
    return `<a href="${linkBtnLink}" target="_blank"><button>${linkBtnLabel}</button></a>`
  });
  eleventyConfig.addPairedShortcode("extLinkButtonPair", async function extLinkButtonPair(content, linkBtnLink) {
    return `<a href="${linkBtnLink}" target="_blank"><button>${content}</button></a>`
  });
  eleventyConfig.addShortcode("intLinkButton", async function intLinkButton(linkBtnLabel, linkBtnLink) {
    return `<a href="${linkBtnLink}"><button>${linkBtnLabel}</button></a>`
  });
  eleventyConfig.addPairedShortcode("intLinkButtonPair", async function intLinkButtonPair(content, linkBtnLink) {
    return `<a href="${linkBtnLink}"><button>${content}</button></a>`
  });
  eleventyConfig.addShortcode("endlinkButtonSet", async function endlinkButtonSet() {
    return `</div>`
  });

  // Links Page
  eleventyConfig.addShortcode("linksIconButton", async function linksIconButton(linkBtnIcon, linkBtnSite, linkBtnLink) {
    if (linkBtnIcon == 'bluesky' || linkBtnIcon == 'instagram' || linkBtnIcon == 'mastodon' || linkBtnIcon == 'pixelfed' || linkBtnIcon == 'pixiv' || linkBtnIcon == 'reddit' || linkBtnIcon == 'threads' || linkBtnIcon == 'tiktok' || linkBtnIcon == 'tumblr' || linkBtnIcon == 'twitch' || linkBtnIcon == 'youtube') {
      return `<a href="${linkBtnLink}" target="_blank" title="${linkBtnSite}"><button class="gall-weblink-btn"><i class="fa-brands fa-${linkBtnIcon} fa-fw"></i></button></a>`
    }
    if (linkBtnIcon == 'globe' || linkBtnIcon == 'house-chimney') {
      return `<a href="${linkBtnLink}" target="_blank" title="${linkBtnSite}"><button class="gall-weblink-btn"><i class="fa-solid fa-${linkBtnIcon} fa-fw"></i></button></a>`
    }
    if (linkBtnIcon == 'artfol' ||  linkBtnIcon == 'cara' || linkBtnIcon == 'cohost' || linkBtnIcon == 'foriio'  || linkBtnIcon == 'inkblot' || linkBtnIcon == 'kofi' || linkBtnIcon == 'pillowfort' || linkBtnIcon == 'sheezyart' || linkBtnIcon == 'wavebox' || linkBtnIcon == 'yt-shorts') {
      return `<a href="${linkBtnLink}" target="_blank" title="${linkBtnSite}"><button class="gall-weblink-btn"><img class="gall-weblink-icon" src="/src/img/socmed-icon/${linkBtnIcon}.svg" alt="${linkBtnIcon} icon"></button></a>`
    }
  });
    eleventyConfig.addShortcode("linksTextButton", async function linksTextButton(linkBtnIcon, linkBtnLabel, linkBtnLink) {
    if (linkBtnIcon == 'kofi') {
      return `<a href="${linkBtnLink}" target="_blank"><button><img class="gall-weblink-icon gall-supportlink-icon btn-engage-icon" src="/src/img/socmed-icon/${linkBtnIcon}.svg" alt="${linkBtnIcon} icon"><span class="gall-supportlink-btn">${linkBtnLabel}</span></button></a>`
    }
        if (linkBtnIcon == 'cart-shopping' || linkBtnIcon == 'briefcase' || linkBtnIcon == 'images' || linkBtnIcon == 'envelope' || linkBtnIcon == 'rss' || linkBtnIcon == 'paintbrush' || linkBtnIcon == 'keyboard' || linkBtnIcon == 'comment') {
      return `<a href="${linkBtnLink}" target="_blank"><button><span class="btn-engage-icon"><i class="fa-solid fa-${linkBtnIcon} fa-fw"></i></span><span class="gall-supportlink-btn">${linkBtnLabel}</span></button></a>`
    }
  });

  //Blog Text Items
  eleventyConfig.addPairedShortcode("justifyCenter", async function justifyCenter(content) {
    return `<p style="text-align: center;">${content}</p>`
  });

  //Photoset Items
  eleventyConfig.addPairedShortcode("photoset", async function photoset(content) {
    return `<div class="photoset photoswipeable block-spaced block-spaced-bottom">${content}</div>`
  });
  eleventyConfig.addPairedShortcode("photosetRow", async function photosetRow(content) {
    return `<div class="photoset-row">${content}</div>`
  });
  eleventyConfig.addShortcode("photosetItem", async function photosetItem(src, alt) {
    return `<div class="photoset-item"><img src="${src}" alt="${alt}" class="block-img"></div>`
  });
  eleventyConfig.addPairedShortcode("photosetZoom", async function photosetZoom(content, zoomSrc, zoomWidth, zoomHeight) {
    return `<a class="photoswipee image-link" href="${zoomSrc}" data-pswp-width="${zoomWidth}" data-pswp-height="${zoomHeight}"
              target="_blank">${content}</a>`
  });

  //Content Embeds
  eleventyConfig.addShortcode("youTubeEmbed", async function youTubeEmbed(id) {
    return `
      <div class="block-1col block-spaced block-yt-embed">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `
  });
  eleventyConfig.addShortcode("ytShortsEmbed", async function ytShortsEmbed(id) {
    return `
      <div class="block-1col block-spaced block-yt-shorts">
        <iframe width="415" height="738" src="https://www.youtube.com/embed/${id}" title="YouTube Shorts Video Player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    `
  });
  eleventyConfig.addShortcode("spotifyEmbedCompact", async function spotifyEmbedCompact(itemTypeSlashId) {
    return `
      <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/${itemTypeSlashId}" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    `
  });
  eleventyConfig.addShortcode("spotifyEmbedStandard", async function spotifyEmbedStandard(itemTypeSlashId) {
    return `
      <iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/${itemTypeSlashId}" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    `
  });


  /* ==========
  Filters
  ========== */

  /* Excerpts */
  eleventyConfig.addFilter("excerpt", (post) => {
    const content = post.replace(/(<([^>]+)>)/gi, "");
    return content.substr(0, content.lastIndexOf(" ", 500)) + "...";
  });  

  /* Custom Taxonomy */
  eleventyConfig.addFilter("includes", (arr, path, value) => {

    value = lodash.deburr(value).toLowerCase();

    return arr.filter((item) => {
      let pathValue = lodash.get(item, path);
      pathValue = lodash.deburr(pathValue).toLowerCase();
      return pathValue.includes(value);
    });

  });
    eleventyConfig.addFilter("excludes", (arr, path) => {

    return arr.filter((item) => {
      let pathValue = lodash.get(item, path);
        if (pathValue == null){
            return true
        }
        else{
            return false
        }
    });

  });

  eleventyConfig.addFilter(
    "JSDatetoISO", (date) => DateTime.fromJSDate(date).toISO()
  );
  eleventyConfig.addFilter(
    "ISOtoJSDate", (date) => DateTime.fromISO(date).toJSDate()
  );
  eleventyConfig.addFilter(
    "JStoDateMed", (date) => DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_MED)
  );
  eleventyConfig.addFilter(
    "JStoDateMed1", (date) => DateTime.fromJSDate(date).plus({days: 1}).toLocaleString(DateTime.DATE_MED)
  );
  // eleventyConfig.addFilter(
  //   "ISOtoDateMed", (date) => DateTime.fromISO(date).plus({days: 1}).toLocaleString(DateTime.DATE_MED)
  // );
  eleventyConfig.addFilter(
    "JStoDateTimeMed", (date) => DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_MED)
  );
  eleventyConfig.addFilter(
    "JStoDateTimeMed1", (date) => DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_MED)
  );
  // eleventyConfig.addFilter(
  //   "ISOtoDateTimeMed", (date) => DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_MED)
  // );
  eleventyConfig.addFilter(
    "JStoTimeSimp", (date) => DateTime.fromJSDate(date).toLocaleString(DateTime.TIME_SIMPLE)
  );
  // eleventyConfig.addFilter(
  //   "ISOtoTimeSimp", (date) => DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE)
  // );
  eleventyConfig.addFilter(
    "JStoTimezone", (date) => DateTime.fromJSDate(date).toFormat("ZZZZ")
  );
  // eleventyConfig.addFilter(
  //   "ISOtoTimezone", (date) => DateTime.fromISO(date).toFormat("ZZZZ")
  // );
  eleventyConfig.addFilter(
    "JStoInt", (date) => DateTime.fromJSDate(date).toUnixInteger()
  );
  // eleventyConfig.addFilter(
  //   "ISOtoInt", (date) => DateTime.fromISO(date).toUnixInteger()
  // );
  // eleventyConfig.addFilter(
  //   "ISOtoInt", (date) => DateTime.fromISO(date).toUnixInteger()
  // );
  eleventyConfig.addFilter(
    "JStoRelative", (date) => DateTime.fromJSDate(date).toRelative({style: "short"})
  );
  // eleventyConfig.addFilter(
  //   "ISOtoRelative", (date) => DateTime.fromISO(date).toRelative({style: "short"})
  // );
    eleventyConfig.addFilter(
    "JStoYMD", (date) => DateTime.fromJSDate(date).toISODate()
  );
    eleventyConfig.addFilter(
    "JStoYMD1", (date) => DateTime.fromJSDate(date).plus({days: 1}).toISODate()
  );
  //   eleventyConfig.addFilter(
  //   "ISOtoYMD", (date) => DateTime.fromISO(date).plus({days: 1}).toISODate()
  // );
  //   eleventyConfig.addFilter(
  //   "ISOtoYYYYMMDD", (date) => DateTime.fromISO(date).toFormat("yyyyMMdd")
  // );
    eleventyConfig.addFilter(
    "JStoYYYYMMDD", (date) => DateTime.fromJSDate(date).toFormat("yyyyMMdd")
  );
    eleventyConfig.addFilter(
    "JStoYYYYMMDD1", (date) => DateTime.fromJSDate(date).plus({days: 1}).toFormat("yyyyMMdd")
  );

  eleventyConfig.addFilter(
    "makeStartCase", function (input) {
      return lodash.startCase(input);
    });

  eleventyConfig.addFilter(
    "makeUpperFirst", function (input) {
      return lodash.upperFirst(input);
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