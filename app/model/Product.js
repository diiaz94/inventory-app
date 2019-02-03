Ext.define('Inventory.model.Product', {
	extend: 'Ext.data.Model',

	fields: [{
		name: '_id',
		type: 'string'
	}, {
		name: 'name',
		type: 'string'
	}, {
		name: 'updated_at',
		type: 'string'
	}, {
		name: 'created_at',
		type: 'string'
	}]
});