Ext.define('Inventory.store.Products', {
	extend: 'Ext.data.Store',
	requires: [
		'Ext.data.proxy.Rest'
	],
	model: 'Inventory.model.Product',
	pageSize: 5,
	proxy: {
		type: 'rest',
		url: 'http://localhost:8000/api/products',
		appendId: true,
		reader: {
			type: 'json',
			root: 'data',
			totalProperty: 'total'
		},
		writer: {
			type: 'json',
			writeAllFields: false
		}
	},
	autoSync: false
});