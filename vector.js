// polar is angle to x axis
// alpha is angle between vector and xy plane

let Vector = {
    _x: 0,
    _y: 0,
    _z: 0,
    _r: 0,
    _alpha: 0,
    _polar: 0,
    _initAlpha: 0,
    _initPolar: 0,
    _alphaSpeed: 0,
    _polarSpeed: 0,

    createByCartesian: function(x, y, z) {
        let obj = Object.create(this);
        obj.setX(x);
        obj.setY(y);
        obj.setZ(z);
        let R = Math.sqrt(x * x + y * y + z * z)
        let polar = Math.asin(z / R )
        let alpha
        if ((x < 0 && y > 0) || (x < 0 && y < 0)) {
            alpha = Math.atan(y / x) + Math.PI
        } else if (x > 0 && y < 0) {
            alpha = Math.atan(y / x) + 2 * Math.PI
        } else {
            alpha = Math.atan(y / x)
        }
        obj.setAlpha(alpha)
        obj.setPolar(polar)
        return obj;
    },
    createByPolar: function (alpha, polar, length) {
        let obj = Object.create(this);
        obj.setAlpha(alpha)
        obj.setPolar(polar)
        obj.setX(Math.cos(polar) * Math.cos(alpha) * length);
        obj.setY(Math.sin(polar) * Math.cos(alpha) * length);
        obj.setZ(Math.sin(alpha) * length);
        return obj;
    },
    addAlphaAndPolar: function (alpha, polar) {
        return Vector.createByPolar(this.getAlpha() + alpha, this.getPolar() + polar, this.getLength())
    },
    setAlpha: function (value) {
        this._alpha = value;
    },
    getAlpha: function () {
        return this._alpha
    },
    setPolar: function (value) {
        this._polar = value;
    },
    getPolar: function () {
        return this._polar
    },
    setX: function(value) {
        this._x = value;
    },
    getX: function() {
        return this._x;
    },
    setY: function(value) {
        this._y = value;
    },
    getY: function() {
        return this._y;
    },
    setZ: function (value) {
        this._z = value;
    },
    getZ: function () {
        return this._z;
    },
    setAngle: function(alpha, polar) {
        let R = this.getLength();
        this._x = Math.cos(polar) * Math.cos(alpha) * R;
        this._y = Math.sin(polar) * length;
        this._z = Math.sin(alpha) * Math.cos(polar) * R;
        this._alpha = alpha
        this._polar = polar
    },
    setLength: function(length) {
        let alphaAngle = this.getAlpha();
        let polarAngle = this.getPolar();
        this._x = Math.cos(polarAngle) * Math.cos(alphaAngle) * length;
        this._y = Math.sin(polarAngle) * length;
        this._z = Math.sin(alphaAngle) * Math.cos(polarAngle) * length;
    },
    getLength: function() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z);
    },
    add: function(v2) {
        return Vector.createByCartesian(this._x + v2.getX(), this._y + v2.getY(), this._z + v2.getZ());
    },
    subtract: function(v2) {
        return Vector.createByCartesian(this._x - v2.getX(), this._y - v2.getY(), this._z - v2.getZ());
    },
    multiply: function(val) {
        return Vector.create(this._x * val, this._y * val, this._z * val);
    },
    divide: function(val) {
        return Vector.create(this._x / val, this._y / val, this._z / val);
    },
    addTo: function(v2) {
        this._x += v2.getX();
        this._y += v2.getY();
        this._z += v2.getZ();
    },
    subtractFrom: function(v2) {
        this._x -= v2.getX();
        this._y -= v2.getY();
        this._z -= v2.getZ();
    },
    multiplyBy: function(val) {
        this._x *= val;
        this._y *= val;
        this._z *= val;
    },
    divideBy: function(val) {
        this._x /= val;
        this._y /= val;
        this._z /= val;
    }
};