Ext.define('Inventory.store.Stores', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.Rest'
	],
	model: 'Inventory.model.Store',
	pageSize: 5,
	proxy: {
		type: 'rest',
		url: 'http://localhost:8000/api/stores',
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		}
	},
	autoSync: false
});