import {playMode} from 'common/js/config'         //播放模式
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,                       //播放状态
  fullScreen: false,                    //播放器的展开与收起
  playlist: [],                         //播放列表
  sequenceList: [],                     //播放顺序列表
  mode: playMode.sequence,              //播放模式
  currentIndex: -1,                     //当前播放索引
}

export default state
