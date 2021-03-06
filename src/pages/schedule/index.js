/**
 * 行程页面
 *
 * @summary
 * @author PDK
 *
 * Created at     : 2019-03-15
 * Last modified  : 2019-03-15
 */
import Taro, { Component } from '@tarojs/taro'
import { Block, View, Text } from '@tarojs/components'
import styles from './index.module.css'

class User extends Component {
  config = {
    navigationBarTitleText: '个人专区',
    navigationBarBackgroundColor: '#fecf03'
  }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <Block>
        <View className={styles.container}>
          <View className={styles.timeVertical}>
            <View className={styles.verticalStyle}>
              <Text>1</Text>
              <View>基于微信企业号二手市场前端</View>
            </View>
          </View>
        </View>
      </Block>
    )
  }
}

export default User
