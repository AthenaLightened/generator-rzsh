define([
], function () {
    return {
        isValidMobile: function (mobile) {
            if (/^(13[4-9]|147|15[0-2]|15[7-9]|18[1-3]|18[7-8])[0-9]{8}$/.test(mobile)) { // China Mobile
                return true;
            } else if (/^(13[0-2]|15[5-6]|18[5-6])[0-9]{8}$/.test(mobile)) { // China Unicom
                return true;
            } else if (/^(133|153|180|189)[0-9]{8}$/.test(mobile)) { // China Telecom
                return true;
            }
            return false;
        }
    };
});
