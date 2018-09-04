 jquery-fileupload plugin to check image resolution before uploading.
 
**Options**

*   [validateImageMinWidth](#minwidth)
*   [validateImageMaxWidth](#maxwidth)
*   [validateImageMaxHeight](#maxheight)
*   [validateImageMinHeight](#minheight)
*   [validateImageMaxRatio](#maxratio)
*   [validateImageMinRatio](#minratio)
*   [validateImageAllowSquare](#allowsquare)
*   [validateImageAllowLandscape](#allowlandscape)
*   [validateImageAllowPortrait](#allowportrait)

**Messages**

*   [sizeNotDetectedMessage](#sizenotdetectedmessage)
*   [maxWidthMessage](#maxwidthmessage)
*   [minWidthMessage](#minwidthmessage)
*   [maxHeightMessage](#maxheightmessage)
*   [minHeightMessage](#minheightmessage)
*   [maxRatioMessage](#maxratiomessage)
*   [minRatioMessage](#minratiomessage)
*   [allowSquareMessage](#allowsquaremessage)
*   [allowLandscapeMessage](#allowlandscapemessage)
*   [allowPortraitMessage](#allowportraitmessage)

You can mix all the constraint options to create powerful validation rules.

### validateImageMinWidth[¶](#minwidth "Permalink to this headline")

**type**: `integer`

If set, the width of the image file must be greater than or equal to this value in pixels.

### validateImageMaxWidth[¶](#maxwidth "Permalink to this headline")

**type**: `integer`

If set, the width of the image file must be less than or equal to this value in pixels.

### validateImageMinHeight[¶](#minheight "Permalink to this headline")

**type**: `integer`

If set, the height of the image file must be greater than or equal to this value in pixels.

### validateImageMaxHeight[¶](#maxheight "Permalink to this headline")

**type**: `integer`

If set, the height of the image file must be less than or equal to this value in pixels.

### validateImageMinPixels[¶](#minpixels "Permalink to this headline")

**type**: `integer`

If set, the amount of pixels of the image file must be greater than or equal to this value.

### validateImageMaxPixels[¶](#maxpixels "Permalink to this headline")

**type**: `integer`

If set, the amount of pixels of the image file must be less than or equal to this value.

### validateImageMaxRatio[¶](#maxratio "Permalink to this headline")

**type**: `float`

If set, the aspect ratio (`width / height`) of the image file must be less than or equal to this value.

### validateImageMinRatio[¶](#minratio "Permalink to this headline")

**type**: `float`

If set, the aspect ratio (`width / height`) of the image file must be greater than or equal to this value.

### validateImageAllowSquare[¶](#allowsquare "Permalink to this headline")

**type**: `Boolean` **default**: `true`

If this option is false, the image cannot be a square. If you want to force a square image, then set leave this option as its default `true` value and set [validateImageAllowLandscape](#allowlandscape) and [validateImageAllowPortrait](#allowportrait) both to `false`.

### validateImageAllowLandscape[¶](#allowlandscape "Permalink to this headline")

**type**: `Boolean` **default**: `true`

If this option is false, the image cannot be landscape oriented.

### validateImageAllowPortrait[¶](#allowportrait "Permalink to this headline")

**type**: `Boolean` **default**: `true`

If this option is false, the image cannot be portrait oriented.

### sizeNotDetectedMessage[¶](#sizenotdetectedmessage "Permalink to this headline")

**type**: `string` **default**: `The size of the image could not be detected.`

If the system is unable to determine the size of the image, this error will be displayed. This will only occur when at least one of the size constraint options has been set.

### maxWidthMessage[¶](#maxwidthmessage "Permalink to this headline")

**type**: `string` **default**: `The image width is too big ({width}px). Allowed maximum width is {max_width}px.`

The error message if the width of the image exceeds [validateImageMaxWidth](#maxwidth).

### minWidthMessage[¶](#minwidthmessage "Permalink to this headline")

**type**: `string` **default**: `The image width is too small ({width}px). Minimum width expected is {min_width}px.`

The error message if the width of the image is less than [validateImageMinWidth](#minwidth).

### maxHeightMessage[¶](#maxheightmessage "Permalink to this headline")

**type**: `string` **default**: `The image height is too big ({height}px). Allowed maximum height is {max_height}px.`

The error message if the height of the image exceeds [validateImageMaxHeight](#maxheight).

### minHeightMessage[¶](#minheightmessage "Permalink to this headline")

**type**: `string` **default**: `The image height is too small ({height}px). Minimum height expected is {min_height}px.`

The error message if the height of the image is less than [validateImageMinHeight](#minheight).

### maxPixelsMessage[¶](#maxpixelsmessage "Permalink to this headline")

**type**: `string` **default**: `The image has to many pixels ({pixels} pixels). Maximum amount expected is {max_pixels} pixels.`

The error message if the amount of pixels of the image exceeds [validateImageMaxPixels](#maxpixels).

### minPixelsMessage[¶](#minpixelsmessage "Permalink to this headline")

**type**: `string` **default**: `The image has to few pixels ({pixels} pixels). Minimum amount expected is {min_pixels} pixels.`

The error message if the amount of pixels of the image is less than [validateImageMinPixels](#minpixels).

### maxRatioMessage[¶](#maxratiomessage "Permalink to this headline")

**type**: `string` **default**: `The image ratio is too big ({ratio}). Allowed maximum ratio is {max_ratio}`

The error message if the aspect ratio of the image exceeds [validateImageMaxRatio](#maxratio).

### minRatioMessage[¶](#minratiomessage "Permalink to this headline")

**type**: `string` **default**: `The image ratio is too small ({ratio}). Minimum ratio expected is {min_ratio}`

The error message if the aspect ratio of the image is less than [validateImageMinRatio](#minratio).

### allowSquareMessage[¶](#allowsquaremessage "Permalink to this headline")

**type**: `string` **default**: `The image is square ({width}x{height}px). Square images are not allowed`

The error message if the image is square and you set [validateImageAllowSquare](#allowsquare) to `false`.

### allowLandscapeMessage[¶](#allowlandscapemessage "Permalink to this headline")

**type**: `string` **default**: `The image is landscape oriented ({width}x{height}px). Landscape oriented images are not allowed`

The error message if the image is landscape oriented and you set [validateImageAllowLandscape](#allowlandscape) to `false`.

### allowPortraitMessage[¶](#allowportraitmessage "Permalink to this headline")

**type**: `string` **default**: `The image is portrait oriented ({width}x{height}px). Portrait oriented images are not allowed`

The error message if the image is portrait oriented and you set [validateImageAllowPortrait](#allowportrait) to `false`.


