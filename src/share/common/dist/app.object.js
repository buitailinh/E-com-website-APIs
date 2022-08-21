"use strict";
exports.__esModule = true;
exports.AppObject = void 0;
var AppObject = /** @class */ (function () {
    function AppObject() {
    }
    /**
     * @field morning start
     * @description define morningstar frequency
     * @type any
     */
    AppObject.MORNINGSTAR_FREQUENCY = {
        DAILY: 'D',
        WEEKLY: 'W',
        MONTHLY: 'M',
        QUARTERLY: 'Q',
        YEARLY: 'Y'
    };
    AppObject.UPLOAD_KEY = {
        ICON: 'icon'
    };
    /**
     * @field SCHEMA_OPTIONS
     * @description define option schema
     * @type any
     */
    AppObject.SCHEMA_OPTIONS = {
        versionKey: false,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        id: false,
        timestamps: {
            createdAt: 'dateCreated',
            updatedAt: 'dateUpdated'
        }
    };
    AppObject.SCHEMA_STATUS = {
        ACTIVE: 'Active',
        INACTIVE: 'Inactive',
        DELETE: 'Deleted',
        BLOCK: 'Block'
    };
    AppObject.ACCOUNT_MODULE = {
        TYPE: {
            GOOGLE: 'Google',
            APPLE: 'Apple',
            PHONE: 'Phone'
        },
        OTP: {
            LENGTH: 4,
            EFFECTIVE_TIME: 5 * 60000,
            TIMES_LIMIT: 5,
            BLOCK_DURATIONS: 24 * 60 * 60000
        },
        PASSWORD: {
            EFFECTIVE_TIME: 90 * 24 * 60 * 60000,
            TIMES_LIMIT: 5,
            BLOCK_DURATIONS: 24 * 60 * 60000
        },
        LOGIN: {
            EFFECTIVE_TIME: 90 * 24 * 60 * 60000
        },
        DEVICE_TYPE: {
            ANDROID: 'android',
            IOS: 'ios'
        }
    };
    AppObject.USER_MODULE = {
        ROLE: {
            PRO: 'PRO',
            ADMIN: 'ADMIN',
            CLIENT: 'CLIENT'
        },
        ACCOUNT_TYPE: {
            MOBILE: 'mobile',
            CRM: 'crm'
        },
        USER_ROLE: {
            EFFECTIVE_TIME: 14 * 24 * 60 * 60000
        }
    };
    AppObject.CURRENCY = {
        SGD: 'SGD',
        MYR: 'MYR',
        USD: 'USD'
    };
    AppObject.LIST_COUNTRY = [
        {
            code: '65',
            isoCode: 'SG',
            currency: 'SGD'
        },
        {
            code: '60',
            isoCode: 'MY',
            currency: 'MYR'
        },
        {
            code: '1',
            isoCode: 'US',
            currency: 'USD'
        }
    ];
    AppObject.SEND_MAIL = {
        subject: 'CHANGE FEE PRIVATE LOUNGE',
        message: "Subscription fee of {$username} will change to {$feePreviousChange}/month to {$feeAfterChange}/month from {$dateTime}.\n    To continue your subscription at the new price, tap Agree.\n    If you do not agree or take no action, your subscription expires at the end of your current billing period."
    };
    AppObject.SEND_MAIL_OTP = {
        SUBJECT: 'Ulalive email verification ',
        MESSAGE: "Verify that you own <useremail>\n    Use this security code to verify your email address to Ulalive account : <otp>"
    };
    AppObject.PRIVACY_STATUS = {
        ALLOW: true,
        NOT_ALLOW: false
    };
    AppObject.SUBSCRIBE_USER_PERIOD = {
        MONTHLY: 'monthly',
        YEARLY: 'yearly'
    };
    AppObject.UPGRADE_ACOUNT_TYPE = {
        MONTH: 'months',
        YEAR: 'years'
    };
    return AppObject;
}());
exports.AppObject = AppObject;
