import ajax from '../request';

export const get_User = (data?: any) => ajax({
    name:'get_user',
    data
})

export const update_followAuthor = (data?: any) => ajax({
    name:'update_followAuthor',
    data
})

export const update_giveLike = (data?: any) => ajax({
    name:'update_giveLike',
    data
})