import $https from '../https.js'
export const get_label = (data) =>{
	return $https({
		url:'get_label',
		data
	})
}

export const get_list = (data) =>{
	return $https({
		url:'get_list',
		data
	})
}
