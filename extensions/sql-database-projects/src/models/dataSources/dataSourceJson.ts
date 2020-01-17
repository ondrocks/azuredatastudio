/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Source EULA. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

interface DataSourceFileJson {
	version: string;
	datasources: DataSourceJson[];
}

interface DataSourceJson {
	name: string;
	type: string;
	version: string;
	data: string;
}