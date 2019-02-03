Ext.define('Inventory.store.Providers', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.Rest'
	],
	model: 'Inventory.model.Provider',
	pageSize: 5,
	proxy: {
		type: 'rest',
		url: 'http://localhost:8000/api/providers',
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		}
	},
	autoSync: false
});