export type ViewState =
	| 'plugin-list'
	| 'plugin-details'
	| 'manage-plugins'
	| 'manage-marketplaces'
	| 'browse-marketplace'
	| 'discover-plugins'
	| 'plugin-settings'
	| {
			type: string
			[key: string]: unknown
	  }
