var _id = function(l) { // get the id of the element
	return document.getElementById(l);
};

var _c = function(l) { // create element
	return document.createElement(l);
};

var _qs = function(l) {
	return document.querySelector(l);
};

// interface
var JInterface = function() {
};

JInterface.prototype.key = null;
JInterface.prototype.w = [];


JInterface.prototype.setKey = function(key) {
	this.key = key;
	return this;
}

JInterface.prototype.getKey = function() {
	return this.key;
};


JInterface.prototype.add = function(l, k) {
	var k = k || null;
	this.c.appendChild(l.getControl());
	l.setKey(k);
	//this.w.push(l);
	this.w.push(l);
	return this;
};

JInterface.prototype.addClass = function(c) {
	this.c.classList.add(c);
	return this;
};

JInterface.prototype.removeClass = function(c) {
	this.c.classList.remove(c);
	return this;
};

JInterface.prototype.setText = function(t) {
	this.c.appendChild(t);
	return this;
};

JInterface.prototype.setHTML = function(html_string) {
	this.c.innerHTML = html_string;
	return this;
};

JInterface.prototype.getControl = function() {
	return this.c;
};

JInterface.prototype.setAttr = function(o) {
	/* o is a dictionary  */
	if (!(o instanceof Object)) {
		throw new TypeError('setAttr(o) o must be a dictionary');
	}
	for (var i in o) {
		this.c.setAttribute(i, o[i]);
	}
	return this;
};


JInterface.prototype.setText = function(t) {
	if (this.jtype == "input" || this.jtype == "textarea") {
		this.c.value = t;
	}
	else 
	{
		this.c.innerHTML = t;
	}
	return this;
};

JInterface.prototype.getText = function() {
	if (this.jtype == "input" || this.jtype == "textarea") {
		return this.c.value;
	} else {
		return this.c.innerHTML;
	}
};

JInterface.prototype.addEvent = function(e, c) {
	if (typeof(c) != 'function') throw new TypeError('addEvent(e, c): c must be a function');

	this.c.addEventListener(e, c);
	return this;
};

JInterface.prototype.style = function(k, v) {
	this.c.style[k] = v;
	return this;
};

JInterface.prototype.setStyle = function(o) {
	if ( !(o instanceof Object) ) throw new TypeError('setStyle(o): error: param o must be dictionary {}');
	for (var i in o) {
		this.c.style[i] = o[i];
	}
	return this;
};
// end interface

JInterface.prototype.clear = function() {
  while (this.c.firstChild) {
    this.c.removeChild(this.c.firstChild);
  }
};

var JErrorPage = function() {
	var panel = new JPanel();
	panel.setText('<h1>Sorry!</h1><span>Page Not Found!!!</span><br />');
	return panel;
};
JErrorPage.prototype = Object.create(JInterface);

var JApplication = function(id) {
	this.c = _id(id);
};

JApplication.prototype = Object.create(JInterface.prototype);

JApplication.prototype.routes = {};

JApplication.prototype.addRoute = function(url, w, prop) {
	
	this.routes[url] = { page: w, prop: prop };
	return this;
};
JApplication.prototype.run = function(w) {
	this.clear();
	if (w instanceof JInterface) {
		this.add(w);
	} else if (w instanceof Object) {
		this.add(w.control());
	}
};

JApplication.prototype.navigate = function(url) {
	history.pushState(null, null, '?u=' + url);
	for (var i in this.routes) {
		if (i == url) {
			var prop = this.routes[i].prop || null;
			var obj = null;
			if (prop != null) obj = new this.routes[i].page(prop());
			else obj = new this.routes[i].page();
			this.run(obj);
			return;
		}
	}
	
	this.run(new JErrorPage());
};

var ___route_manager = function() {
	var u = location.href.split('?');
	if (u.length <= 1) {
		location.href = '?u=/'
		return [false, null];
	}
	var u = u[1].split('=');
	
	if (u.length <= 1) {
		location.href = '?u=/'
		return [false, null];
	}
	if (u[0] != 'u') {
		location.href = '?u=/'
		return [false, null];
	}
	
	return [true, u[1]];
};

JApplication.prototype.init = function() {
	var url = ___route_manager();
	if (url[0]) this.navigate(url[1]);

	var self = this;

	window.addEventListener('popstate', function() {
		var url = ___route_manager();
		if (url[0]) self.navigate(url[1]);
	});
};

var JPanel = function() {
	this.c = _c("div");
};

JPanel.prototype = Object.create(JInterface.prototype);

JPanel.prototype.getValue = function() {
	var len = this.w.length;
	var data = {};
	for (var i = 0; i < len; i++) {
	        if (this.w[i].key != null) {
	                data[this.w[i].key] = this.w[i].getText();
	        }
	}
	return data;
};
// Label

var JLabel = function(t) {
	var t  = t || "";
	this.c = _c("label");
	this.c.innerHTML = t;
};

JLabel.prototype = Object.create(JInterface.prototype);
// End Label

var JLink = function(t) {
	this.c = _c('a');
	this.setText(t);
};
JLink.prototype = Object.create(JInterface.prototype);

// button
var JButton = function(t) {
	var t = t || '';
	this.c = _c("button");
	this.setText(t);
};
JButton.prototype = Object.create(JInterface.prototype);
// end button

var JTextField = function() {
	this.jtype = "input";
	this.c = _c("input");
};
JTextField.prototype = Object.create(JInterface.prototype);

// Textarea
var JTextArea  = function() {
	this.type = "textarea";
	this.c = _c("textarea");
};
JTextArea.prototype = Object.create(JInterface.prototype);

// end TextArea


// ComboBox
var _JOption = function(key, value) {
    var key = key || '';
    var value = value || '';
    this.c = _c('option');
    this.c.innerHTML = value;
    this.c.value = key;
};
_JOption.prototype = Object.create(JInterface.prototype);

var JComboBox = function() {
    this.c = _c('select');
};
JComboBox.prototype = Object.create(JInterface.prototype);
JComboBox.prototype.addOption = function(key, value) {
    this.add(new _JOption(key, value));
	return this;
};
JComboBox.prototype.getText = function() {
	return this.c.value;
};
// End ComboBox

/* RadioButton */
var _JRadio = function(group_name, value) {
	this.c = _c('input');
	this.c.setAttribute('type', 'radio');
	this.c.setAttribute('value', value);
	this.c.setAttribute('name', group_name);
};
_JRadio.prototype = Object.create(JInterface.prototype);

var JRadioGroup = function(name, br) {
	this.br = br || false;
	var name = name || '';
	this.c = _c('span');
	this.name = name;

	this.options = [];
};
JRadioGroup.prototype = Object.create(JInterface.prototype);
JRadioGroup.prototype.addOption = function(value, label) {
	if (this.br) {
		this.add(new JBr());
	}
	var radio = new _JRadio(this.name, value);
	this.add(radio);
	this.add(new JLabel().setAttr({'for': value}).setText(label));
	this.options.push(radio);
	return this;
};
JRadioGroup.prototype.getValue = function() {
	var options = this.options;
	var ln = options.length;
	for (var i = 0; i < ln; i++) {
		if (options[i].c.checked) {
			return options[i].c.attributes.value.nodeValue;
		}
	}
	return '';
};
JRadioGroup.prototype.addEvent = function(e, fn) {
	var options = this.options;
	var ln = options.length;
	for (var i = 0; i < ln; i++) {
		options[i].addEvent(e, fn);
	}
};
JRadioGroup.prototype.check = function(b) {
	var options = this.options;
	var ln = options.length;
	for (var i = 0; i < ln; i++) {
		options[i].c.checked = b;
	}
};
/* End RadioButton */

/* CheckBox  */
var _JCheck = function(name, value) {
	this.c = _c('input');
	this.c.setAttribute('type', 'checkbox');
	this.c.setAttribute('value', value);
	this.c.setAttribute('name', name);
};
_JCheck.prototype = Object.create(JInterface.prototype);
var JCheckBoxGroup = function(br) {
	this.br = br || false;
	this.c = _c('span');

	this.options = [];
};
JCheckBoxGroup.prototype = Object.create(JInterface.prototype);
JCheckBoxGroup.prototype.addOption = function(value, label) {
	if (this.br) {
		this.add(new JBr());
	}
	var check = new _JCheck(label, value);
	this.add(check);
	this.add(new JLabel().setAttr({'for': value}).setText(label));
	this.options.push(check);
};
JCheckBoxGroup.prototype.getValue = function() {
	var options = this.options;
	var ln = options.length;
	var values = [];
	for (var i = 0; i < ln; i++) {
		if (options[i].c.checked) {
			values.push(options[i].c.attributes.value.nodeValue);
		}
	}
	return values;
};
JCheckBoxGroup.prototype.addEvent = function(e, fn) {
	var options = this.options;
	var ln = options.length;
	for (var i = 0; i < ln; i++) {
		options[i].addEvent(e, fn);
	}
};
JCheckBoxGroup.prototype.check = function(b) {
	var options = this.options;
	var ln = options.length;
	for (var i = 0; i < ln; i++) {
		options[i].c.checked = b;
	}
};
/* End CheckBox */ 

/* Break Line */
var JBr = function() {
	this.c = _c('br');
};
JBr.prototype = Object.create(JInterface.prototype);
/* end Break line */

// H1 to h6
var JH = function(h_no_tag) {
	this.c = _c("h" + h_no_tag.toString());
};
JH.prototype = Object.create(JInterface.prototype);
// end h1 to h6

// ul
var JUl = function() {
	this.c = _c("ul");
};
JUl.prototype = Object.create(JInterface.prototype);

// li
var JLi = function() {
	this.c = _c("li");
};
JLi.prototype = Object.create(JInterface.prototype);



// form
var JForm = function() {
	this.c = _c("form");
};

JForm.prototype = Object.create(JInterface.prototype);

JForm.prototype.getValue = function() {
	var len = this.w.length;
	var data = {};
	for (var i = 0; i < len; i++) {
		if (this.w[i].key != null) {
			data[this.w[i].key] = this.w[i].getText();
		}
	}
	return data;
};

// tables

var JTable = function() {
	this.c = _c("table");
};

JTable.prototype = Object.create(JInterface.prototype);

var JThead = function() {
	this.c = _c("thead");
};

JThead.prototype = Object.create(JInterface.prototype);

var JTr = function() {
	this.c = _c("tr");
};

JTr.prototype = Object.create(JInterface.prototype);


var JTh = function() {
	this.c = _c("th");
};

JTh.prototype = Object.create(JInterface.prototype);


var JTd = function() {
	this.c = _c("td");
};

JTd.prototype = Object.create(JInterface.prototype);


var JTbody = function() {
	this.c = _c("tbody");
};

JTbody.prototype = Object.create(JInterface.prototype);


var JI = function() {
	this.c = _c('i');
}
JI.prototype = Object.create(JInterface.prototype);


var JSpan = function() {
	this.c = _c('span');
};

JSpan.prototype = Object.create(JInterface.prototype);
