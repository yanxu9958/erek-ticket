/**
 * @Author: PDK
 * @Date:   2019-02-25
 * @desc 飞机票模块redux
 * @Last modified by:   PDK
 * @Last modified time:  2019-05-02
 */
import { PlaneList } from '@utils/app'
import { retrievePlaneLine } from '@service/api'

const types = {
  SET_PLANE_LIST: 'plane/SET_PLANE_LIST',
  SET_FROM_CITYNAME: 'plane/SET_FROM_CITYNAME',
  SET_TO_CITYNAME: 'plane/SET_TO_CITYNAME',
  SET_START_TIME: 'plane/SET_START_TIME',
  CLEAR_DATA: 'plane/CLEAR_DATA',
  SET_LINE_DATA: 'plane/SET_LINE_DATA'
}

export const actions = {
  setPlaneList() {
    // 发送请求获取数据
    return {
      type: types.SET_PLANE_LIST,
      payload: {
        list: [...PlaneList],
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  setFromCity(jsondata) {
    return { type: types.SET_FROM_CITYNAME, payload: jsondata }
  },
  setToCity(jsondata) {
    return { type: types.SET_TO_CITYNAME, payload: jsondata }
  },
  setStartTime(jsondata) {
    return { type: types.SET_START_TIME, payload: jsondata }
  },
  clearData() {
    return { type: types.CLEAR_DATA }
  },
  // 搜索航班
  retrieveSearchLine(payload) {
    return async dispatch => {
      try {
        const data = await retrievePlaneLine(payload)
        let jsonArray = data.map(item => {
          return {
            ...item,
            prefix: JSON.parse(item.prefix),
            record: JSON.parse(item.record),
            startDay: item.startTime.substring(5, 10),
            endDay: item.arriveTime.substring(5, 10),
            startDate: item.startTime.substring(11, 16),
            endDate: item.arriveTime.substring(11, 16)
          }
        })
        dispatch(this.setLineData(jsonArray))
      } catch (err) {
        throw err
      }
    }
  },
  setLineData(data) {
    return { type: types.SET_LINE_DATA, payload: data }
  }
}

const initialState = {
  list: [],
  fromCityName: '昆明',
  toCityName: '稻城',
  startTime: '2019-05-11',
  lineList: [], // 航班列表
  pageNum: 1,
  pageSize: 10
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_PLANE_LIST:
      return {
        ...state,
        list: [...payload.list],
        pageNum: payload.pageNum,
        pageSize: payload.pageSize
      }
    case types.SET_FROM_CITYNAME:
      return {
        ...state,
        fromCityName: payload
      }
    case types.SET_TO_CITYNAME:
      return {
        ...state,
        toCityName: payload
      }
    case types.SET_START_TIME:
      return {
        ...state,
        startTime: payload
      }
    case types.CLEAR_DATA:
      return {
        ...state,
        list: []
      }
    case types.SET_LINE_DATA:
      return {
        ...state,
        lineList: [...payload]
      }
    default:
      return state
  }
}
