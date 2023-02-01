import React from 'react'

const InstagramContext = React.createContext({
  currentPage: '',
  likedVideosIdStatusList: [],
  changeCurrentPage: () => {},
  changeLikeStatus: () => {},
})

export default InstagramContext
