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

export const get_article = (data)=>{
	return $https({
		url:'get_article',
		data
	})
}

export const update_like = (data) =>{
	return $https({
		url:'update_like',
		data
	})
}

export const get_search = (data) =>{
	return $https({
		url:'get_search',
		data
	})
}

export const update_label = (data) =>{
	return $https({
		url:'update_label',
		data
	})
}