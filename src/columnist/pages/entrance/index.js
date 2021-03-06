import Taro, { Component } from '@tarojs/taro'
import { Block } from '@tarojs/components'
import EntranceIntroduce from '@components/AppContext'
import EntranceCell from '@/columnist/components/Entrance'

import MovieIcon from '@assets/icon/movie.png'
import MovieArrow from '@assets/icon/movie_arrow.png'
import StoryArrow from '@assets/icon/story_arrow.png'

export default class Entrance extends Component {
  state = {
    fokErekEntry: [
      {
        icon: MovieIcon,
        title: '最新最热电影',
        arrow: StoryArrow,
        type: 'movie'
      },
      {
        icon: MovieIcon,
        title: '有啥好电影院',
        arrow: MovieArrow,
        type: 'cinema'
      },
      {
        icon: MovieIcon,
        title: '特惠低价专区',
        arrow: MovieArrow,
        type: 'welfare'
      }
    ]
  }
  config = {
    navigationBarTitleText: '电影专区'
  }

  render() {
    return (
      <Block>
        <EntranceIntroduce
          name='易行电影'
          text='听说你想看电影？'
          summary='想看首映 ? 但是总抢不到票 ? 想买个情侣座 ? 但总抢不到合适的位置 ? 你说春运票难抢 ?'
        />
        <EntranceCell listEntry={this.state.fokErekEntry} />
      </Block>
    )
  }
}
