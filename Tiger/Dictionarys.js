function Dictionary(keys) {
	var keys = (keys) ? keys : {};

	this.keys = keys;
	this.length = 0;
}

function dictionaryAdd(key, value) {
	this.keys[key] = value;
	
	this.length++;
}

function dictionaryGet(key) {
	var value = this.keys[key];
	
	return (value) ? value : this.defaultValue;
}

function dictionaryForEach(callback) {
	for (var i in this.keys) {
		callback(this.keys[i], i);
	}
}

function dictionarySort(callback) {
	var keys = [];
	for (var i in this.keys)  {
		keys.push(this.keys[i]);
	}
	
	keys.sort(callback);
	
	return keys;
}

function dictionaryRemove(key) {
	if (this.containsKey(key)) {
		delete this.keys[key];
		
		this.length--;
	}
}

function dictionaryReject(callback) {
	for (var i in this.keys) {
		if (callback(i, this.keys[i])) {
			delete this.keys[i];
		}
	}
}

function dictionaryRandom() {
	var keys = [];
	for (var i in this.keys)  {
		keys.push(i);
	}
	
	return keys[Math.floor(Math.random() * this.length)];
}

function dictionaryContainsKey(key) {
	for (var i in this.keys) {
		if (key == i) {
			return true;
		}
	}
	
	return false;
}

function dictionaryClone() {
	return new Dictionary(this.keys);
}

Dictionary.prototype.keys = null;
Dictionary.prototype.length = null;

Dictionary.prototype.defaultValue = null;

Dictionary.prototype.add = dictionaryAdd;
Dictionary.prototype.get = dictionaryGet;
Dictionary.prototype.forEach = dictionaryForEach;
Dictionary.prototype.sort = dictionarySort;
Dictionary.prototype.remove = dictionaryRemove;
Dictionary.prototype.reject = dictionaryReject;
Dictionary.prototype.random = dictionaryRandom;
Dictionary.prototype.containsKey = dictionaryContainsKey;
Dictionary.prototype.clone = dictionaryClone;

module.exports = Dictionary;
