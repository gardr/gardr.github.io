## Advertisment spec

Mobile teams spent months fine-tuning performance. Had to make sure all parts of the display-ads ecosystem care about
the performance of ads. Load-time is also important so users see the ads at all.

<small>_Use <kbd>↓</kbd> for more about the spec_</small>

--

The spec is now moved to INMA, and will be used by most big sites (and many smaller) in Norway.
Transparency in spec changes by having it on GitHub:
https://github.com/inma-no/advertsspec/blob/master/specification.md

--
* Mobile & tablets without Flash
  * Big demand for animated ads
* Click-to-play for Flash on Safari and Chrome (desktop) soon
* HTML5-ads are difficult!
  * Weaker CPU
  * Difficult to get smooth

--

> “In Facebook we care about scrolling. In an A/B test, we slowed down scrolling from 60fps down to 30fps. Engagement collapsed. We said okay, therefore scrolling matters.”
>
> &mdash; <cite>[Facebook][1]</cite>

[1]:http://www.youtube.com/watch?v=3-WYu_p5rdU

--

# Specification for HTML based adverts

This is the specification for both the HTML banners and image banners. Inline is an advertising format used across all devices (mobile, tablet and desktop). As for now, HTML is recommended as it will be fully responsive across all screens.
--
<small>
## 1. Dimensions

### Height and width
* Banner: always 100% width of is content container, but has *fixed height*.
  * Currently defined formats:
    * Height: 225px, Width: 100%

### Size
* Max 100 kB in compressed state (all files compressed/zipped together).
* You can use JavaScript libraries like jQuery from [Googles CDN service](https://developers.google.com/speed/libraries/devguide#jquery) without its size counting against the total size of the ad.
* Resources loaded after a user interaction does not count against the total size of the ad.

Note&#58; The size limitation is on the initial load. You can lazy load additional content, but for the first rendering this is the limit.
</small>
--
## 2. Limitations
<small>

* Viewport can not be set to device width within the ad

  <strike>```<meta name="viewport" content="width=devicewidth">```</strike>
* The [Geo Location APIs](spec/geoapi.md) or other "HTML5"-APIs that require user confirmation, can only be used after a user interaction.
* The HTML-file delivered should just be _one file_ with all CSS required for the ad inline in the HTML.
* [Maximum of two HTTP requests to JavaScript libraries (at least one to CDN).](spec/maximumhttprequests.md)
* Animation _prior to a user interaction_ must be written using [CSS3 Transitions, Transforms and/or Animation](spec/cssforanimations.md)
  * [JavaScript animations are forbidden before an user interaction](spec/jsanimations.md).
  * You can not use of _requestAnimationFrame_ as [it break features in the host document](http://youtu.be/cgcue5_--SY).
* References to resources must be absolute and start with http:// or https:// , not only //. Because of limitations in our delivery system.
* You can not override default touch events.
* You can not use `touchstart` as an alias for `click`.
* You can only trigger audio or video resources using `touch` or `mouse` events.
--
</small>
## 3. Click counter
You must use the following method when [adding click tags](spec/clicktag.md) to the ad:

	<div onclick="window.open('http://www.url.no','new_window');">

Or alternativly you can add an event listener using JavaScript.

Note&#58; [Paid links are required by Google](https://support.google.com/webmasters/answer/96569?hl=en) to have the attribute `rel="nofollow"`
--
## 4. Default styling of Banner

CSS rules can only be set to classes or IDs. You can not set rules directly to elements like span or div.

The div element should only have the following styling:

    display: block; /* browser default */
    position: static; /* browser default */
    width: 100%;
    height: 225px;
    cursor: pointer;

Additional styling must be done on a new div/element within that container (ex Banner in the sample below).

    <div id="Banner" data-responsive="225h"
    	onclick="window.open('http://www.url.no','new_window');"
    	style="display:block;width:100%;height: 225px;">
        <div style="position:relative;"></div>
    </div>  

Read additional [styling tips](spec/stylingingtips.md).
--
## 5. Third party code
* Must be sent as JavaScript code

## 6. Older formats
Instead of making an HTML-banner, you can deliver an image adapted in height/width to different formats (mobile and tablet). For more information about the different sizes needed, please check the media site for instructions.
