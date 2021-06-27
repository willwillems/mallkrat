export const getVideoId  = (video) => video.resourceId.videoId
export const getVideoImg = (video) => video.thumbnails.maxres.url
export const getVideoTitle = (video) => video.title
export const getVideoDescription = (video) => video.description