import ajax from '../request';

export const get_list = (data?: any) => ajax({
    name:'get_list',
    data
})

export const get_article_list = (data?: any) => ajax({
    name:'get_article_list',
    data
})

export const get_article_like = (data?: any) => ajax({
    name:'get_article_like',
    data
})

export const get_search_data = (data?: any) => ajax({
    name:'get_search_data',
    data
})


export const get_article_details = (data?: any) => ajax({
    name:'get_article_details',
    data
})

export const update_Comment = (data?: any) => ajax({
    name:'update_Comment',
    data
})

export const get_Comments = (data?: any) => ajax({
    name:'get_Comments',
    data
})

export const get_FollowList = (data?: any) => ajax({
    name:'get_FollowList',
    data
})

export const get_AuthorList = (data?: any) => ajax({
    name:'get_AuthorList',
    data
})

export const get_MyArticle = (data?: any) => ajax({
    name:'get_MyArticle',
    data
})