/**
 * Created by hastings on 9/04/2017.
 */
function EasySchema(props) {
    if (!props || Object.keys(props).length <= 0) {
        throw new Error("No Data Input Error, Please Add Properties to Schema!");
    }
    const DATATYPES = {
        "string": "String",
        "object": "Object",
        "number": "Number",
        "array": "Array",
        "boolean": "Boolean",
        "function": "Function"
    };
    this.keys = Object.keys(props);
    this.keys.forEach((k) => {
        if (typeof props[k] != "object" || !props[k].type || !DATATYPES[props[k].type.toLowerCase()]) {
            throw new Error("Unrecognizable Props Input: The argument " + k + " does not conform to schema rules. Please check the input.");
        }
    });
    this.schema = props;
}

EasySchema.prototype.validate = function (data) {
    const dataKeys = Object.keys(data);
    if (dataKeys.length != this.keys.length) return false;
    for (let i = 0; i < dataKeys.length; i++) {
        let dks = dataKeys[i];
        if (!this.schema[dks]) {
            return false;
        } else {
            if (typeof data[dks] != this.schema[dks].type.toLowerCase()) {
                let type = this.schema[dks].type.toLowerCase();
                if (type != "number" && type != "array") return false;else {
                    if (type == "number" && !EasySchema.isNumber(data[dks])) return false;else if (type == "array" && data[dks].length < 0) return false;
                }
            }
        }
        if (this.schema[dks].regex) {
            if (typeof this.schema[dks].regex == "object") {
                if (!this.schema[dks].regex.test(data[dks])) {
                    return false;
                }
            } else {
                let re = new RegExp(this.schema[dks].regex);
                if (!re.test(data[dks])) {
                    return false;
                }
            }
        }
        if ((this.schema[dks].repeat || this.schema[dks].repeat == 0) && typeof this.schema[dks].repeat == "string") {
            if (data[dks] !== data[this.schema[dks].repeat]) {
                return false;
            }
        }
    }
    return true;
};

EasySchema.validateJSON = function (json) {
    if (typeof json == "string") {
        this.json = JSON.parse(json);
    } else if (typeof json == "object") {
        this.json = json;
    } else {
        throw new Error("Unknown JSON Type Error!");
    }
    if (this.json.type && this.json.data) {
        return true;
    }
    return false;
};

EasySchema.validateUrl = function (url) {
    let regex = /[-a-zA-Z0-9@:%+.~#?&//=]{2,256}.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%+.~#?&//=]*)?/gi;
    return regex.test(url);
};

EasySchema.validateEmail = function (email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return regex.test(email);
};

EasySchema.validateOzPhone = function (phone) {
    let regex = /^(?:\+?61|0)4(?:[01]\d{3}|(?:2[1-9]|3[0-57-9]|4[7-9]|5[0-15-9]|6[679]|7[3-8]|8[1478]|9[07-9])\d{2}|(?:20[2-9]|444|52[0-6]|68[3-9]|70[0-7]|79[01]|820|890|91[0-4])\d|(?:200[0-3]|201[01]|8984))\d{4}$/;
    return regex.test(phone);
};

EasySchema.isObject = function (obj) {
    return typeof obj == "object";
};

EasySchema.isFunction = function (func) {
    return typeof func == "function";
};

EasySchema.isString = function (str) {
    return typeof str == "string";
};

EasySchema.isFunction = function (func) {
    return typeof func == "function";
};

EasySchema.isNumber = function (num) {
    return !isNaN(parseFloat(num));
};

EasySchema.isArray = function (arr) {
    return typeof arr == "object" && arr.length >= 0;
};

EasySchema.regex = function () {
    return {
        url: /[-a-zA-Z0-9@:%+.~#?&//=]{2,256}.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%+.~#?&//=]*)?/gi,
        email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        ozPhone: /^(?:\+?61|0)4(?:[01]\d{3}|(?:2[1-9]|3[0-57-9]|4[7-9]|5[0-15-9]|6[679]|7[3-8]|8[1478]|9[07-9])\d{2}|(?:20[2-9]|444|52[0-6]|68[3-9]|70[0-7]|79[01]|820|890|91[0-4])\d|(?:200[0-3]|201[01]|8984))\d{4}$/,
        ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        html: /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/
    };
};

export default EasySchema;