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
export const get_detail = (data) =>{
	return $https({
		url:'get_detail',
		data
	})
}

export const update_comment = (data) =>{
	return $https({
		url:"update_comment",
		data
	})
}

export const get_comment = (data) =>{
	return $https({
		url:"get_comment",
		data
	})
}

export const update_author = (data) =>{
	return $https({
		url:"update_author",
		data
	})
}

export const update_thumbsup = (data) =>{
	return $https({
		url:"update_thumbsup",
		data
	})
}

export const get_follow = (data) =>{
	return $https({
		url:'get_follow',
		data
	})
}

export const get_author = (data) =>{
	return $https({
		url:'get_author',
		data
	})
}

export const get_user = (data) =>{
	return $https({
		url:'get_user',
		data
	})
}

export const get_my_article = (data) =>{
	return $https({
		url:'get_my_article',
		data
	})
}

export const update_feedback = (data) =>{
	return $https({
		url:'update_feedback',
		data
	})
}