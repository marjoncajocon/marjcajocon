var ControlConfig = {
    TextColor: ['dark', 'dark-secondary', 'dark-hint', 'light', 'light-secondary', 'light-hint', 'accent', 'accent-secondary', 'accent-hint', 'black', 'white', 'danger'],
    TextSize: ['display4', 'display3', 'display2', 'display1', 'headline', 'title', 'subhead', 'body2', 'body1', 'caption', 'menu', 'button'],
    TextDisplay: ['inline', 'inline-block', 'block'],
    Colors: ['primary', 'danger', 'accent'],
    ButtonType: ['flat', 'raised', 'fab'],
    TextFieldType: ['float'],
    TableType: ['bordered'],
    TabType: ['justified'],
    Size: ['small', 'large'],
    Direction: ['right', 'left', 'up', 'bottom'],
    GridType: ['md', 'xs', 'lg', 'sm', 'xl', 'md-offset', 'xs-offset', 'lg-offset', 'sm-offset', 'xl-offset'], //        var reg = new RegExp('^[md|xs|lg|sm|xl]\-$');
    DrawerType: ['bottom', 'top', 'left', 'right'],
    tostr: function (ls) {
        var ret = '';
        for (var i in ls) {
            ret += ls[i] + ','
        }
        return ret;
    }
};
var __isValidConfig = function (n, ls) {
    for (var i in ls) {
        if (n == ls[i]) {
            return true;
        }
    }
    return false;
};

var AppBar = function(obj, is_fixed) {
    var is_fixed = is_fixed || false;
    if (!typeof(is_fixed)) throw new TypeError('is_fixed must be boolean');

    var panel = new JPanel()
                .addClass('mui-appbar')

    if (is_fixed) {
        panel.setStyle({position: 'fixed', left: 0, top: 0, zIndex: 200, width: '100%'});
    }

    if (obj instanceof JInterface) {
        panel.add(obj);
    } else if (obj instanceof Object) {
        panel.add(obj.control());
    }

    this.add = function(obj) {
        if (obj instanceof JInterface) {
            panel.add(obj);
        } else if (obj instanceof Object) {
            panel.add(obj.control());
        }
        return this;
    };

    this.setStyle = function(styles) {
        panel.setStyle(styles);
        return this;
    }

    this.control = function() {
        return panel;
    };
};


var SnackBar = function() {
    

    var label = new Label(null, 'light-secondary', 'caption');

    var panel = new JPanel()
                .setStyle({
                    width: '80%',
                    backgroundColor: '#37474f',
                    padding: '15px',
                    borderRadius: '5px',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: '20px',
                    margin: 'auto',
                    boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)',
                    zIndex: 100,
                    display: 'none'
                })
                .add(label.control());
    
    var tn = null;
    var self = this;
    
    this.show = function(msg) {
        var msg = msg || '';
        label.setText(msg);
        panel.setStyle({
            display: 'block'
        });
        tn = setTimeout(function() {
            self.hide();
        }, 2000);

        return this;
    };
    
    this.hide = function() {
        panel.setStyle({
            display: 'none'
        });
        return this;
    };

    this.control = function() {
        return panel;
    };
    
};

var NavBar = function(pos, bg) {
    var pos = pos || 'top';
    pos = pos == 'top' ? 'up' : pos;

    var bg = bg || '#AA00FF';

    if (pos != null) {
        if (!__isValidConfig(pos, ControlConfig.Direction)) throw new TypeError(pos + ' is invalid, Valid: ' + ControlConfig.tostr(ControlConfig.Direction));
    }
    
    var const_size = 768;
    var device = 'phone';
    if (window.screen.width >= 768) {
        device = 'desktop'
    }

    

    var panel = new JPanel();

    if (pos == 'up') {
        panel.setStyle({
            width: '100%',
            height: '60px',
            backgroundColor: bg,
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 100,
            boxShadow: '0 3px 3px rgba(0, 0, 0, 0.4)'
        });
    } else if (pos == 'bottom') {
        panel.setStyle({
            width: '100%',
            height: '60px',
            backgroundColor: bg,
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: 100,
            boxShadow: '0 -1px 1px rgba(0, 0, 0, 0.4)'
        });
    }

    var subpanel = new JPanel().setStyle({
        height: '100%'
    });
    if (device != 'phone') {
        subpanel.setStyle({
            width: const_size + 'px'
        });
        subpanel.setStyle({
            margin: 'auto'
        });
    }
    
    panel.add(subpanel);
    var ls = [];
    var ls_icon = [];

    this.add = function(title, icon, fn) {
        var fn = fn || null; /* fn is an event  */

        var title = title || null;
        var icon = icon || null;

        btn = null;
    
        var ico = new JI().addClass('fa').addClass('fa-' + icon).setStyle({
            fontSize: '35px'
        });
        if (title != null) {
            ico.setText(title);
        }

        if (pos == 'up') { 
            
            btn = new JButton()
                    .setStyle({
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        border: 'none',
                        cursor: 'pointer',
                        height: '100%',
                        float: 'left',
                        color: 'white',
                        borderBottom: '2px solid rgba(0, 0, 0, 0)'
                    }).addEvent('click', function(e) {
                        for (var i in ls) {
                            ls[i].getControl().style.borderBottom = '2px solid rgba(0, 0, 0, 0)';
                            ls[i].getControl().style.backgroundColor = 'rgba(0, 0, 0, 0)';
                        }
                        this.style.borderBottom = '2px solid white';
                        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        
                        if (fn != null && typeof(fn) == 'function') {
                            fn(e);
                        }
                    })
                    .add(ico);
        } else if (pos == 'bottom') {
    
            btn = new JButton()
                    .setStyle({
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        border: 'none',
                        cursor: 'pointer',
                        height: '100%',
                        float: 'left',
                        color: 'white',
                        borderTop: '2px solid rgba(0, 0, 0, 0)'
                    }).addEvent('click', function(e) {
                        for (var i in ls) {
                            ls[i].getControl().style.borderTop = '2px solid rgba(0, 0, 0, 0)';
                            ls[i].getControl().style.backgroundColor = 'rgba(0, 0, 0, 0)';
                        }
                        this.style.borderTop = '2px solid white';
                        this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                        
                        if (fn != null && typeof(fn) == 'function') {
                            fn(e);
                        }
                    })
                    .add(ico);
        }
        
        ls_icon.push(ico);

        subpanel.add(btn);

        ls.push(btn);
        return this;
    };

    this.update = function() {
        
        var width = 100 / ls.length;
        
        if (device != 'phone') {
            width = const_size / ls.length;
        }
        
        for (var i in ls) {
            if (device == 'phone') {
                ls[i].setStyle({
                    width: width + '%'
                });
            } else {
                /* for desktop */
                ls[i].setStyle({
                    width: width + 'px'
                });
            }
        }

        var ls_len = ls_icon.length;
        for (var i in ls_icon) {
            if (false) {

            }
            else if (ls_len >= 12) {
                ls_icon[i].setStyle({
                    fontSize: '15px'
                });
            }
            else if (ls_len >= 9) {
                ls_icon[i].setStyle({
                    fontSize: '20px'
                });
            }
            else if (ls_len >= 6) {
                ls_icon[i].setStyle({
                    fontSize: '23px'
                });
            }
        }
        
        return this;
    };


    this.control = function() {
        return panel;
    };    
};

var Label = function (text, color, size, display) {
    /* for typography  */

    var text = text || '';

    var color = color || null;
    var size = size || null;
    var display = display || null;

    color = color != null ? color : 'dark';
    size = size != null ? size : 'caption';
    display = display != null ? display : 'inline';

    if (!__isValidConfig(color, ControlConfig.TextColor)) throw new TypeError('color ' + color + ' is not valid, Valid: ' + ControlConfig.tostr(ControlConfig.TextColor));
    if (!__isValidConfig(size, ControlConfig.TextSize)) throw new TypeError('Textsize ' + size + ' is not valid, Valid: ' + ControlConfig.tostr(ControlConfig.TextSize));
    if (!__isValidConfig(display, ControlConfig.TextDisplay)) throw new TypeError('TextDisplay ' + display + ' is not valid, Valid: ' + ControlConfig.tostr(ControlConfig.TextDisplay));

    var c = new JPanel().addClass('mui--text-' + color).addClass('mui--text-' + size);
    c.setStyle({ display: display });
    // c.setText(text);


    var icon = new JI();
    
    var txt = new JSpan().setText(text);
    c.add(icon);
    c.add(txt);



    this.setText = function(msg) {
        txt.setText(msg);
        return this;
    };

    this.setStyle = function(o) {
        c.setStyle(o);
        return this;
    };

    this.setIcon = function(ico, obj) {
        var ico = ico || null;
        var obj = obj || {};
        if (ico != null) {
            icon.addClass('fa').addClass('fa-' + ico);
            if (text != '') {
                icon.setStyle({marginRight: '5px'});
            }
            icon.setStyle(obj);
        }
        return this;
    };

    this.control = function () {
        return c;
    };

};


var Container = function () {
    var panel = new JPanel().addClass('mui-container-fluid');


    this.setStyle = function (obj_dic) {
        panel.setStyle(obj_dic);
        return this;
    };

    this.addClass = function (classname) {
        panel.addClass(classname);
        return this;
    };

    this.control = function () {
        return panel;
    };

    this.add = function (j) {
        if (j instanceof JInterface) {
            panel.add(j);
        } else {
            panel.add(j.control());
        }
        return this;
    };

    this.clear = function() {
        panel.clear();
        return this;
    };
};

var EmptyPanel = function () {
    var panel = new JPanel();


    var self = this;
    this.setStyle = function (obj_dic) {
        panel.setStyle(obj_dic);
        return self;
    };

    this.addClass = function (classname) {
        panel.addClass(classname);
        return this;
    };

    this.control = function () {
        return panel;
    };

    this.clear = function() {
        panel.clear();
        return this;
    };

    this.add = function (j) {
        if (j instanceof JInterface) {
            panel.add(j);
        } else {
            panel.add(j.control());
        }
        return this;
    };

    this.setImage = function(path, style) {
        var style = style || null;

        panel.setStyle({
            backgroundImage: 'url(' + path + ')',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        });

        if (style != null) {
           panel.setStyle(style); // for additional style
        }

        return this;
    };

    this.addEvent = function(evt, c) {
        panel.addEvent(evt, c);
    };
};


var Panel = function () {
    var panel = new JPanel().addClass('mui-panel');


    var self = this;
    this.setStyle = function (obj_dic) {
        panel.setStyle(obj_dic);
        return self;
    };

    this.addClass = function (classname) {
        panel.addClass(classname);
        return this;
    };

    this.control = function () {
        return panel;
    };

    this.add = function (j) {
        if (j instanceof JInterface) {
            panel.add(j);
        } else {
            panel.add(j.control());
        }
        return this;
    };
    this.clear = function() {
        panel.clear();
        return this;
    };
};


var Button = function (label, color, type, size) {

    var label = label || ''; /* Label of the button */
    var color = color || ''; /* primary, danger, accent */
    var type = type || ''; /* flat, raised, fab */ /* fab is a circular button */
    var size = size || '';

    /* checking error  */
    if (color != '') {
        if (!__isValidConfig(color, ControlConfig.Colors)) throw new TypeError(color + ' is not valid! valid input: ' + ControlConfig.tostr(ControlConfig.Colors));
    }
    if (type != '') {
        if (!__isValidConfig(type, ControlConfig.ButtonType)) throw new TypeError(type + ' is not valid! valid input: ' + ControlConfig.tostr(ControlConfig.ButtonType));
    }
    if (size != '') {
        if (!__isValidConfig(size, ControlConfig.Size)) throw new TypeError(size + ' is not valid! valid input: ' + ControlConfig.tostr(ControlConfig.Size));
    }
    /* End error checking */
    var _label = new Label(label, 'light', 'button');

    var icon = new JI();
    var b = new JButton()
    .add(icon)
    .add(_label.control()).addClass('mui-btn');
    if (color != '') {
        b.addClass('mui-btn');
        b.addClass('mui-btn--' + color);
    }
    if (type != '') {
        b.addClass('mui-btn--' + type);
    }
    if (size != '') {
        b.addClass('mui-btn--' + size);
    }

    this.addEvent = function (e, c) {
        b.addEvent(e, c);
        return this;
    };
    this.button = function () {
        return b;
    }

    this.setStyle = function(o) {
        b.setStyle(o);
        return this;
    };

    this.control = function () {
        return b;
    };

    this.clear = function() {
        b.clear();
        return this;
    };

    this.add = function(obj) {
        if (obj instanceof JInterface) {
            b.add(obj);
        } else if(obj instanceof Object) {
            b.add(obj.control());
        }
        return this;
    };

    this.setIcon = function(ico, obj) {
        // this is from the font awesome
        var ico = ico || null;
        var obj = obj || {};
        if (ico != null) {
            icon.addClass('fa').addClass('fa-' + ico);
            if (label != '') {
                icon.setStyle({marginRight: '5px'});
            }
            icon.setStyle(obj);
        }

        return this;
    };
};

var ButtonLink = function (label) {
    var label = label || '';
    var link = new JLink('');

    var icon = new JI();
    var _label = new Label(label, 'dark-secondary', 'button');

    link.add(icon);
    link.add(_label.control());

    this.setText = function(txt) {
       _label.setText(txt);
        return this;
    };

    this.setIcon = function(ico, obj) {
        var ico = ico || null;
        var obj = obj || {};
        if (ico != null) {
            icon.addClass('fa').addClass('fa-' + ico);
            if (label != '') {
                icon.setStyle({marginRight: '5px'});
            }
            icon.setStyle(obj);
        }
        return this;
    };

    this.addEvent = function(e, fn) {
        link.addEvent('click', fn);
        return this;
    };

    this.control = function () {
        return link;
    };


};

var ButtonGroup = function (label, color, type, direction) {
    var label = label || '';
    var panel = new JPanel().addClass('mui-dropdown');

    var direction = direction || '';

    var btn = new Button('', color, type);
    btn.button().setAttr({ 'data-mui-toggle': 'dropdown' });
    panel.add(btn.control());

    var ul = new JUl().addClass('mui-dropdown__menu');

    if (direction != '') {
        if (!__isValidConfig(direction, ControlConfig.Direction)) throw new TypeError(direction + ' is invalid, Valid: ' + ControlConfig.tostr(ControlConfig.Direction));
        ul.addClass('mui-dropdown__menu--' + direction);
    }

    panel.add(ul);

    var _label = new Label(label, 'light', 'button');

    var icon = new JI();
    btn.add(icon).add(_label);

    this.addButton = function () {

    };

    this.add = function (o, fn) {
        var li = new JLi();
        var fn = fn || null;

        if (o instanceof JInterface) {
            li.add(o);
            if (fn != null && typeof(fn) == 'function') {
                o.addEvent('click', function(e) {
                    fn(e);
                });
            }
        } else if (o instanceof Object) {
            li.add(o.control());

            if (fn != null && typeof(fn) == 'function') {
                o.control().addEvent('click', function(e) {
                    fn(e);
                });
            }
        } else {
            li.setText(o);
        }

        ul.add(li);
        return this;
    };

    this.setIcon = function(ico, obj) {
        // this is from the font awesome
        var ico = ico || null;
        var obj = obj || {};
        if (ico != null) {
            icon.addClass('fa').addClass('fa-' + ico);
            if (label != '') {
                icon.setStyle({marginRight: '5px'});
            }
            icon.setStyle(obj);
        }

        return this;
    };

    this.control = function () {
        return panel;
    };
};


var TextField = function (label, _float, type) {
    var label = label || '';
    var _float = _float || '';
    var type = type || 'text';

    if (_float != '') {
        if (!__isValidConfig(_float, ControlConfig.TextFieldType)) throw new TypeError(_float + ' is not valid! valid: ' + ControlConfig.TextFieldType);
    }

    var panel = new JPanel();
    panel.addClass('mui-textfield');

    if (_float != '') {
        panel.addClass('mui-textfield--float-label');
    }

    var tf = new JTextField().setAttr({type: type});

    panel.add(tf);

    if (label != '') {
        var labelo = new JLabel(label);
        panel.add(labelo);
    }

    this.addEvent = function (e, fn) {
        tf.addEvent(e, fn);
        return this;
    };

    this.setAttr = function(o) {
        tf.setAttr(o);
        return this;
    };

    this.textfield = function () {
        return tf;
    };

    this.control = function () {
        return panel;
    };
};


var ComboBox = function (label) {
    var label = label || '';


    var panel = new JPanel();
    panel.addClass('mui-select');

    var tf = new JComboBox()
            .addOption('', '[ Select ' + label + ' ]');


    panel.add(tf);

    if (label != '') {
        var labelo = new JLabel(label);
        panel.add(labelo);
    }

    this.clear = function() {
        tf.clear();
        tf.addOption('', '[ Select ' + label + ' ]');
        return this;
    };

    this.add = function(key, value) {
        tf.addOption(key, value);
        return this;
    };

    this.setValue = function(key) {
        tf.getControl().value = key;
        return this;
    };

    this.getValue = function() {
        
        return tf.getText();
    };

    this.addEvent = function (e, fn) {
        var me = this;
        tf.addEvent(e, function(evt) {
            fn(evt, me);
        });
        return this;
    };

    this.setAttr = function(o) {
        tf.setAttr(o);
        return this;
    };

    this.textfield = function () {
        return tf;
    };

    this.control = function () {
        return panel;
    };
    this.setStyle = function(o) {
        panel.setStyle(o);
        return this;
    };
};

/* Switch */
var Switch = function(state, fn) {
    
    var state = state || false;
    if (typeof(state) != 'boolean') throw new TypeError('state must be a boolean : value: true or false');

    var fn = fn || null;

    if (fn != null && typeof(fn) != 'function') throw new TypeError('fn from switch must be a function');



    var on = '#AA00FF';
    var off = '#B0BEC5';
    
    var _state = state ? on : off;

    var _state_pos = state ? ['-3px', '-3.5px'] : ['18px', '-3.5px'];

    var panel = new JPanel()
                .setStyle({
                    display: 'inline-block', 
                    width: '35px', 
                    height: '15px', 
                    backgroundColor: _state + '99',
                    borderRadius: '15px',
                    position: 'relative'
                });
    var circle = new JPanel()
                .setStyle({
                    position: 'absolute',
                    borderRadius: '50%',
                    width: '22px',
                    height: '22px',
                    backgroundColor: _state,
                    right: _state_pos[0],
                    top: _state_pos[1],
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)'
                });
    
    var __state = state;
    
    var update = function() {
        var _state = state ? off : on;
        var _state_pos = state ? ['18px', '-3.5px'] : ['-3px', '-3.5px'];
        
        panel.setStyle({
            backgroundColor: _state + '99'
        });

        circle.setStyle({
            backgroundColor: _state,
            right: _state_pos[0],
            top: _state_pos[1],
        });

        __state = !state;
    };


    circle.addEvent('click', function(e) {
       state = !state;
       update(); 

        if (fn != null) fn(!state);
    });



    panel.add(circle);



    this.setValue = function(ischeck) {
        if (typeof(ischeck) != 'boolean') throw new TypeError('ischeck is not bool');

        state = false;
        update();

        return this;
    };

    this.checked = function() {
        return __state;
    }

    this.control = function() {
        return panel;
    };
};
/* End Switch */

/* Slider */
var Slider = function(max_size, width) {

    var max_size = max_size || 100;
    if (typeof(max_size) != 'number') throw new TypeError('max_size must be a number or integer');

    var width = width || 50;

    if (typeof(width) != 'number') throw new TypeError('width must be a number or integer');
    
    var myvalue = 0;

    var on = '#AA00FF';
    var off = '#B0BEC5';

    var track = new JPanel().setStyle({
        width: width + 'px',
        height: '4px',
        backgroundColor: off,
        position: 'relative',
        borderRadius: '2px',
        display: 'inline-block'
    });

    var active = new JPanel().setStyle({
        width: '0%',
        height: '8px',
        backgroundColor: on,
        position: 'absolute',
        top: '-2px',
        left: 0,
        borderRadius: '2px'
    });

    var circle = new JPanel().setStyle({
        width: '20px',
        height: '20px',
        backgroundColor: on,
        position: 'absolute',
        borderRadius: '50%',
        right: '-10px',
        top: '-5.5px',
        boxShadow: '0 0 3px rgba(0, 0, 0, 0.5)'
    });

    active.add(circle);

    track.add(active);

    var update = function(value) {
        myvalue = value;

        if (value < 1) return;

        var ratio = (100 * value) / max_size;        

        active.setStyle({
            width: ratio + '%'
        });
    };

    // active.addEvent('touchstart', function(e) {
    //     console.table(e);
    // });

    track.addEvent('click', function(e) {
        // e.layerX
        var click_w = e.layerX;
        var percent = 0;
        if (click_w > 0) {
            percent = click_w / width;

            var nvalue = max_size * percent;
            
            update(parseInt(nvalue));
        }

    });

    this.getValue = function() {

        return myvalue;
    };

    this.setValue = function(value) {
        if (typeof(value) != 'number') throw new TypeError('value must be a number or integer');

        if (value > max_size) throw new TypeError('value is greater than ' + max_size);

        update(value);
        return this;
    };

    this.control = function() {
        return track;
    };
    
};
/* End Slider  */


var TextBox = function (label, _float) {
    var label = label || '';
    var _float = _float || '';

    if (_float != '') {
        if (!__isValidConfig(_float, ControlConfig.TextFieldType)) throw new TypeError(type + ' is not valid! valid: ' + ControlConfig.TextFieldType);
    }

    var panel = new JPanel();
    panel.addClass('mui-textfield');

    if (_float != '') {
        panel.addClass('mui-textfield--float-label');
    }

    var tf = new JTextArea();

    panel.add(tf);

    if (label != '') {
        var labelo = new JLabel(label);
        panel.add(labelo);
    }

    this.addEvent = function (e, fn) {
        tf.addEvent(e, fn);
        return this;
    };

    this.textfield = function () {
        return tf;
    };

    this.control = function () {
        return panel;
    };
};


var Grid = function (gap) {
    var panel = new JPanel().addClass('mui-row');

    if (typeof(gap) != 'number') {
        gap = null;
    }

    this.cell = function (container, size) {

        /* Checking Errors  */
        if (!(size instanceof Array)) {
            throw new TypeError('function(container, size) {} the value of size must be a List or Array([]), example: md-5, md-3');
        }

        for (var index in size) {
            var n = size[index];
            var a = n.split('-');

            var t = '';
            if (a.length > 2) {
                n = a[0] + '-' + a[1] + '-' + a[2];
                t = a[0] + '-' + a[1];

                if (!__isValidConfig(t, ControlConfig.GridType)) throw new Error(t + ' is invalid: valid: ' + ControlConfig.tostr(ControlConfig.GridType));

                if (parseInt(a[2]) > 12) {
                    throw new Error('the Grid, col maximum of 12 only!');
                }
            } else {
                t = a[0];

                if (!__isValidConfig(t, ControlConfig.GridType)) throw new Error(t + ' is invalid: valid: ' + ControlConfig.tostr(ControlConfig.GridType));

                if (parseInt(a[1]) > 12) {
                    throw new Error('the Grid, col maximum of 12 only');
                }
            }

        };

        /* End Checking errors */

        /*  size must be a list or array of string ex.: md-1 */
        var size = size || []; /* md-no, sm-no, xs-no, lg-no  */ /* also : mui-col-md-offset-4  */
        var spanel = new JPanel();
        for (var x in size) {
            if ( gap != null ) spanel.setStyle({padding: gap + 'px'});
            spanel.addClass('mui-col-' + size[x]);
            /* mui-col-md-offset-4  */
        }
        if (container instanceof JInterface) {
            spanel.add(container);
        } else {
            spanel.add(container.control());
        }

        panel.add(spanel);
        
        return this;
    };

    this.control = function () {
        return panel;
    };
};


/* Table */

var Table = function (header, type) {
    var table = new JTable().addClass('mui-table');
    var type = type || '';

    if (!(header instanceof Array)) {
        throw new TypeError('Table Contructor header must a Array or List, example: ["no", "name", "age"..etc]');
    }

    if (type != '') {
        if (!__isValidConfig(type, ControlConfig.TableType)) throw new TypeError(type + ' is not valid: valid: ' + ControlConfig.tostr(ControlConfig.TableType));

        table.addClass('mui-table--' + type);
    }

    var thead = new JThead();

    var tr = new JTr();

    for (var i in header) {
        var th = new JTh();

        if (header[i] instanceof JInterface) {
            th.add(header[i]);
        } else if (header[i] instanceof Object) {
            th.add(header[i].control());
        } else {
            th.setText(header[i]);
        }

        tr.add(th);
    }
    thead.add(tr);
    table.add(thead);

    var tbody = new JTbody();
    table.add(tbody);

    this.clear = function () {
        tbody.clear();
        return this;
    };

    this.addRow = function (arr) {
        if (!(arr instanceof Array)) throw new TypeError('Table.addRow must be an List or an array sample: [1, "argon", 23]');
        if (header.length != arr.length) throw new Error('Table header must match the size of the addRow or table data');

        var tr = new JTr();
        for (var i in arr) {
            var td = new JTd();

            if (arr[i] instanceof JInterface) {
                td.add(arr[i]);
            } else if (arr[i] instanceof Object) {
                td.add(arr[i].control());
            } else {
                td.setText(arr[i]);
            }

            tr.add(td);
        }
        tbody.add(tr);
        return this;
    };

    this.control = function () {
        return table;
    }
};
/* End of Table  */

/* Tab  */
var Tab = function (ids, type) {
    var type = type || '';


    var c = new JPanel();

    var ul = new JUl().addClass('mui-tabs__bar');

    if (type != '') {
        if (!__isValidConfig(type, ControlConfig.TabType)) throw new TypeError(type + ' is not valid, valid: ' + ControlConfig.tostr(ControlConfig.TabType));
        ul.addClass('mui-tabs__bar--' + type);
    }

    var i = 1;
    c.add(ul);

    this.add = function (title, content, fn) {
        var content = content || 'Tab ' + i.toString();

        var name = ids + '-pane-default-' + i.toString();

        var fn = fn || null;


        var li = new JLi();
        if (i == 1) {
            /* set active tab */
            li.addClass('mui--is-active');
        }

        var link = new JLink().setAttr({ "data-mui-toggle": "tab", 'data-mui-controls': name });
        link.setText(title);
        li.add(link);

        ul.add(li);

        var pan = new JPanel().addClass('mui-tabs__pane').setAttr({ 'id': name });
        if (i == 1) {
            pan.addClass('mui--is-active');
        }
        /* add the contents */

        if (content instanceof JInterface) {
            pan.add(content);
        } else if (content instanceof Object) {
            pan.add(content.control());
        } else {
            pan.setText(content);
        }

        c.add(pan);
        
        if (fn != null && typeof(fn) == 'function') {
            if (i == 1) {
                fn(content);
            }
            link.addEvent('click', function() {
                fn(content);
            });
        }

        i += 1;

        return this;
    };



    this.control = function () {
        return c;
    };
};
/* End of Tab  */

/* Diviver */
var Divider = function() {
    var panel = new JPanel().addClass('mui-divider');

    this.setStyle = function(o) {
        panel.setStyle(o);
        return this;
    };

    this.control = function() {
        return panel;
    };
};
/* end Divider */

/* Dialog */
var MessageDialog = {
    show: function(msg, fn, type) {
        /* Create  a simple dialog */
        var fn = fn || null;

        var panel = new Panel().setStyle({
            width: '320px',
            height: '100px',
            margin: 'auto',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
        });

        var divider = new Divider();
        var title = new Label('Alert', 'accent', 'menu', 'block');

        var m = new Label(msg, 'dark-secondary', 'caption', 'block');

        var ok = new Button('Ok', 'accent', 'raised', 'small').setStyle({
            position: 'absolute',
            bottom: '15px',
            right: '15px'
        });

        panel.add(title);
        panel.add(divider);
        panel.add(m);
        panel.add(ok);
        /*  Create ok button  */

        var options = {
            'keyboard': true, // teardown when <esc> key is pressed (default: true)
            'static': true, // maintain overlay when clicked (default: false)
            'onclose': function() {} // execute function when overlay is closed
        };

        mui.overlay('on', options, panel.control().getControl());
        ok.addEvent('click', function() {
            if (fn != null && typeof(fn) == 'function') {
                fn();
            }
        });
    },
    hide: function() {
        mui.overlay('off');
    }
};

var ConfirmDialog = {
    show: function(msg, fn, type) {
        /* Create  a simple dialog */
        var fn = fn || null;
        var msg = msg || null;

        var panel = new Panel().setStyle({
            width: '320px',
            height: '150px',
            margin: 'auto',
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
        });

        var divider = new Divider();
        var title = new Label('Confirm', 'accent', 'menu', 'block');

        
        var m = null;
        if (msg != null && msg instanceof JInterface) {
            m = msg;
        } else if(msg != null && msg instanceof Object) {
            m = msg.control();
        } else {
            m = new Label(msg, 'dark-secondary', 'caption', 'block');
        }

        var menu = new EmptyPanel();

        var ok = new Button('Ok', 'accent', 'raised', 'small');
        var cancel = new Button('Cancel', 'danger', 'raised', 'small');

        cancel.addEvent('click', function() {
            ConfirmDialog.hide();
        });

        menu.setStyle({
            position: 'absolute',
            bottom: '15px',
            right: '15px'
        });

        menu.add(ok);
        menu.add(cancel);

        panel.add(title);
        panel.add(divider);
        panel.add(m);
        panel.add(menu);
        /*  Create ok button  */

        var options = {
            'keyboard': true, // teardown when <esc> key is pressed (default: true)
            'static': true, // maintain overlay when clicked (default: false)
            'onclose': function() {} // execute function when overlay is closed
        };

        mui.overlay('on', options, panel.control().getControl());
        ok.addEvent('click', function() {
            if (fn != null && typeof(fn) == 'function') {
                fn();
            }
        });
    },
    hide: function() {
        mui.overlay('off');
    }
};
/* End Dialog */

/* Modal  */
var Modal = function(obj) {
    var obj = obj || null;

    var panel = new Panel().setStyle({position: 'relative'});

    var content = new EmptyPanel();

    /*  create header */
    var header = new EmptyPanel();
    
    if (obj != null) {
        if (obj instanceof JInterface) {
            header.add(obj);
        } else if ( obj instanceof Object ) {
            header.add(obj.control());
        } else {
            var label = new Label(obj, 'dark', 'button');
            header.add(label);
        }
    }


    panel.add(header)
    .add(new Divider());
    /* Create footer */

    panel.add(content);

    var footer = new EmptyPanel();

    var menu = new EmptyPanel();

    var close = new Button('Close', 'danger', 'raised', 'small');
    menu.add(close);
    footer.add(menu);

    panel.add(footer);

    var grid = new Grid()
            .cell(new EmptyPanel(), ['md-2'])
            .cell(panel, ['md-8'])
            .cell(new EmptyPanel(), ['md-2']);

    grid.control().setStyle({
        marginTop: '5%',
        marginBottom: '5%'
    });

    close.addEvent('click', function() {
        mui.overlay('off');
    });

    this.add = function(obj) {
        if ( obj instanceof JInterface) {
            content.control().add(obj);
        } else if(obj instanceof Object) {
            content.add(obj);
        }
        return this;
    };

    this.footer = function(obj) {
        if ( obj instanceof JInterface) {
            menu.add(obj);
        } else if(obj instanceof Object) {
            menu.add(obj.control());
        }
        return this;
    };

    this.hide = function() {
        mui.overlay('off');
        return this;
    };
    
    this.show = function() {
        var options = {
            'keyboard': true, // teardown when <esc> key is pressed (default: true)
            'static': true, // maintain overlay when clicked (default: false)
            'onclose': function() {} // execute function when overlay is closed
        };
        var container = new Container();
        mui.overlay('on', options, container.add(grid).control().getControl());
        return this;
    };

    this.control = function() {
        return panel.control()
    };
};
/* End Modal  */

/* Form  */
var Form = function() {
    var form = new JForm();
    var w = {};

    this.add = function(obj, key) {
        var key = key || null;
        
        if (obj instanceof JInterface) {
            if (key != null) {
                form.add(obj, key);
            } else {
                form.add(obj);
            }
        } else if (obj instanceof Object) {
            if (key != null) {
                form.add(obj.control(), key);
            } else {
                form.add(obj.control());                
            }
        }

        if (key != null) {
            w[key] = obj;
        }
        return this;
    };

    this.clear = function() {
        for (var i in w) {
            if(w[i] instanceof Switch) {
                w[i].set(false);
            }
            else if (w[i] instanceof JInterface) {
                w[i].setText('');
            } else if(w[i] instanceof Object) {
                w[i].textfield().setText('');
            }
        }
        return this;
    };

    this.getValue = function() {
        var data = {};
    
        for (var i in w) {
            if (w[i] instanceof Switch) {
                data[i] = w[i].checked();
            } else if(w[i] instanceof Slider) {
                data[i] = w[i].getValue();
            } 
            else if (w[i] instanceof JInterface) {
                data[i] = w[i].getText();
            } else if(w[i] instanceof Object) {
                data[i] = w[i].textfield().getText();
            }
        }
        return data;
    };

    this.control = function() {
        return form;
    };
};
/* End form */


/* Drawer */
var Drawer = function(type) {
    var type = type || 'left';

    var panel = new JPanel();

    if (type != null) {
        if (!__isValidConfig(type, ControlConfig.DrawerType)) throw new TypeError(type + ' is invalid, valid are' + ControlConfig.tostr(ControlConfig.DrawerType));
    }

    var style = {};

    if (type == 'left') {
        style = {
            width: '250px',
            height: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            left: 0,
            top: 0
        };
    } else if(type == 'bottom') {
        style = {
            width: '100%',
            height: '50%',
            backgroundColor: 'white',
            position: 'absolute',
            bottom: '0px',
            borderTopRightRadius: '20px',
            borderTopLeftRadius: '20px'
        };
    } else if(type == 'top') {
        style = {
            width: '100%',
            height: '50%',
            backgroundColor: 'white',
            position: 'absolute',
            top: '0px',
            borderBottomRightRadius: '20px',
            borderBottomLeftRadius: '20px'
        };
    } else if (type == 'right') {
        style = {
            width: '250px',
            height: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            right: 0,
            top: 0
        };
    }

    


    panel.setStyle(style);

    this.setStyle = function(styles) {
        panel.setStyle(styles);
        return this;
    };

    this.add = function(obj) {
        if (obj instanceof JInterface) {
            panel.add(obj);
        } else if(obj instanceof Object) {
            panel.add(obj.control());
        }
        return this;
    };

    this.show = function() {
        // var options = {
        //     'keyboard': true, // teardown when <esc> key is pressed (default: true)
        //     'static': true, // maintain overlay when clicked (default: false)
        //     'onclose': function() {} // execute function when overlay is closed
        // };

        mui.overlay('on', {}, panel.getControl());
    };

    this.hide = function() {

    };

    this.control = function() {
        return panel;
    };
};

/* End Drawer  */

/* Slider  */

var ImageSlider = function(obj) {
    var panel = new JPanel();

    var obj = obj || null;

    var const_h = 0;
    var const_w = 0;

    if (obj != null) {
        if (!(obj instanceof Array)) {
            throw new TypeError('obj must be array [width, height]');
        } else {

            const_w = obj[0];
            const_h = obj[1];
        }

        panel.setStyle({
            width: const_w + 'px',
            height: const_h + 'px'
        });
    }

    else {
        panel.setStyle({
            position: 'relative',
            width: '100%',
            height: '100vh',
            transition: 'all 1s ease'
        });

        const_h = window.outerHeight;
        const_w = window.outerWidth;
    }

    panel.setStyle({
        'overflow': 'hidden'
    });
    
    var timer = null;

    var index = 0;

    var img = [];
    var paths = [];

    var content = new EmptyPanel();

    panel.add(content.control());

    var total = 0;

    this.add = function(path) {
        paths.push(path);
        
        return this;
    };

    var __update = function() {

        const_h = window.outerHeight;
        const_w = window.outerWidth;

        //clear
        img = [];
        // clear
        content.clear();
        
        for (var j in paths) {
            var image = new EmptyPanel().setImage(paths[j]).setStyle({
                width: const_w + 'px',
                height: const_h + 'px',
                float: 'left'
            });
            img.push(image);
        }
        // ** dummy
        var image = new EmptyPanel().setImage(paths[0]).setStyle({
            width: const_w + 'px',
            height: const_h + 'px',
            float: 'left'
        });
        img.push(image);
        // ** end dumy



        total = ((const_w + 1) * img.length);
        content.setStyle({
            width:  total + 'px',
            height: '100%',
            position: 'absolute',
            left: '0px' 
        });

        for (var i in img) {
            content.add(img[i]);
        }
    };

    this.update = function() {



        __update();
        
        return this;
    };

    this.setStyle = function(obj) {
        panel.setStyle(obj);
        return this;
    };

    this.control = function() {
        return panel;
    };

    var __start =  function() {
        // for (var i in img) {
    
        //     img[i].setStyle({
        //         display: 'none'
        //     });
    
        // }

        // img[0].setStyle({display: 'inline-block'});
        var w = (total - const_w) - 2;
        
        
        content.setStyle({
            left: -index + 'px'
        });

        index += 2;

        if (w < index) {
            index = 2;
        }

        
        // if (index > img.length - 1) {
        //     index = 0;
        // }
    };

    this.start = function(speed) {
        clearInterval(timer);
        var speed = speed || 10;

        if (typeof(speed) != 'number') throw new TypeError('speed must be a number!');

        __start();
        
        timer = setInterval(function() {
            __start();
        }, speed);
        return this;
    };

    this.stop = function() {
        clearInterval(timer);
        return this;
    };

};

/* End Slider */


/* Http */

var Http = function(url, data, callback) {
    var url = url || null;
    
    var headers = {};

    var xml = new XMLHttpRequest();
    

    this.data = data || {};
    this.method = 'POST';
    this.callback = callback || null;
    
    this.addHeader = function(key, value) {
        headers[key] = value;
        return this;
    };

    this.setMethod = function(method) {
        this.method = method;
        return this;
    };
    
    this.setData = function(data) {
        this.data = data;  
        return this;
    };

    this.send = function() {
        
        xml.open( this.method, url );
        

        
        /* Data */
        if (typeof(this.data) == 'object') {
            this.data = JSON.stringify(this.data);
            xml.setRequestHeader('Content-Type', 'application/json');
        }
        
        /* plot the header */
        for (var key in headers) {
            xml.setRequestHeader( key, headers[key] );
        }
        /* end plot headers */

        xml.send(this.data);

        return this;
    };

    this.load = function(fn) {
        if (typeof(fn) != 'function') throw new Error('fn must be a callback function');
        xml.onload = function() {
            fn(this.response);
        };
        return this;
    };

    this.error = function(fn) {
        xml.onerror = function() {
            if (typeof(fn) != 'function') throw new Error('fn must be a callback function');
            fn(this, true);
        };
        return this;
    }

    this.abort = function() {
        xml.abort();
        return this;
    };
    
};

/* end Http */
