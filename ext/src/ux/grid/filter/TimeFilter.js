/**
 * @class Ext.ux.grid.filter.TimeFilter
 * @extends Ext.ux.grid.filter.Filter
 * Filter by a configurable Ext.picker.TimePicker menu
 * <p><b><u>Example Usage:</u></b></p>
 * <pre><code>
var filters = Ext.create('Ext.ux.grid.GridFilters', {
    ...
    filters: [{
        // required configs
        type: 'time',
        dataIndex: 'timeAdded',

        // optional configs
        timeFormat: 'H:i:s',  // default
        beforeText: 'Before', // default
        afterText: 'After',   // default
        onText: 'On',         // default
        pickerOpts: {
            // any TimePicker configs
        },

        active: true // default is false
    }]
});
 * </code></pre>
 */
Ext.define('Ext.ux.grid.filter.TimeFilter', {
    extend: 'Ext.ux.grid.filter.Filter',
    alias: 'gridfilter.time',
    uses: ['Ext.picker.Time', 'Ext.menu.Menu'],

    /**
     * @cfg {String} afterText
     * Defaults to 'After'.
     */
    afterText : 'After',
    /**
     * @cfg {String} beforeText
     * Defaults to 'Before'.
     */
    beforeText : 'Before',
    /**
     * @cfg {Object} compareMap
     * Map for assigning the comparison values used in serialization.
     */
    compareMap : {
        before: 'lt',
        after:  'gt',
        on:     'eq'
    },
    /**
     * @cfg {String} timeFormat
     * The time format to use for the time Picker
     * Defaults to 'H:i:s'.
     */
    timeFormat : 'H:i:s',
    
    /**
     * @cfg {String} serverTimeFormat
     * The time format use for the server request
     * Defaults to 'H:i:s'.
     */    
    serverTimeFormat : 'His',
    /**
     * @cfg {Date} maxTime
     * Allowable time as passed to the Ext.TimePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Date} minTime
     * Allowable date as passed to the Ext.TimePicker
     * Defaults to undefined.
     */
    /**
     * @cfg {Array} menuItems
     * The items to be shown in this menu
     * Defaults to:<pre>
     * menuItems : ['before', 'after', '-', 'on'],
     * </pre>
     */
    menuItems : ['before', 'after', '-', 'on'],

    /**
     * @cfg {Object} menuItemCfgs
     * Default configuration options for each menu item
     */
    menuItemCfgs : {
        selectOnFocus: true,
        width: 60,
        maxWidth: 60
    },

    /**
     * @cfg {String} onText
     * Defaults to 'On'.
     */
    onText : 'On',

    /**
     * @cfg {Object} pickerOpts
     * Configuration options for the time picker associated with each field.
     */
    pickerOpts : {},

    /**
     * @private
     * Template method that is to initialize the filter and install required menu items.
     */
    init : function (config) {
        var me = this,
            pickerCfg, i, len, item, cfg;

        pickerCfg = Ext.apply(me.pickerOpts, {
            xtype: 'timepicker'
            ,format:  me.timeFormat
//            ,maxWidth: 60
            ,shrinkWrap:3
            ,minValue: Ext.Date.parse(me.minTime, 'H:i')
            ,maxValue: Ext.Date.parse(me.maxTime, 'H:i')           
            ,listeners: {
                scope: me,
                select: me.onMenuSelect
            }
        });
        
        me.fields = {};
        for (i = 0, len = me.menuItems.length; i < len; i++) {
            item = me.menuItems[i];
            if (item !== '-') {
                cfg = {
                    itemId: 'range-' + item,
                    text: me[item + 'Text'],
                    menu: Ext.create('Ext.menu.Menu', {
                        items: [
                            Ext.apply(pickerCfg, {
                                itemId: item
//                                ,maxWidth: 60
                            })
                            
                        ]
//                        ,maxWidth: 60 + 4
                    })
                    ,listeners: {
                        scope: me,
                        checkchange: me.onCheckChange
                    }
                };
                item = me.fields[item] = Ext.create('Ext.menu.CheckItem', cfg);
            }
            //me.add(item);
            me.menu.add(item);
        }
    },

    onCheckChange : function () {
        this.setActive(this.isActivatable());
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Handler method called when there is a keyup event on an input
     * item of this menu.
     */
    onInputKeyUp : function (field, e) {
        var k = e.getKey();
        if (k == e.RETURN && field.isValid()) {
            e.stopEvent();
            this.menu.hide();
        }
    },

    /**
     * Handler for when the TimePicker for a field fires the 'select' event
     * @param {Ext.picker.Time} picker
     * @param {Object} time
     */
    onMenuSelect : function (picker, time) {
        var fields = this.fields,
            field = this.fields[picker.view.itemId];

        field.setChecked(true);

        if (field == fields.on) {
            fields.before.setChecked(false, true);
            fields.after.setChecked(false, true);
        } else {
            fields.on.setChecked(false, true);
            if (field == fields.after && this.getFieldValue('before') < time) {
                fields.before.setChecked(false, true);
            } else if (field == fields.before && this.getFieldValue('after') > time) {
                fields.after.setChecked(false, true);
            }
        }
        this.fireEvent('update', this);

//        picker.up('menu').hide();
        picker.view.ownerCt.hide();
    },

    /**
     * @private
     * Template method that is to get and return the value of the filter.
     * @return {String} The value of this filter
     */
    getValue : function () {
        var key, result = {};
        for (key in this.fields) {
            if (this.fields[key].checked) {
                result[key] = this.getFieldValue(key);
            }
        }
        return result;
    },

    /**
     * @private
     * Template method that is to set the value of the filter.
     * @param {Object} value The value to set the filter
     * @param {Boolean} preserve true to preserve the checked status
     * of the other fields.  Defaults to false, unchecking the
     * other fields
     */
    setValue : function (value, preserve) {
        var key;
        for (key in this.fields) {
            if(value[key]){
                this.getPicker(key).setValue(value[key]);
                this.fields[key].setChecked(true);
            } else if (!preserve) {
                this.fields[key].setChecked(false);
            }
        }
        this.fireEvent('update', this);
    },

    /**
     * @private
     * Template method that is to return <tt>true</tt> if the filter
     * has enough configuration information to be activated.
     * @return {Boolean}
     */
    isActivatable : function () {
        var key;
        for (key in this.fields) {
            if (this.fields[key].checked) {
                return true;
            }
        }
        return false;
    },

    /**
     * @private
     * Template method that is to get and return serialized filter data for
     * transmission to the server.
     * @return {Object/Array} An object or collection of objects containing
     * key value pairs representing the current configuration of the filter.
     */
    getSerialArgs : function () 
    {
        var args = [];
        
        for (var key in this.fields) 
        {
            if(this.fields[key].checked)
            {
                var timeValue = this.getFieldValue(key);
                var value = 0

                if(this.serverTimeFormat == 'special-dt')
                {
                    let arrivalDate = new Date( Ext.Date.format(new Date(), 'Y-m-d') + ' ' + timeValue )
                    let iniDate = new Date( Ext.Date.format(new Date(), 'Y-m-d') + ' 00:00:00' )
                    value = Ext.Date.getElapsed(iniDate, arrivalDate) / 60000
                }
                else
                {
                    value = Ext.Date.format(new Date('1/10/2010 ' + timeValue), this.serverTimeFormat);
                }

                args.push({
                    type: 'time',
                    comparison: this.compareMap[key],
                    value: value
                });
            }
        }

        return args;
    },

    /**
     * Get and return the time menu picker value
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Date} Gets the current selected value of the time field
     */
    getFieldValue : function(item){
        var picker = this.getPicker(item);
        var selectedNodes = picker.getSelectedNodes();
        if(selectedNodes.length > 0){
            var node = selectedNodes[0];
            return node.textContent;
        }
        return 0;
    },

    /**
     * Gets the menu picker associated with the passed field
     * @param {String} item The field identifier ('before', 'after', 'on')
     * @return {Object} The menu picker
     */
    getPicker : function(item){
        return this.fields[item].menu.items.first();
    },

    /**
     * Template method that is to validate the provided Ext.data.Record
     * against the filters configuration.
     * @param {Ext.data.Record} record The record to validate
     * @return {Boolean} true if the record is valid within the bounds
     * of the filter, false otherwise.
     */
    validateRecord : function (record) {
        var key,
            pickerValue,
            val = record.get(this.dataIndex),
            clearTime = Ext.Date.clearTime;

        if(!Ext.isDate(val)){
            return false;
        }
        val = clearTime(val, true).getTime();

        for (key in this.fields) {
            if (this.fields[key].checked) {
                pickerValue = clearTime(this.getFieldValue(key), true).getTime();
                if (key == 'before' && pickerValue <= val) {
                    return false;
                }
                if (key == 'after' && pickerValue >= val) {
                    return false;
                }
                if (key == 'on' && pickerValue != val) {
                    return false;
                }
            }
        }
        return true;
    }
});