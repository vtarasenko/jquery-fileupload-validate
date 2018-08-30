(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // Register as an anonymous AMD module:
        define([
            'jquery',
            './jquery.fileupload-process'
        ], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS:
        factory(require('jquery'));
    } else {
        // Browser globals:
        factory(
            window.jQuery
        );
    }
}(function ($) {

    'use strict';

    $.blueimp.fileupload.prototype.options.processQueue.unshift(
        {
            action: 'validateImage',
            validateImageFileTypes: '@',

            validateImageMinWidth: '@',
            validateImageMaxWidth: '@',
            validateImageMinHeight: '@',
            validateImageMaxHeight: '@',

            validateImageMaxRatio: '@',
            validateImageMinRatio: '@',
            validateImageMinPixels: '@',
            validateImageMaxPixels: '@',

            validateImageAllowSquare: '@',
            validateImageAllowLandscape: '@',
            validateImageAllowPortrait: '@',

            disabled: '@disableValidation'

            // Always trigger this action,
            // even if the previous action was rejected:
            // always: true
        }
    );

    $.widget('blueimp.fileupload', $.blueimp.fileupload, {

        options: {
            validateImageFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,

            validateImageMinWidth: null,
            validateImageMaxWidth: null,
            validateImageMinHeight: null,
            validateImageMaxHeight: null,

            validateImageMaxRatio: null,
            validateImageMinRatio: null,
            validateImageMinPixels: null,
            validateImageMaxPixels: null,

            validateImageAllowSquare: true,
            validateImageAllowLandscape: true,
            validateImageAllowPortrait: true,

            messages: {
                sizeNotDetectedMessage: 'The size of the image could not be detected.',
                minWidthMessage: 'The image width is too small ({width}px). Minimum width expected is {min_width}px.',
                maxWidthMessage: 'The image width is too big ({width}px). Allowed maximum width is {max_width}px.',
                minHeightMessage: 'The image height is too small ({height}px). Minimum height expected is {min_height}px.',
                maxHeightMessage: 'The image height is too big ({height}px). Allowed maximum height is {max_height}px.',
                minPixelsMessage: 'The image has too few pixels ({pixels} pixels). Minimum amount expected is {min_pixels} pixels.',
                maxPixelsMessage: 'The image has too many pixels ({pixels} pixels). Maximum amount expected is {max_pixels} pixels.',
                maxRatioMessage: 'The image ratio is too big ({ratio}). Allowed maximum ratio is {max_ratio}.',
                minRatioMessage: 'The image ratio is too small ({ratio}). Minimum ratio expected is {min_ratio}.',
                allowSquareMessage: 'The image is square ({width}x{height}px). Square images are not allowed.',
                allowLandscapeMessage: 'The image is landscape oriented ({width}x{height}px). Landscape oriented images are not allowed.',
                allowPortraitMessage: 'The image is portrait oriented ({width}x{height}px). Portrait oriented images are not allowed.'
            }
        },

        processActions: {
            validateImage: function (data, options) {

                if (options.disabled) {
                    return data;
                }

                if (null === options.validateImageMinWidth && null === options.validateImageMaxWidth
                    && null === options.validateImageMinHeight && null === options.validateImageMaxHeight
                    && null === options.validateImageMinPixels && null === options.validateImageMaxPixels
                    && null === options.validateImageMinRatio && null === options.validateImageMaxRatio
                    && options.validateImageAllowSquare
                    && options.validateImageAllowLandscape
                    && options.validateImageAllowPortrait
                ) {
                    return data;
                }

                var dfd = $.Deferred(),
                    that = this,
                    settings = this.options,
                    file = data.files[data.index],
                    error;

                if (!options.validateImageFileTypes.test(file.type)) {
                    return data;
                } else {

                    var invalidate = function (e) {
                        console.log(e);
                        file.error = e;
                        data.files.error = true;
                        dfd.rejectWith(that, [data]);

                        return false;
                    };

                    that._validatorFileReader(file).done(function (reader) {
                        that._validatorLoadImage(reader).done(function () {

                            if (this.width == 0 || this.height == 0) {
                                return invalidate(settings.i18n('sizeNotDetectedMessage'));
                            }

                            if (options.validateImageMinWidth && this.width < options.validateImageMinWidth) {
                                error = settings.i18n('minWidthMessage', {
                                    width: this.width,
                                    min_width: options.validateImageMinWidth
                                });

                                return invalidate(error);
                            }

                            if (options.validateImageMaxWidth && this.width > options.validateImageMaxWidth) {
                                error = settings.i18n('maxWidthMessage', {
                                    width: this.width,
                                    max_width: options.validateImageMaxWidth
                                });

                                return invalidate(error);
                            }

                            if (options.validateImageMinHeight && this.height < options.validateImageMinHeight) {
                                error = settings.i18n('minHeightMessage', {
                                    height: this.height,
                                    min_height: options.validateImageMinHeight
                                });

                                return invalidate(error);
                            }

                            if (options.validateImageMaxHeight && this.height > options.validateImageMaxHeight) {
                                error = settings.i18n('maxHeightMessage', {
                                    height: this.height,
                                    max_height: options.validateImageMaxHeight
                                });

                                return invalidate(error);
                            }

                            var pixels = this.width * this.height;

                            if ($.type(options.validateImageMinPixels) === 'number') {
                                if (pixels < options.validateImageMinPixels) {
                                    error = settings.i18n('minPixelsMessage', {
                                        pixels: pixels,
                                        min_pixels: options.validateImageMinPixels,
                                        height: this.height,
                                        width: this.width
                                    });

                                    return invalidate(error);
                                }
                            }

                            if ($.type(options.validateImageMaxPixels) === 'number') {
                                if (pixels > options.validateImageMaxPixels) {
                                    error = settings.i18n('maxPixelsMessage', {
                                        pixels: pixels,
                                        max_pixels: options.validateImageMaxPixels,
                                        height: this.height,
                                        width: this.width
                                    });

                                    return invalidate(error);
                                }
                            }

                            var ratio = Math.round(this.width / this.height);

                            if ($.type(options.validateImageMinRatio) === 'number') {
                                if (ratio < options.validateImageMinRatio) {
                                    error = settings.i18n('minRatioMessage', {
                                        ratio: ratio,
                                        min_ratio: options.validateImageMinRatio
                                    });

                                    return invalidate(error);
                                }
                            }

                            if ($.type(options.validateImageMaxRatio) === 'number') {
                                if (ratio > options.validateImageMaxRatio) {
                                    error = settings.i18n('maxRatioMessage', {
                                        ratio: ratio,
                                        max_ratio: options.validateImageMaxRatio
                                    });

                                    return invalidate(error);
                                }
                            }

                            if (!options.validateImageAllowSquare && this.width == this.height) {
                                error = settings.i18n('allowSquareMessage', {
                                    width: this.width,
                                    height: this.height
                                });

                                return invalidate(error);
                            }

                            if (!options.validateImageAllowLandscape && this.width > this.height) {
                                error = settings.i18n('allowLandscapeMessage', {
                                    width: this.width,
                                    height: this.height
                                });

                                return invalidate(error);
                            }

                            if (!options.validateImageAllowPortrait && this.width < this.height) {
                                error = settings.i18n('allowPortraitMessage', {
                                        width: this.width,
                                        height: this.height
                                    }
                                );

                                return invalidate(error);
                            }

                            dfd.resolveWith(that, [data]);

                        }).fail(function () {
                            invalidate(settings.i18n('sizeNotDetectedMessage'));
                        });
                    }).fail(function () {
                        invalidate(settings.i18n('sizeNotDetectedMessage'));
                    });
                }

                return dfd.promise();
            }
        },

        _validatorFileReader: function (file) {
            var dfd = $.Deferred();
            var reader = new FileReader();

            reader.onload = loaded;
            reader.onerror = errored;
            reader.onabort = errored;
            reader.readAsDataURL(file);

            function loaded() {
                unbindEvents();
                dfd.resolveWith(this, [reader]);
            }

            function errored() {
                unbindEvents();
                dfd.rejectWith(this, [reader]);
            }

            function unbindEvents() {
                reader.onload = null;
                reader.onerror = null;
                reader.onabort = null;
            }

            return dfd.promise();
        },

        _validatorLoadImage: function (reader) {
            var dfd = $.Deferred();
            var image = new Image();

            image.onload = loaded;
            image.onerror = errored;
            image.onabort = errored;
            image.src = reader.result;

            function loaded() {
                unbindEvents();
                dfd.resolveWith(this, [image]);
            }

            function errored() {
                unbindEvents();
                dfd.rejectWith(this, [image]);
            }

            function unbindEvents() {
                image.onload = null;
                image.onerror = null;
                image.onabort = null;
            }

            return dfd.promise();
        }
    });
}));
