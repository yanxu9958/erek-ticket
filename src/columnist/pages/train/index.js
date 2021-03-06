/**
 * 火车专栏
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-03-14
 * Last modified  : 2019-04-24
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Image, Swiper, SwiperItem, ScrollView } from '@tarojs/components'
import classnames from 'classnames/bind'
import { connect } from '@tarojs/redux'
import { actions as trainActions } from '@redux/train'
import { wxGetSystemInfo } from '@service/wechat'
import { showLoading, hideLoading } from '@utils/utils'
import MainButton from '@components/MainButton'
import TrainIcon from '@assets/icon/trainIcon.png'
import styles from './index.module.css'

const cx = classnames.bind(styles)

class Train extends Component {
  config = {
    navigationBarTitleText: '火车专栏',
    navigationBarBackgroundColor: '#fecf03'
  }

  state = {
    tab: 0,
    systemInfo: {}
  }

  componentWillMount() {
    wxGetSystemInfo().then(res => {
      this.setState({
        systemInfo: { ...res }
      })
    })
  }

  handleCurrentswiper = e => {
    this.setState({
      tab: e.detail.current
    })
  }

  handleSwitchTab = e => {
    let that = this
    if (that.state.tab == e.target.dataset.current) {
      return false
    } else {
      that.setState({
        tab: e.target.dataset.current
      })
    }
  }

  // 选择时间
  onDateChange = e => {
    this.props.dispatch(trainActions.setStartTime(e.detail.value))
  }

  // 选择城市
  handleChangeCity = typeCity => {
    Taro.navigateTo({
      url: `/columnist/pages/city/index?fromUrl=train&typeCity=${typeCity}`
    })
  }

  // 搜索
  handleClick = async () => {
    const { dispatch, fromCityName, toCityName, startTime } = this.props
    // 如果tab是未开放专区的，不允许搜索
    if (this.state.tab !== 0) {
      Taro.showToast({
        title: '搜索失败',
        duration: 2000,
        icon: 'none'
      })
    } else if (fromCityName === toCityName) {
      Taro.showToast({
        title: '地点不能一致',
        duration: 2000,
        icon: 'none'
      })
    } else {
      // 发送请求，搜索航班
      showLoading()
      await dispatch(trainActions.clearData())
      await dispatch(
        trainActions.retrieveSearchLine({
          fromCity: fromCityName,
          toCity: toCityName,
          startTime: startTime
        })
      )
      hideLoading()
      Taro.navigateTo({
        url: `/columnist/pages/search/index?searchType=train`
      })
    }
  }

  render() {
    const { systemInfo, tab } = this.state
    const { fromCityName, toCityName, startTime } = this.props
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.box}>
            <View className={styles.tab}>
              <View
                className={cx('tabItems', {
                  active: tab == 0
                })}
                data-current='0'
                onClick={this.handleSwitchTab}
              >
                单程
              </View>
              <View
                className={cx('tabItems', {
                  active: tab == 1
                })}
                data-current='1'
                onClick={this.handleSwitchTab}
              >
                往返
              </View>
            </View>
            <Swiper
              current={tab}
              duration='300'
              style={{ clientHeight: `${systemInfo.windowHeight}px`, height: `12rem` }}
              onChange={this.handleCurrentswiper}
            >
              <SwiperItem className={styles.swiperContent}>
                <ScrollView scrollY style={{ clientHeight: `${systemInfo.windowHeight}px` }}>
                  <Block>
                    <View className={styles.swiperList}>
                      <View className={styles.text} onClick={() => this.handleChangeCity('fromCity')}>
                        {fromCityName}
                      </View>
                      <Image src={TrainIcon} className={styles.icon} />
                      <View className={styles.text} onClick={() => this.handleChangeCity('toCity')}>
                        {toCityName}
                      </View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.swiperList} style={{ height: '4rem' }}>
                      <View className={styles.secordText}>出发时间:</View>
                      <View className={styles.secordText}>
                        <Picker mode='date' onChange={this.onDateChange}>
                          <View className='picker'>{startTime}</View>
                        </Picker>
                      </View>
                    </View>
                  </Block>
                  <Block>
                    <View className={styles.tips}>全程预定保障，易行让您更加容易出行</View>
                  </Block>
                </ScrollView>
              </SwiperItem>
              <SwiperItem className={styles.swiperContent}>
                <ScrollView scrollY style={{ clientHeight: `${systemInfo.windowHeight}px` }}>
                  <View className={styles.NotContentTip}>暂未开发此功能</View>
                </ScrollView>
              </SwiperItem>
            </Swiper>
          </View>
        </View>
        <View className={styles.action}>
          <MainButton text='搜索' color='primary' size='normal' onHandleClick={this.handleClick} />
        </View>
      </Block>
    )
  }
}
const mapStateToProps = ({ train }) => ({
  ...train
})

export default connect(mapStateToProps)(Train)
